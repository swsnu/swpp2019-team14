from django.http import HttpResponse, HttpResponseNotAllowed, HttpResponseBadRequest, JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
import json
import re
import urllib
import requests
from .models import *
from text_detection import run_text_detection, run_text_detection_url
from django.contrib.auth import authenticate, login, logout
from django.forms.models import model_to_dict
from django.shortcuts import get_object_or_404, get_list_or_404
from django.core.paginator import Paginator
from bs4 import BeautifulSoup
from django.db import transaction
import io
import os
from django.core.files.storage import FileSystemStorage


# test implemented
def signup(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        email = req_data['email']
        password = req_data['password']
        nickname = req_data['nickname']
        User.objects.create_user(username, email, password)
        user = User.objects.get(username=username)
        Profile.objects.create(user=user, nickname=nickname)
        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['POST'])

# test implemented


def profile(request, userid):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    elif request.method == 'PUT':
        profile = request.user.profile
        req_data = json.loads(request.body.decode())
        profile.nickname = req_data['nickname']
        profile.profile_text = req_data['profile_text']
        profile.profile_photo = req_data['profile_photo']
        profile.save()
        like_books = []
        for book in request.user.book_set.all():
                book_dict = make_book_dict(book, False)
                like_books.append(book_dict)
        user_dict = make_user_dict(request.user)
        user_dict['profile_text'] = profile.profile_text
        user_dict['like_books'] = like_books

        return JsonResponse(user_dict, status=200)
    else:
        return HttpResponseNotAllowed(['PUT'])

# test implemented


