from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie , csrf_exempt
import json, re
import urllib.request, requests
from .models import *
from django.contrib.auth import authenticate, login, logout
from django.forms.models import model_to_dict
from django.shortcuts import get_object_or_404
from django.core.paginator import Paginator
from bs4 import BeautifulSoup
from django.db import transaction
import io, os
from django.core.files.storage import FileSystemStorage


def signup(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        email = req_data['email']
        password = req_data['password']
        User.objects.create_user(username, email, password)
        user = User.objects.get(username=username)
        Profile.objects.create(user=user, nickname=username)
        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['POST'])

def profile_update(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    elif request.method == 'PUT':
        profile = request.user.profile
        req_data = json.loads(request.body.decode())
        nickname = req_data['nickname']
        profile_text = req_data['profile_text']
        profile_photo = req_data['profile_photo']
        profile.nickname = nickname
        profile.profile_text = profile_text
        profile.profile_photo = profile_photo
        profile.save()  
        return HttpResponse(status=200)
    else:
        return HttpResponseNotAllowed(['PUT'])

def signin(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            user.save()
            user_dict = {'username':user.username, 'nickname':user.profile.nickname, 'profile_photo':user.profile.profile_photo.name, 'profile_text': user.profile.profile_text}
            return JsonResponse(user_dict, status=200)
        else:
            return HttpResponse(status=400)
    else:
        return HttpResponseNotAllowed(['POST'])

def signout(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            logout(request)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET'])

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
                        book_dict = model_to_dict(book_in_db)
                        book_response.append(book_dict)
                    except ValueError:
                        book_in_db = Book.objects.get(isbn = int(book['isbn'][5:]))
                        book_dict = model_to_dict(book_in_db)
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
                            published_date = book['datetime'][0:9],
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
                            published_date = book['datetime'][0:9],
                        )
                    new_book.save()
                    book_dict = model_to_dict(new_book)
                    book_response.append(book_dict)
            response_body={'books':book_response,'count': count}
            return JsonResponse(response_body)
        return HttpResponse(status=402)
    else:
        return HttpResponseNotAllowed(['GET']) 

def specific_book(request,isbn):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    elif request.method == 'GET':
        try:
            book_in_db = Book.objects.get(isbn = isbn)
            book_dict = model_to_dict(book_in_db)
            response = requests.get('https://m.search.daum.net/search'+book_in_db.url[30:]).text
        except:
            return HttpResponse(status=400)
        try:
            bs = BeautifulSoup(response, 'html.parser')
            tags = bs.findAll('p', attrs={'class': 'desc'})
            contents = tags[0].text
            author_info = tags[1].text
            book_dict['contents']=contents
            book_dict['author_contents']=author_info
        except:
            return JsonResponse(book_dict,status=200)
        return JsonResponse(book_dict,status=200)
    else:
        return HttpResponseNotAllowed(['GET'])

def search_article(request, isbn):
    if request.method == 'GET':
        articles = list()
        for article in Article.objects.filter(book_id=isbn).order_by('-id'):
            deltatime = (datetime.now() - article.date)
            time_array = [deltatime.days//365,deltatime.days//30,deltatime.days,deltatime.seconds//3600,deltatime.seconds//60]
            user = get_object_or_404(User, id=article.author_id)
            user_dict = {
                'id':user.id,
                'username':user.username,
                'profile_photo':user.profile.profile_photo.name,
                'nickname':user.profile.nickname,
            }
            article_dict = {
                'author': user_dict,
                'book_isbn': article.book.isbn,
                'book_title': article.book.title,
                'book_thumbnail': article.book.thumbnail,
                'id': article.id,
                'title': article.title,
                'content': article.content,
                'date': time_array,
                'is_long': article.is_long,
                'is_short': article.is_short,
                'is_phrase': article.is_phrase
            }
            articles.append(article_dict)
        return JsonResponse(articles, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])

def search_article_by_userID(request, user_id):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    if request.method == 'GET':
        articles = list()
        for article in Article.objects.filter(author=user_id):
            deltatime = datetime.now() - article.date
            time_array = [deltatime.days//365,deltatime.days//30,deltatime.days,deltatime.seconds//3600,deltatime.seconds//60]
            user = get_object_or_404(User, id=article.author_id)
            user_dict = {
                'id':user.id,
                'username':user.username,
                'profile_photo':user.profile.profile_photo.name,
                'nickname':user.profile.nickname,
            }
            article_dict = {
                'author': user_dict,
                'book_isbn': article.book.isbn,
                'book_title': article.book.title,
                'book_thumbnail': article.book.thumbnail,
                'id': article.id,
                'title': article.title,
                'content': article.content,
                'date': time_array,
                'is_long': article.is_long,
                'is_short': article.is_short,
                'is_phrase': article.is_phrase
            }
            articles.append(article_dict)
        
        return JsonResponse(articles, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])

def specific_article(request,review_id):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    elif request.method == 'GET':
        article = get_object_or_404(Article, id=review_id)
        book_in_db = get_object_or_404(Book, isbn=article.book.isbn)
        book_dict = model_to_dict(book_in_db)
        user = get_object_or_404(User, id=article.author_id)
        user_dict = {'id':user.id, 'username':user.username,'nickname':user.profile.nickname,'profile_photo':user.profile.profile_photo.name}
        comments = get_comments(article)
        response_dict = {'id':article.id, 'author':user_dict, 'book':book_dict, 'title':article.title, 'content':article.content, 'date':article.date, 'comments': comments}
        return JsonResponse(response_dict)
    else:
        return HttpResponseNotAllowed(['GET'])

def get_comments(article):
    comments = list()
    for comment in article.comments.all():
        deltatime = (datetime.now() - comment.date)
        time_array = [deltatime.days//365,deltatime.days//30,deltatime.days,deltatime.seconds//3600,deltatime.seconds//60]
        comment_author = get_object_or_404(User, id=comment.author_id)
        comment_author_dict = {
            'id':comment_author.id,
            'username':comment_author.username,
            'profile_photo':comment_author.profile.profile_photo.name,
            'nickname':comment_author.profile.nickname,
        }
        if(comment.parent==None):
            replies = list()
            for reply in comment.replies.all():
                reply_deltatime = (datetime.now() - reply.date)
                reply_time_array = [reply_deltatime.days//365,reply_deltatime.days//30,reply_deltatime.days,reply_deltatime.seconds//3600,reply_deltatime.seconds//60]
                reply_author = get_object_or_404(User, id=reply.author_id)
                reply_author_dict = {
                    'id':reply_author.id,
                    'username':reply_author.username,
                    'profile_photo':reply_author.profile.profile_photo.name,
                    'nickname':reply_author.profile.nickname,
                }
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

def comment(request):
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
            parent = Comment.objects.get(id=parent_id)
        except Comment.DoesNotExist:
            parent = None
        comment = Comment(article=article, author=request.user, content=content, parent=parent)
        comment.save()
        comments = get_comments(article)
        book_in_db = get_object_or_404(Book, isbn=article.book.isbn)
        book_dict = model_to_dict(book_in_db)
        user = get_object_or_404(User, id=article.author_id)
        user_dict = {'id':user.id, 'username':user.username,'nickname':user.profile.nickname,'profile_photo':user.profile.profile_photo.name}
        response_dict = {'id':article.id, 'author':user_dict, 'book':book_dict, 'title':article.title, 'content':article.content, 'date':article.date, 'comments': comments}
        return JsonResponse(response_dict, status=201)
    # TODO elif request.method == 'PUT':
    #    pass
    # TODO elif request.method == 'DELETE':
    #    pass
    else:
        return HttpResponseNotAllowed(['POST', 'PUT', 'DELETE']) 

@csrf_exempt
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
        except (KeyError) as e:
            return HttpResponse(status=400)

        try:
            book = Book.objects.get(isbn=isbn)   
        except Book.DoesNotExist:
            return HttpResponse(status=404)

        article = Article(author=request.user, book=book, content=content, title=title, is_long=is_long, is_short=is_short, is_phrase=is_phrase)
        article.save()
        article_dict = model_to_dict(article)
        return JsonResponse(article_dict, status=201)
    # TODO elif request.method == 'PUT':
    #    pass
    # TODO elif request.method == 'DELETE':
    #    pass
    else:
        return HttpResponseNotAllowed(['POST', 'PUT', 'DELETE']) 

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
            # isbn_content_list = [(isbn, content) for (isbn, content) in isbn_content_pairs]
        except (KeyError) as e:
            return HttpResponse(status=400)

        try:
            book_content_list = [(Book.objects.get(isbn=int(isbn)), content) for (isbn, content) in isbn_content_list]  
        except Book.DoesNotExist:
            return HttpResponse(status=404)
    
        # TRANSACTION FORM!
        sid = transaction.savepoint()

        try:
            curation = Curation(author=request.user, title=title, content=content)
            curation.save()
            curation_dict = model_to_dict(curation)

            book_content_dict = []
            for (book, content) in book_content_list:
                new_book_in_curation = BookInCuration(curation=curation, book=book, content=content) 
                new_book_in_curation.save()
                book_content_dict.append(model_to_dict(new_book_in_curation))
            
            transaction.savepoint_commit(sid)
        except:
            transaction.savepoint_rollback(sid)
            return HttpResponse(status=400)
            
        result_dict = { "curation": curation_dict, "book_content": book_content_dict } 
        return JsonResponse(result_dict, status=201)
    # TODO elif request.method == 'PUT':
    #    pass
    # TODO elif request.method == 'DELETE':
    #    pass
    else:
        return HttpResponseNotAllowed(['POST', 'PUT', 'DELETE'])
      

def article_page(request, page):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    elif request.method == 'GET':
        articles_all = Article.objects.all().order_by('-id')
        paginator = Paginator(articles_all, 10)
        articles_list = paginator.page(page).object_list
        articles = list()
        for article in articles_list:
            deltatime = (datetime.now() - article.date)
            time_array = [deltatime.days//365,deltatime.days//30,deltatime.days,deltatime.seconds//3600,deltatime.seconds//60]
            user = get_object_or_404(User, id=article.author_id)
            user_dict = {
                'id':user.id,
                'username':user.username,
                'profile_photo':user.profile.profile_photo.name,
                'nickname':user.profile.nickname,
            }
            article_dict = {
                'author': user_dict,
                'book_isbn': article.book.isbn,
                'book_title': article.book.title,
                'book_thumbnail': article.book.thumbnail,
                'id': article.id,
                'title': article.title,
                'content': article.content,
                'date': time_array,
                'is_long': article.is_long,
                'is_short': article.is_short,
                'is_phrase': article.is_phrase
            }
            articles.append(article_dict)
        # articles = list(articles_all.values())
        # response_body={'articles':articles,'count': Article.objects.count()} 
        response_body={'articles': articles, 'has_next': paginator.page(page).has_next()}
        return JsonResponse(response_body)

def ocr(request):
    if request.method == 'POST':
        try:
            image = request.FILES['image']
        except:
            print("could not get image")
            return HttpResponse(status=400)

        fs = FileSystemStorage()
        filename = fs.save(image.name, image)
        path = fs.url(filename)

        from google.cloud import vision
        client = vision.ImageAnnotatorClient()

        try:
            with io.open(path, 'rb') as image_file:
                content = image_file.read()
        except:
            print("couldn't open file")
            return HttpResponse(status=400)

        image = vision.types.Image(content=content)

        response = client.document_text_detection(image=image)

        result = ""
        for page in response.full_text_annotation.pages:
            for block in page.blocks:
                for paragraph in block.paragraphs:
                    for word in paragraph.words:
                        word_text = ''.join([
                            symbol.text for symbol in word.symbols
                        ])
                        result += word_text + ' '
                        
        '''
        #uri = 'http://127.0.0.1:8000/api/ocr/' + image.name
        url = image.temporary_file_path
        from google.cloud import vision
        client = vision.ImageAnnotatorClient()
        image = vision.types.Image()
        image.source.image_uri = uri

        response = client.document_text_detection(image=image)
        result = "yeah"
        for page in response.full_text_annotation.pages:
            for block in page.blocks:
                for paragraph in block.paragraphs:
                    for word in paragraph.words:
                        word_text = ''.join([
                            symbol.text for symbol in word.symbols
                        ])
                        result += word_text + " "
        '''
        result_dict = { 'quote': result }
        return JsonResponse(result_dict, status=200)
    else:
        return HttpResponseNotAllowed(['POST'])

def library(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    # TODO elif request.method == 'GET':
    #    pass
    elif request.method == 'POST':
        # { title }
        try:
            req_data = json.loads(request.body.decode())
            title = req_data['title']
        except (KeyError) as e:
            return HttpResponse(status=400) 
        library = Library(user=request.user, title=title)
        library.save()
        library_dict = model_to_dict(library)
        return JsonResponse(library_dict, status=201)
    # TODO elif request.method == 'PUT':
    #    pass
    # TODO elif request.method == 'DELETE':
    #    pass
    else:
        return HttpResponseNotAllowed(['POST', 'GET', 'PUT', 'DELETE']) 

def book_in_library(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    # TODO elif request.method == 'GET':
    #    pass
    elif request.method == 'POST':
        # { isbn, library }: library means library_id (정수라고 가정)
        try:
            req_data = json.loads(request.body.decode())
            book = Book.objects.get(isbn=int(req_data['isbn']))
            library = Library.objects.get(id=int(req_data['library']))
        except (KeyError) as e:
            return HttpResponse(status=400) 
        


        book_in_library = BookInLibrary(book=book, library=library)
        book_in_library.save()
        result_dict = model_to_dict(book_in_library)
        return JsonResponse(result_dict, status=201)
    # TODO elif request.method == 'DELETE':
    #    pass
    else:
        return HttpResponseNotAllowed(['POST', 'GET', 'DELETE']) 

def specific_user(request, user_id):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    
    elif request.method == 'GET':
        try:
            user = User.objects.get(id=user_id)
            user_dict = {
                'id': user.id,
                'username': user.username,
                'profile_photo': user.profile.profile_photo.name,
                'nickname': user.profile.nickname,
                'profile_text': user.profile.profile_text,
            }
            return JsonResponse(user_dict)
        except: 
            return HttpResponse(status=404)

    else:
        return HttpResponseNotAllowed(['GET',])

@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])