def photo_upload(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    elif request.method == 'POST':
        # print(request)
        try:
            image = request.FILES['image']
        except:
            return HttpResponse(status=400)
        profile = request.user.profile
        profile.profile_photo = image
        profile.save()
        like_books = []
        for book in request.user.book_set.all():
                book_dict = make_book_dict(book, False)
                like_books.append(book_dict)
        user_dict = make_user_dict(request.user)
        user_dict['profile_text'] = profile.profile_text
        user_dict['like_books'] = like_books
        return JsonResponse(user_dict, status=200)
    else:
        return HttpResponseNotAllowed(['POST'])

# test implemented


def signin(request):
    if request.method == 'POST' and isinstance(request.COOKIES.get('username'), str) and request.COOKIES.get('username') != '':
        username = request.COOKIES.get('username')
        password = request.COOKIES.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            user.save()
            user_dict = {'id': user.id, 'username': user.username, 'nickname': user.profile.nickname,
                'profile_photo': user.profile.profile_photo.name, 'profile_text': user.profile.profile_text}
            return JsonResponse(user_dict, status=200)
        else:
            return HttpResponse(status=400)

    elif request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        autoLogin = req_data['auto_login']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            user.save()
            user_dict = {'id': user.id, 'username': user.username, 'nickname': user.profile.nickname,
                'profile_photo': user.profile.profile_photo.name, 'profile_text': user.profile.profile_text}
            resp = JsonResponse(user_dict, status=200)
            if autoLogin:
                resp.set_cookie('username', username)
                resp.set_cookie('password', password)
            return resp

        else:
            return HttpResponse(status=400)
    else:
        return HttpResponseNotAllowed(['POST'])

# test implemented


def signout(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            resp = HttpResponse(status=204)
            resp.delete_cookie('username')
            resp.delete_cookie('password')
            logout(request)
            return resp
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET'])

# test implemented
def searchbooks(request,keyword,page):
    if not request.user.is_authenticated:
        return HttpResponse(status=401) 
    elif request.method == 'GET':
        try:
            url = "https://dapi.kakao.com/v3/search/book/"
            headers = {'Authorization': 'KakaoAK 2466976ee09a3572715800084181bc32',}
            params = (('target', 'title'),)
            query = "?query="+urllib.parse.quote(keyword)+"&page="+urllib.parse.quote(page)
            response = requests.get('https://dapi.kakao.com/v3/search/book'+query, headers=headers, params=params)
        except:
            return HttpResponse(status=400)
        if(response.status_code == 200):
            response_json = response.json()
            book_list = response_json['documents']
            count = response_json['meta']['pageable_count']
            book_response = []
            HttpResponse(status=401)

            for book in book_list:
                try:
                    try:
                        book_in_db = Book.objects.get(isbn = int(book['isbn'][11:]) if (len(book['isbn']) == 24) else int(book['isbn']))
                        book_dict = make_book_dict(book_in_db, False)
                        book_response.append(book_dict)
                    except ValueError:
                        book_in_db = Book.objects.get(isbn = int(book['isbn'][5:]))
                        book_dict = make_book_dict(book_in_db, False)
                        book_response.append(book_dict)
                except Book.DoesNotExist:
                    try:
                        new_book = Book(
                            isbn = int(book['isbn'][11:]) if (len(book['isbn']) == 24) else int(book['isbn']),
                            title = book['title'],
                            contents = book['contents'],
                            url = book['url'],
                            thumbnail = book['thumbnail'],
                            authors = ' '.join(book['authors']),
                            publisher = book['publisher'],
                            published_date = book['datetime'][0:10],
                        )
                    except ValueError:
                        new_book = Book(
                            isbn = int(book['isbn'][5:]),
                            title = book['title'],
                            contents = book['contents'],
                            url = book['url'],
                            thumbnail = book['thumbnail'],
                            authors = ' '.join(book['authors']),
                            publisher = book['publisher'],
                            published_date = book['datetime'][0:10],
                        )
                    new_book.save()
                    book_dict = make_book_dict(new_book, False)
                    book_response.append(book_dict)
            response_body={'books':book_response,'count': count}
            return JsonResponse(response_body)
        return HttpResponse(status=402)
    else:
        return HttpResponseNotAllowed(['GET']) 

# test implemented
def specific_book(request,isbn):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    elif request.method == 'GET':
        try:
            book_in_db = Book.objects.get(isbn = isbn)
            response = requests.get('https://m.search.daum.net/search'+book_in_db.url[30:]).text
        except:
            return HttpResponse(status=400)
        try:
            bs = BeautifulSoup(response, 'html.parser')
            tags = bs.findAll('p', attrs={'class': 'desc'})
            book_in_db.contents = tags[0].text
            book_in_db.author_contents = tags[1].text
            book_in_db.save()
            book_dict = make_book_dict(book_in_db, True)
        except:
            return JsonResponse(book_dict,status=200)
        return JsonResponse(book_dict,status=200)
    else:
        return HttpResponseNotAllowed(['GET'])

# test implemented
def make_article_dict(article):
    deltatime = datetime.now() - article.date
    time_array = [deltatime.days//365,deltatime.days//30,deltatime.days,deltatime.seconds//3600,deltatime.seconds//60]
    user = get_object_or_404(User, id=article.author_id)
    user_dict = make_user_dict(user)
    book_in_db = get_object_or_404(Book, isbn=article.book.isbn)
    book_dict = make_book_dict(book_in_db, False)
    likeusers = article.like_users.all()
    article_dict = {
        'author': user_dict,
        'book':book_dict,
        'id': article.id,
        'title': article.title,
        'content': article.content,
        'date': time_array,
        'is_long': article.is_long,
        'is_short': article.is_short,
        'is_phrase': article.is_phrase,
        'is_spoiler': article.is_spoiler,
        'like_count': likeusers.count()
    }
    return article_dict

# test implemented
def search_article(request, isbn):
    if request.method == 'GET':
        articles = [] 
        articles_list = Article.objects.filter(book_id=isbn).order_by('-id')
        for article in articles_list:
            article_dict = make_article_dict(article)
            article_dict['like_or_not'] = article.like_users.all().filter(id=request.user.id).exists()
            articles.append(article_dict)
        return JsonResponse(articles, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])

# test implemented
def search_article_by_author(request, page, username):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    if request.method == 'GET':
        author = User.objects.get(username=username)
        article_list = Article.objects.filter(author=author).order_by('-id')
        paginator = Paginator(article_list, 5)
        results = paginator.get_page(page)
        articles = list()
        for article in results:
            deltatime = datetime.now() - article.date
            time_array = [deltatime.days//365,deltatime.days//30,deltatime.days,deltatime.seconds//3600,deltatime.seconds//60]
            article_dict = {
                'book_isbn': article.book.isbn,
                'book_title': article.book.title,
                'id': article.id,
                'title': article.title,
                'content': article.content,
                'date': time_array,
                'is_long': article.is_long,
                'is_short': article.is_short,
                'is_phrase': article.is_phrase
            }
            articles.append(article_dict) 
        response_dict = {'articles':articles, 'length':article_list.count()}
        return JsonResponse(response_dict)
    else:
        return HttpResponseNotAllowed(['GET'])

# test implemented
def specific_article(request,review_id):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    elif request.method == 'GET':
        article = get_object_or_404(Article, id=review_id)
        article_dict = make_article_dict(article)
        article_dict['like_or_not'] = article.like_users.all().filter(id=request.user.id).exists()
        response_dict = {'article':article_dict, 'comments':get_comments(article)}
        return JsonResponse(response_dict)
    elif request.method == 'DELETE':
        article = get_object_or_404(Article, id=review_id)
        if not request.user.id==article.author_id:
            return HttpResponse(status=403)
        article.delete()
        return HttpResponse(status=200)
    elif request.method == 'PUT':
        article = get_object_or_404(Article, id=review_id)
        if not request.user.id==article.author_id:
            return HttpResponse(status=403)
        try:
            req_data = json.loads(request.body.decode())
            article.title = req_data['title']
            article.content = req_data['content']
            article.save()
        except(KeyError) as e:
            return HttpResponseBadRequest()
        article_dict = make_article_dict(article)
        article_dict['like_or_not'] = article.like_users.all().filter(id=request.user.id).exists()
        response_dict = {'article':article_dict, 'comments':get_comments(article)}
        return JsonResponse(response_dict, status=200)
    else:
        return HttpResponseNotAllowed(['GET', 'DELETE'])

# test implemented
def article_page(request, page):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    elif request.method == 'GET':
        articles_all = Article.objects.all().order_by('-id')
        paginator = Paginator(articles_all, 10)
        articles_list = paginator.page(page).object_list
        articles = []
        for article in articles_list:
            article_dict = make_article_dict(article)
            article_dict['like_or_not'] = article.like_users.all().filter(id=request.user.id).exists()
            articles.append(article_dict)
        response_body={'articles': articles, 'has_next': paginator.page(page).has_next()}
        return JsonResponse(response_body)
    else:
        return HttpResponseNotAllowed(['GET'])

# test implemented
def get_comments(post):
    comments = []
    iteration = post.comments.all()
     
    for comment in iteration:
        deltatime = (datetime.now() - comment.date)
        time_array = [deltatime.days//365,deltatime.days//30,deltatime.days,deltatime.seconds//3600,deltatime.seconds//60]
        comment_author = get_object_or_404(User, id=comment.author_id)
        comment_author_dict = make_user_dict(comment_author)
        if comment.parent == None:
            replies = list()
            for reply in comment.replies.all():
                reply_deltatime = (datetime.now() - reply.date)
                reply_time_array = [reply_deltatime.days//365,reply_deltatime.days//30,reply_deltatime.days,reply_deltatime.seconds//3600,reply_deltatime.seconds//60]
                reply_author = get_object_or_404(User, id=reply.author_id)
                reply_author_dict = make_user_dict(reply_author)
                reply_dict = {
                    'author': reply_author_dict,
                    'id': reply.id,
                    'content': reply.content,
                    'date': reply_time_array,
                }
                replies.append(reply_dict)
            comment_dict = {
            'author': comment_author_dict,
            'id': comment.id,
            'content': comment.content,
            'date': time_array,
            'replies': replies
            }
            comments.append(comment_dict)
    return comments

def alarm(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    elif request.method == 'GET':
        alarms_array=[]
        alarms = request.user.profile.alarms.all().order_by('-id')
        new=False
        for alarm in alarms:
            author=alarm.author
            author_name=author.profile.nickname
            author_username=author.get_username()
            alarm_dict = {
                'id': alarm.id,
                'author_name':author_name,
                'author_username':author_username,
                'profile_photo': author.profile.profile_photo.name,
                'is_new':alarm.is_new,
            }
            new = new or alarm.is_new
            if alarm.category == 'user':
                alarm_dict['link'] = '/page/' + author_username
            elif alarm.category == 'curation':
                alarm_dict['link'] = '/curation/' + alarm.link_id
            #elif alarm.category == 'article':
            else:
                alarm_dict['link'] = '/review/' + alarm.link_id
            if alarm.content == 'follow':
                alarm_dict['content'] = author_name+'님이 회원님을 팔로우합니다.'
            elif alarm.content == 'like':
                alarm_dict['content'] = author_name+'님이 회원님의 글에 \'좋아요\'를 눌렀습니다.'
            elif alarm.content == 'comment':
                alarm_dict['content'] = author_name+'님이 회원님의 글에 댓글을 남겼습니다.'
            elif alarm.content == 'reply':
                alarm_dict['content'] = author_name+'님이 회원님의 댓글에 답글을 남겼습니다.'
            elif alarm.content == 'follower_new':
                alarm_dict['content'] = author_name+'님이 새 리뷰를 남겼습니다.'
            else:
                alarm_dict['content'] = '회원님이 즐겨찾기한 책 '+alarm.content+'에 '+author_name+'님이 새 리뷰를 남겼습니다.'

            alarms_array.append(alarm_dict)
        result = {
            'alarms':alarms_array,
            'new': new,
        }
        return JsonResponse(result)
    elif request.method == 'PUT':
        alarms_array=[]
        alarms=request.user.profile.alarms.all().order_by('-id')
        for alarm in alarms:
            author=alarm.author
            author_name=author.profile.nickname
            author_username=author.get_username()
            alarm.is_new=False
            alarm.save()
            alarm_dict = {
                'id': alarm.id,
                'author_name':author_name,
                'author_username':author_username,
                'profile_photo': author.profile.profile_photo.name,
                'is_new':alarm.is_new,
            }
            if alarm.category == 'user':
                alarm_dict['link'] = '/page/' + author_username
            elif alarm.category == 'curation':
                alarm_dict['link'] = '/curation/' + alarm.link_id
            #elif alarm.category == 'article':
            else:
                alarm_dict['link'] = '/review/' + alarm.link_id
            if alarm.content == 'follow':
                alarm_dict['content'] = author_name+'님이 회원님을 팔로우합니다.'
            elif alarm.content == 'like':
                alarm_dict['content'] = author_name+'님이 회원님의 글에 \'좋아요\'를 눌렀습니다.'
            elif alarm.content == 'comment':
                alarm_dict['content'] = author_name+'님이 회원님의 글에 댓글을 남겼습니다.'
            elif alarm.content == 'reply':
                alarm_dict['content'] = author_name+'님이 회원님의 댓글에 답글을 남겼습니다.'
            alarms_array.append(alarm_dict)
        result = {
            'alarms':alarms_array,
            'new': False,
        }
        return JsonResponse(result)

    else:
        return HttpResponseNotAllowed(['GET',])

def specific_alarm(request,alarm_id):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    elif request.method == 'PUT':
        alarm = Alarm.objects.get(id=alarm_id)
        alarm.is_new = False
        alarm.save()
        alarm_dict = {
            'id': alarm.id,
        }
        return JsonResponse(alarm_dict)

    else:
        return HttpResponseNotAllowed(['PUT',])

def send_alarm(sender,reciever,link_id,category,content):
    if(sender!=reciever):
        reciever.profile.alarms.create(author=sender,link_id=link_id,category=category,content=content)

# test implemented
def article_comment(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    elif request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            article_id = req_data['article_id']
            content = req_data['content']
            parent_id = req_data['parent_id']
        except (KeyError) as e:
            return HttpResponse(status=400)
        article = get_object_or_404(Article, id=article_id)
        try:
            parent = ArticleComment.objects.get(id=parent_id)
            send_alarm(request.user,parent.author,article_id,'article','reply')
        except ArticleComment.DoesNotExist:
            parent = None
        send_alarm(request.user,article.author,article_id,'article','comment')
        comment = ArticleComment(article=article, author=request.user, content=content, parent=parent)
        comment.save()
        return JsonResponse(get_comments(article), safe=False)
    else:
        return HttpResponseNotAllowed(['POST']) 

def specific_comment(request, comment_id):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    elif request.method == 'PUT':
        comment = get_object_or_404(ArticleComment, id=comment_id)
        if not request.user.id==comment.author_id:
            return HttpResponse(status=403)
        try:
            req_data = json.loads(request.body.decode())
            comment.content = req_data['content']
            comment.save()
        except(KeyError) as e:
            return HttpResponseBadRequest()
        return JsonResponse(get_comments(comment.article), safe=False)
    elif request.method == 'DELETE':
        comment = get_object_or_404(ArticleComment, id=comment_id)
        if not request.user.id==comment.author_id:
            return HttpResponse(status=403)
        comment.content = '삭제된 댓글입니다.'
        comment.save()
        return JsonResponse(get_comments(comment.article), safe=False)
    else:
        return HttpResponseNotAllowed(['PUT', 'DELETE']) 

def specific_curation_comment(request, comment_id):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    elif request.method == 'PUT':
        comment = get_object_or_404(CurationComment, id=comment_id)
        if not request.user.id==comment.author_id:
            return HttpResponse(status=403)
        try:
            req_data = json.loads(request.body.decode())
            comment.content = req_data['content']
            comment.save()
        except(KeyError) as e:
            return HttpResponseBadRequest()
        return JsonResponse(get_comments(comment.curation), safe=False)
    elif request.method == 'DELETE':
        comment = get_object_or_404(CurationComment, id=comment_id)
        if not request.user.id==comment.author_id:
            return HttpResponse(status=403)
        comment.content = '삭제된 댓글입니다.'
        comment.save()
        return JsonResponse(get_comments(comment.curation), safe=False)
    else:
        return HttpResponseNotAllowed(['PUT', 'DELETE']) 

# test implemented
def curation_comment(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    elif request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            curation_id = req_data['curation_id']
            content = req_data['content']
            parent_id = req_data['parent_id']
        except (KeyError) as e:
            return HttpResponse(status=400)

        curation = get_object_or_404(Curation, id=curation_id)
        try:
            parent = CurationComment.objects.get(id=parent_id)
            send_alarm(request.user,parent.author,curation_id,'curation','reply')
        except CurationComment.DoesNotExist:
            parent = None
        send_alarm(request.user,curation.author,curation_id,'curation','comment')
        comment = CurationComment(curation=curation, author=request.user, content=content, parent=parent)
        comment.save()
        
        return JsonResponse(get_comments(curation), safe=False)
    # TODO elif request.method == 'PUT':
    #    pass
    # TODO elif request.method == 'DELETE':
    #    pass
    else:
        return HttpResponseNotAllowed(['POST', 'PUT', 'DELETE']) 

# test implemented
def article(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    elif request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            isbn = int(req_data['isbn'])
            title = req_data['title']
            content = req_data['content']
            is_long = req_data['is_long']
            is_short = req_data['is_short']
            is_phrase = req_data['is_phrase']
            is_spoiler = req_data['is_spoiler']
        except (KeyError) as e:
            return HttpResponse(status=400)

        try:
            book = Book.objects.get(isbn=isbn)
        except Book.DoesNotExist:
            return HttpResponse(status=404)

        article = Article(author=request.user, book=book, content=content, title=title, is_long=is_long, is_short=is_short, is_phrase=is_phrase, is_spoiler=is_spoiler)
        article.save()
        if is_long:
            for like_user in book.like_users.all():
                send_alarm(request.user,like_user,article.id,'article',title)
            for follow in request.user.followee.all():
                send_alarm(request.user,follow.follower,article.id,'article','follower_new')
        article_dict = model_to_dict(article)
        return JsonResponse(article_dict, status=201)
    # TODO elif request.method == 'PUT':
    #    pass
    # TODO elif request.method == 'DELETE':
    #    pass
    else:
        return HttpResponseNotAllowed(['POST', 'PUT', 'DELETE']) 

# test implemented
def curation(request): 
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    # {title, content, isbn_content_pairs} from frontend
    elif request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            title = req_data['title']
            content = req_data['content']
            isbn_content_list = req_data['isbn_content_pairs'] 
        except (KeyError) as e:
            return HttpResponse(status=400)

        # TRANSACTION FORM!
        sid = transaction.savepoint()

        
        curation = Curation(author=request.user, title=title, content=content)
        curation.save()
        curation_dict = model_to_dict(curation)
        book_content_list=[]

        for each_content in isbn_content_list:
            try:
                new_book_in_curation = BookInCuration(curation=curation, book=Book.objects.get(isbn=each_content['isbn']), content=each_content['content']) 
            except Book.DoesNotExist:
                return HttpResponse(status=404)
            new_book_in_curation.save()
            book_content_list.append(model_to_dict(new_book_in_curation))
            
        transaction.savepoint_commit(sid)
        
        # transaction.savepoint_rollback(sid)
        # return HttpResponse(status=400)
            
        result_dict = { "curation": curation_dict, "book_content": book_content_list } 
        return JsonResponse(result_dict, status=201)
    elif request.method == 'PUT':
        try:
            req_data = json.loads(request.body.decode())
            title = req_data['title']
            content = req_data['content']
            isbn_content_list = req_data['isbn_content_pairs'] 
            curation_id = req_data['curation_id']
        except (KeyError) as e:
            return HttpResponse(status=400)

        # TRANSACTION FORM!
        sid = transaction.savepoint()

        
        try:
            curation = Curation.objects.get(id=curation_id)
        except:
            return HttpResponse(status=404)
        
        curation.title = title
        curation.content = content

        book_content_list=[]

        for book_in_curation in BookInCuration.objects.filter(curation=curation):
            if str(book_in_curation.book.isbn) not in list(map(lambda pair: str(pair['isbn']), isbn_content_list)):
                book_in_curation.delete()

        for isbn_content_pair in isbn_content_list:
            if str(isbn_content_pair['isbn']) not in list(map(lambda book_in_curation: str(book_in_curation.book.isbn), BookInCuration.objects.filter(curation=curation))):
                _book = Book.objects.get(isbn=isbn_content_pair['isbn'])
                BIC = BookInCuration(curation=curation, book=_book, content=isbn_content_pair['content'])
                BIC.save()
            else:
                _book = Book.objects.get(isbn=isbn_content_pair['isbn'])
                BIC = BookInCuration.objects.get(curation=curation, book=_book)
                BIC.content = isbn_content_pair['content']
                BIC.save()
            
        transaction.savepoint_commit(sid)

        curation_dict = model_to_dict(curation)
        curation.save()

        for BIC in BookInCuration.objects.filter(curation=curation):
            book_content_list.append(model_to_dict(BIC))

        result_dict = { "curation": curation_dict, "book_content": book_content_list } 
        return JsonResponse(result_dict, status=201)

    # TODO elif request.method == 'DELETE':
    #    pass
    else:
        return HttpResponseNotAllowed(['POST', 'PUT'])

# test implemented
def search_curation(request, keyword):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    
    elif request.method == 'GET':
        decoded_keyword = urllib.parse.unquote(keyword)
        result_curations = []
        all_curations = Curation.objects.all()
        
        for curation in all_curations:
            if decoded_keyword in curation.title or decoded_keyword in curation.content:
                result_curations.append(make_curation_dict(curation))
            else:
                for book_in_curation in curation.book_in_curation.all():
                    if decoded_keyword in book_in_curation.book.title:
                        result_curations.append(make_curation_dict(curation))
                        break

        return JsonResponse(result_curations, safe=False)
    else:
        return HttpResponseNotAllowed(['POST', 'PUT', 'DELETE'])

# test implemented
def search_curation_by_author(request, username, page):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    if request.method == 'GET':
        author = User.objects.get(username=username)
        curation_list = Curation.objects.filter(author=author).order_by('-id')
        paginator = Paginator(curation_list, 5)
        results = paginator.get_page(page)
        curations=list()
        for curation in results:
            curation_dict = make_curation_dict(curation)
            curations.append(curation_dict) 
        response_dict = {'curations': curations, 'length': curation_list.count()}
        return JsonResponse(response_dict)
    else:
        return HttpResponseNotAllowed(['GET'])
    
def make_curation_dict(curation):
    ''' input: Curation object  ->   output: curation dict '''
    deltatime = (datetime.now() - curation.date)
    time_array = [deltatime.days//365, deltatime.days//30, deltatime.days, deltatime.seconds//3600, deltatime.seconds//60]

    user = get_object_or_404(User, id=curation.author_id)  # why becomes author_id, not author.id? 
    user_dict = {
        'id':user.id,
        'username':user.username,
        'profile_photo':user.profile.profile_photo.name,
        'nickname':user.profile.nickname,
    }

    book_in_curation = BookInCuration.objects.filter(curation=curation)
    book_list = [{'book': make_book_dict(get_object_or_404(Book, isbn=book.book_id), False), 'content': book.content} 
                 for book in book_in_curation]  # book_id: isbn 

    # NOT USED ANYMORE
    # like_query_result = CurationLike.objects.select_related('user').filter(curation_id=curation.id)
    # like_user_dict = [{'id': instance.user.id, 
    #                    'username': instance.user.username, 
    #                    'profile_photo': instance.user.profile.profile_photo.name, 
    #                    'nickname': instance.user.profile.nickname }
    #                    for instance in like_query_result]
    # like_dict = { 'count': like_query_result.count(), 'users': like_user_dict }
    likeusers = curation.like_users.all()

    curation_dict = {
        'id': curation.id,
        'author': user_dict,
        'books': book_list,    
        'title': curation.title,
        'content': curation.content,
        'date': time_array,
        'like_count': likeusers.count(), 
    }
    return curation_dict

# test implemented
def specific_curation(request, curation_id):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    elif request.method == 'GET':
        curation = get_object_or_404(Curation, id=curation_id)
        curation_dict = make_curation_dict(curation)
        curation_dict['like_or_not'] = curation.like_users.all().filter(id=request.user.id).exists()
        result_dict = {'curation':curation_dict, 'comments':get_comments(curation)}
        return JsonResponse(result_dict, status=200)
    elif request.method == 'DELETE':
        curation = get_object_or_404(Curation, id=curation_id)
        curation.delete()
        # curation_dict = model_to_dict(curation)
        # return JsonResponse(curation_dict, status=200)
        return HttpResponse(status=200)
    else:
        return HttpResponseNotAllowed(['GET', 'DELETE'])

# test implemented
def curation_page(request, page):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    elif request.method == 'GET':
        curations_all = Curation.objects.all().order_by('-id')
        paginator = Paginator(curations_all, 10)
        requested_list = paginator.page(page).object_list

        curations = [] 
        for curation in requested_list:
            curation_dict = make_curation_dict(curation)
            
            books = []
            book_set= []
            for books_in_cur in curation.book_in_curation.all():
                if(len(book_set)==4):
                    books.append(book_set)
                    book_set=[]
                book_set.append(make_book_dict(books_in_cur.book, False))
            books.append(book_set)

            curation_dict['books'] = books
            curation_dict['like_or_not'] = curation.like_users.all().filter(id=request.user.id).exists()
            curations.append(curation_dict)

        response_body = {'curations': curations, 'has_next': paginator.page(page).has_next()}
        return JsonResponse(response_body, status=200)

    else:
        return HttpResponseNotAllowed(['GET'])

# test implemented
def libraries(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    elif request.method == 'GET':
        libraries = list()
        for library in Library.objects.filter(user=request.user):
            library_dict = {
                'title': library.title,
                'date': library.date,
                'books': [],
                'id': library.id,
            }
                  
            for book_in_library in BookInLibrary.objects.filter(library=library):
                book = {
                    'isbn': book_in_library.book.isbn,
                    'title': book_in_library.book.title,
                    'thumbnail': book_in_library.book.thumbnail,
                }
                library_dict['books'].append(book)

            libraries.append(library_dict)

        return JsonResponse(libraries, status=200, safe=False)
        
    else:
        return HttpResponseNotAllowed(['GET'])
        

# test implemented
def library(request, library_id):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    elif request.method == 'GET':
        library = Library.objects.get(id=library_id)
        
        library_dict = {
            'title': library.title,
            'date': library.date,
            'books': [],
            'id': library.id,
        }

        for book_in_library in BookInLibrary.objects.filter(library=library):
            book = {
                'isbn': book_in_library.book.isbn,
                'title': book_in_library.book.title,
                'thumbnail': book_in_library.book.thumbnail,
            }
            library_dict['books'].append(book)

        return JsonResponse(library_dict, status=200)
    elif request.method == 'POST':
        # { title }
        try:
            req_data = json.loads(request.body.decode())
            title = req_data['title']
            books = req_data['books']
        except (KeyError) as e:
            return HttpResponse(status=400) 
        library = Library(user=request.user, title=title)
        library.save()
        library_dict = {
            'title': library.title,
            'date': library.date,
            'books': [],
            'id': library.id,
        }

        for book in books:
            __book = Book.objects.get(isbn=book['isbn'])
            BIL = BookInLibrary(library=library, book=__book)
            BIL.save()

            _book = {
                'isbn': __book.isbn,
                'title': __book.title,
                'thumbnail': __book.thumbnail
            }
            library_dict['books'].append(_book)

        return JsonResponse(library_dict, status=201)

    elif request.method == 'PUT':
        try:
            req_data = json.loads(request.body.decode())
            title = req_data['title']
            books = req_data['books']
        except:
            return HttpResponse(status=400)
        try:
            library = Library.objects.get(id=library_id)
        except:
            return HttpResponse(status=404)

        library.title = title
        library.save()
        library_dict = {
            'title': library.title,
            'date': library.date,
            'books': books,
            'id': library.id,
        }

        for book_in_library in BookInLibrary.objects.filter(library=library):
            if book_in_library.book.isbn not in list(map(lambda book: book['isbn'], books)):
                book_in_library.delete()
        
        for book in books:
            if book['isbn'] not in list(map(lambda book_in_library: book_in_library.book.isbn, BookInLibrary.objects.filter(library=library))):
                _book = Book.objects.get(isbn=book['isbn'])
                BIL = BookInLibrary(library=library, book=_book)
                BIL.save()

        return JsonResponse(library_dict, status=201)

    elif request.method == 'DELETE':
        library = Library.objects.get(id=library_id)
        library_dict = model_to_dict(library)
        library.delete()

        return JsonResponse(library_dict, status=200)
    else:
        return HttpResponseNotAllowed(['POST', 'GET', 'PUT', 'DELETE']) 

def specific_user(request, username):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    
    elif request.method == 'GET':
        try:
            user = User.objects.get(username=username)
            like_books=[]
            for book in user.book_set.all():
                book_dict = make_book_dict(book, False)
                like_books.append(book_dict)
            user_dict = {
                'id': user.id,
                'username': user.username,
                'profile_photo': user.profile.profile_photo.name,
                'nickname': user.profile.nickname,
                'profile_text': user.profile.profile_text,
                'like_books' : like_books
            }
            return JsonResponse(user_dict)
        except: 
            return HttpResponse(status=404)

    else:
        return HttpResponseNotAllowed(['GET',])

def like_books(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    
    elif request.method == 'GET':
        try:
            like_books=[]
            for book in request.user.book_set.all():
                book_dict = make_book_dict(book, False)
                like_books.append(book_dict)
            return JsonResponse(like_books, safe=False)
        except: 
            return HttpResponse(status=404)

    else:
        return HttpResponseNotAllowed(['GET',])


# test implemented
def search_user(request, keyword):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    
    elif request.method == 'GET':
        decoded_keyword =urllib.parse.unquote(keyword)
        result_users=[]
        all_users = User.objects.all()
        for user in all_users:
            if decoded_keyword in user.get_username() or decoded_keyword in user.profile.nickname:
                user_dict = {
                    'id': user.id,
                    'username': user.username,
                    'date_joined': user.date_joined.date(),
                    'profile_photo': user.profile.profile_photo.name,
                    'nickname': user.profile.nickname,
                    'profile_text': user.profile.profile_text,
                }
                result_users.append(user_dict)
        return JsonResponse(result_users, safe=False)
    
    else:
        return HttpResponseNotAllowed(['GET',])



# test implemented
def ocr(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    elif request.method == 'POST':
        try:
            image = request.FILES['image']
        except:
            # print("could not get image in ocr")
            return HttpResponse(status=400)
        
        fs = FileSystemStorage()
        filename = fs.save(image.name, image)
        # path = os.path.dirname(os.path.dirname(os.path.abspath(__file__))) + fs.url(filename)  # for run_text_detection(path)

        # path='https://www.booksbridge.online/media/zzz.jpg'
        path = 'https://www.booksbridge.online' + fs.url(filename)

        text = run_text_detection_url(path)     # OR run_text_detection(path): SHOULD DO WITH ABSOLUTE PATH
        text_dict = { 'quote': text }
        return JsonResponse(text_dict, status=200)                       

        
    else:
        return HttpResponseNotAllowed(['POST'])

# test implemented
def follow(request, user_id):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    elif request.method == 'POST':
        # { user_id } 
        try:
            followee = User.objects.get(id=user_id)  
            follow = Follow(follower=request.user, followee=followee)
            follow.save()
        except:
            return HttpResponse(status=404)
            
        follower_dict = {'id': follow.follower.id,
                         'username': follow.follower.username,
                         'profile_photo': follow.follower.profile.profile_photo.name,
                         'nickname': follow.follower.profile.nickname,
                         'date_joined': follow.follower.date_joined.date(),
                        }
        followee_dict = {'id': follow.followee.id,
                         'username': follow.followee.username,
                         'profile_photo': follow.followee.profile.profile_photo.name,
                         'nickname': follow.followee.profile.nickname,
                         'date_joined': follow.followee.date_joined.date(),
                        }
        
        follow_dict = {'follower_dict': follower_dict, 'followee_dict': followee_dict}
        send_alarm(request.user,followee,user_id,'user','follow')
        return JsonResponse(follow_dict, status=201)

    elif request.method == 'GET':
        # followers of the requested user
        follower_list = [get_object_or_404(User, id=x.follower_id) 
                         for x in Follow.objects.filter(followee_id=user_id)]   
        follower_list = [{'id': user.id,
                         'username':user.username,
                         'profile_photo':user.profile.profile_photo.name,
                         'nickname':user.profile.nickname,
                         'date_joined': user.date_joined.date(), } for user in follower_list]

        # users that requested user follows
        followee_list = [get_object_or_404(User, id=x.followee_id) 
                          for x in Follow.objects.filter(follower_id=user_id)]  
        followee_list = [{'id': user.id,
                         'username':user.username,
                         'profile_photo':user.profile.profile_photo.name,
                         'nickname':user.profile.nickname,
                         'date_joined': user.date_joined.date(), } for user in followee_list]

        result_dict = {'follower_list': follower_list, 'followee_list': followee_list}
        return JsonResponse(result_dict, status=200)

    elif request.method == 'DELETE':
        try:
            followee = get_object_or_404(User, id=user_id)  
            follow = Follow.objects.get(follower=request.user, followee=followee)
        except:
            return HttpResponse(status=404)

        follower_dict = {'id': follow.follower.id,
                         'username': follow.follower.username,
                         'profile_photo': follow.follower.profile.profile_photo.name,
                         'nickname': follow.follower.profile.nickname,
                         'date_joined': follow.follower.date_joined.date(),
                        }
        followee_dict = {'id': follow.followee.id,
                         'username': follow.followee.username,
                         'profile_photo': follow.followee.profile.profile_photo.name,
                         'nickname': follow.followee.profile.nickname,
                         'date_joined': follow.followee.date_joined.date(),
                        }
        
        follow_dict = {'follower_dict': follower_dict, 'followee_dict': followee_dict}

        follow.delete()

        return JsonResponse(follow_dict, status=200)
    else:
        return HttpResponseNotAllowed(['GET', 'POST','DELETE'])

def book_like(request, isbn):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    
    # in book detail page
    elif request.method == 'POST':
        book = get_object_or_404(Book, isbn=isbn)
        book.like_users.add(request.user)
        return JsonResponse(make_book_dict(book, True), status=201)
    
    # delete, in book detail page
    elif request.method == 'PUT':
        book = get_object_or_404(Book, isbn=isbn)
        book.like_users.remove(request.user)
        return JsonResponse(make_book_dict(book, True), status=201)

    else:
        return HttpResponseNotAllowed(['POST','PUT'])

def bookmark(request, username, page):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    if request.method == 'GET':
        user = get_object_or_404(User, username=username)
        like_list = ArticleLike.objects.filter(user=user).order_by('-id')
        paginator = Paginator(like_list, 5)
        results = paginator.get_page(page)
        articles = list()
        for like in results:
            article = like.article
            deltatime = datetime.now() - article.date
            time_array = [deltatime.days//365,deltatime.days//30,deltatime.days,deltatime.seconds//3600,deltatime.seconds//60]
            author_dict = make_user_dict(article.author)
            article_dict = {
                'author': author_dict,
                'book_isbn': article.book.isbn,
                'book_title': article.book.title,
                'id': article.id,
                'title': article.title,
                'content': article.content,
                'date': time_array,
                'is_long': article.is_long,
                'is_short': article.is_short,
                'is_phrase': article.is_phrase,
            }
            articles.append(article_dict)
            response_dict = {'articles':articles, 'length':like_list.count()}
        return JsonResponse(response_dict)
    else:
        return HttpResponseNotAllowed(['GET'])

def curation_bookmark(request, username, page):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    if request.method == 'GET':
        user = User.objects.get(username=username)
        like_list = CurationLike.objects.filter(user=user).order_by('-id')
        paginator = Paginator(like_list, 5)
        results = paginator.get_page(page)
        curations = list()
        for like in results:
            curation = like.curation
            curation_dict = make_curation_dict(curation)
            curations.append(curation_dict) 
        response_dict = {'curations': curations, 'length': like_list.count()}
        return JsonResponse(response_dict)
    else:
        return HttpResponseNotAllowed(['GET'])
    


# test implemented
def article_like(request, article_id):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    
    elif request.method == 'POST':
        article = get_object_or_404(Article, id=article_id)
        article.like_users.add(request.user)
        result_dict = make_article_dict(article)
        send_alarm(request.user,article.author,article_id,'article','like')
        result_dict['like_or_not'] = article.like_users.all().filter(id=request.user.id).exists()
        return JsonResponse(result_dict, status=201)
    
    elif request.method == 'GET':
        # to check if logged_in user liked this article before
        like_count = ArticleLike.objects.filter(article_id=article_id, user_id=request.user.id).count()  
        like_dict = { 'count': like_count }
        return JsonResponse(like_dict, status=200)
    
    elif request.method == 'DELETE':
        article = get_object_or_404(Article, id=article_id)
        article.like_users.remove(request.user)
        result_dict = make_article_dict(article)
        result_dict['like_or_not'] = article.like_users.all().filter(id=request.user.id).exists()
        return JsonResponse(result_dict, status=200)

    else:
        return HttpResponseNotAllowed(['GET', 'POST','DELETE'])

def curation_like(request, curation_id):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    
    elif request.method == 'POST':
        curation = get_object_or_404(Curation, id=curation_id)
        curation.like_users.add(request.user)
        result_dict = make_curation_dict(curation)
        send_alarm(request.user,curation.author,curation_id,'curation','like')
        result_dict['like_or_not'] = curation.like_users.all().filter(id=request.user.id).exists()
        return JsonResponse(result_dict, status=201)
    
    elif request.method == 'GET':  # NOT USED
        like_count = CurationLike.objects.filter(curation_id=curation_id, user_id=request.user.id).count()  
        like_dict = { 'count': like_count }
        return JsonResponse(like_dict, status=200)
    
    elif request.method == 'DELETE':
        curation = get_object_or_404(Curation, id=curation_id)
        curation.like_users.remove(request.user)
        result_dict = make_curation_dict(curation)
        result_dict['like_or_not'] = curation.like_users.all().filter(id=request.user.id).exists()
        return JsonResponse(result_dict, status=200)

    else:
        return HttpResponseNotAllowed(['GET', 'POST','DELETE'])

def make_user_dict(user):
    user_dict = {
        'id':user.id,
        'username':user.username,
        'profile_photo':user.profile.profile_photo.name,
        'nickname':user.profile.nickname,
    }
    return user_dict

def make_book_dict(book, full):
    if(full):
        users = []
        likeusers = book.like_users.all()
        for user in likeusers:
            user_dict = make_user_dict(user)
            users.append(user_dict)
        book_dict = {
        'isbn': book.isbn,
        'title': book.title,
        'contents': book.contents,
        'author_contents': book.author_contents,
        'url': book.url,
        'thumbnail': book.thumbnail,
        'authors':book.authors,
        'publisher':book.publisher,
        'published_date': book.published_date,
        'like_users': users,
        }
    else:
        book_dict = {
        'isbn': book.isbn,
        'title': book.title,
        'thumbnail': book.thumbnail,
        'authors':book.authors,
        'publisher':book.publisher,
        'published_date': book.published_date,
        }
    
    return book_dict


# def group(request):
#     if not request.user.is_authenticated:
#         return HttpResponse(status=401)
    
#     elif request.method == 'POST':
#         # 처음 그룹 생성
#         try:
#             req_data = json.loads(request.body.decode())
#             name = req_data['name']
#             explanation = req_data['explanation']
#         except (KeyError) as e:
#             return HttpResponse(status=400)
#         admin = request.user
        
#         with transaction.atomic():
#             group = Group(name=name, explanation=explanation)
#             group.save()
#             admin_in_group = AdminInGroup(admin=admin, group=group)
#             admin_in_group.save()
#             member_in_group = MemberInGroup(member=admin, group=group)
#             member_in_group.save()
        
#         # response format from group
#         # { name, explanation, admin_id, [member_id], {posts} }
#         response_dict = model_to_dict(group)
#         response_dict['admin'] = admin_in_group.admin.id
#         response_dict['members'] = member_in_group.member.id
#         response_dict['posts'] = None
#         return JsonResponse(response_dict, status=201)
    
#     elif request.method == 'GET':  
#         # 내가 속한 모든 그룹 가져오기
#         # [ {id, name, explanation}, { ... }, { ... }, ... ]
#         member_in_group = MemberInGroup.objects.select_related('group').filter(member_id=request.user.id)
#         groups = [ x.group for x in member_in_group]
#         result = [ { 'id': group.id, 'name': group.name, 'explanation': group.explanation } for group in groups ]
#         response_dict = { 'groups': result }
#         return JsonResponse(response_dict, status=200)
        
#     else:
#         return HttpResponseNotAllowed(['GET', 'POST'])


# def specific_group(request, group_id):
#     if not request.user.is_authenticated:
#         return HttpResponse(status=401)
    
#     elif request.method == 'POST':
#         # 그룹에 가입 
#         member_in_group = MemberInGroup(member=request.user, group_id=group_id)
#         member_in_group.save()
#         return HttpResponse(status=201)
    
    
#     #elif request.method == 'GET':  
#     #    # 그룹 정보 및 멤버 가져오기 (post 완료되면 post 정보도 가져오는 코드 추가 필요)
#     #    pass

#     #elif request.method == 'PUT':  
#     #    # 관리자인 경우 그룹 정보 수정
#     #    pass
    

#     #elif request.method == 'DELETE':  
#     #    # 그룹에서 탈퇴 (관리자인 경우 그룹도 함께 삭제)
#     #    pass
    
#     else:
#         return HttpResponseNotAllowed(['GET', 'POST', 'PUT', 'DELETE'])
    
# #def post(request, group_id):
# #    pass


# #def specific_post(request, group_id, post_id):
# #    pass






@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            return HttpResponse(status=200)
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])

