from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie , csrf_exempt
import json, re
import urllib, requests
from .models import *
from django.contrib.auth import authenticate, login, logout
from django.forms.models import model_to_dict
from django.shortcuts import get_object_or_404, get_list_or_404
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
        user_dict = {'id':request.user.id, 'username':request.user.username, 'nickname':profile.nickname, 'profile_photo':profile.profile_photo.name, 'profile_text': profile.profile_text}
        return JsonResponse(user_dict, status=200)
    else:
        return HttpResponseNotAllowed(['PUT'])

def photo_upload(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    elif request.method == 'POST':
        # print(request)
        try:
            image = request.FILES['image']
        except:
            print("could not get image")
            return HttpResponse(status=400)
        profile = request.user.profile
        profile.profile_photo = image
        profile.save()
        user_dict = {'id':request.user.id, 'username':request.user.username, 'nickname':profile.nickname, 'profile_photo':profile.profile_photo.name, 'profile_text': profile.profile_text}
        return JsonResponse(user_dict, status=200)
    else:
        return HttpResponseNotAllowed(['POST'])

def signin(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            user.save()
            user_dict = {'id':user.id, 'username':user.username, 'nickname':user.profile.nickname, 'profile_photo':user.profile.profile_photo.name, 'profile_text': user.profile.profile_text}
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


def make_article_dict(article):
    ''' input: Article instance   ->  output: article dict  '''
    deltatime = datetime.now() - article.date
    time_array = [deltatime.days//365,deltatime.days//30,deltatime.days,deltatime.seconds//3600,deltatime.seconds//60]
    user = get_object_or_404(User, id=article.author_id)
    user_dict = {
        'id':user.id,
        'username':user.username,
        'profile_photo':user.profile.profile_photo.name,
        'nickname':user.profile.nickname,
    }

    book_in_db = get_object_or_404(Book, isbn=article.book.isbn)
    book_dict = model_to_dict(book_in_db)

    comments = get_comments(article)
    article_dict = {
        'author': user_dict,
        'book':book_dict, 
        # 'book_isbn': article.book.isbn,
        # 'book_title': article.book.title,
        # 'book_thumbnail': article.book.thumbnail,
        'id': article.id,
        'title': article.title,
        'content': article.content,
        'date': time_array,
        'is_long': article.is_long,
        'is_short': article.is_short,
        'is_phrase': article.is_phrase,
        'comments': comments,
    }

    return article_dict


def search_article(request, isbn):
    if request.method == 'GET':
        articles = [] 
        articles_list = Article.objects.filter(book_id=isbn).order_by('-id')
        for article in articles_list:
            articles.append(make_article_dict(article))
        return JsonResponse(articles, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])

def search_article_by_author(request, page, username):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    if request.method == 'GET':
        author = User.objects.get(username=username)
        article_list = Article.objects.filter(author=author).order_by('-id')
        paginator = Paginator(article_list, 5)
        results = paginator.get_page(page)
        articles=list()
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

def specific_article(request,review_id):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    elif request.method == 'GET':
        article = get_object_or_404(Article, id=review_id)
        return JsonResponse(make_article_dict(article))
        # book_in_db = get_object_or_404(Book, isbn=article.book.isbn)
        # book_dict = model_to_dict(book_in_db)
        # user = get_object_or_404(User, id=article.author_id)
        # user_dict = {
        #     'id':user.id, 
        #     'username':user.username,
        #     'nickname':user.profile.nickname,
        #     'profile_photo':user.profile.profile_photo.name
        # }
        # comments = get_comments(article, True)
        # response_dict = {
        #     'id':article.id, 
        #     'author':user_dict, 
        #     'book':book_dict, 
        #     'title':article.title, 
        #     'content':article.content, 
        #     'date':article.date, 
        #     'comments': comments
        # }
        # return JsonResponse(response_dict)
    else:
        return HttpResponseNotAllowed(['GET'])

def article_page(request, page):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    elif request.method == 'GET':
        articles_all = Article.objects.all().order_by('-id')
        paginator = Paginator(articles_all, 10)
        articles_list = paginator.page(page).object_list
        articles = []
        for article in articles_list:
            articles.append(make_article_dict(article))
        # articles = list(articles_all.values())
        # response_body={'articles':articles,'count': Article.objects.count()} 
        response_body={'articles': articles, 'has_next': paginator.page(page).has_next()}
        return JsonResponse(response_body)


def get_comments(post):
    comments = []
    iteration = post.comments.all()
     
    for comment in iteration:
        deltatime = (datetime.now() - comment.date)
        time_array = [deltatime.days//365,deltatime.days//30,deltatime.days,deltatime.seconds//3600,deltatime.seconds//60]
        comment_author = get_object_or_404(User, id=comment.author_id)
        comment_author_dict = {
            'id':comment_author.id,
            'username':comment_author.username,
            'profile_photo':comment_author.profile.profile_photo.name,
            'nickname':comment_author.profile.nickname,
        }
        if comment.parent == None:
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
        except ArticleComment.DoesNotExist:
            parent = None
        comment = ArticleComment(article=article, author=request.user, content=content, parent=parent)
        comment.save()
        return JsonResponse(make_article_dict(article), status=201)
    # TODO elif request.method == 'PUT':
    #    pass
    # TODO elif request.method == 'DELETE':
    #    pass
    else:
        return HttpResponseNotAllowed(['POST', 'PUT', 'DELETE']) 

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
        except CurationComment.DoesNotExist:
            parent = None

        comment = CurationComment(curation=curation, author=request.user, content=content, parent=parent)
        comment.save()
        
        return JsonResponse(make_curation_dict(curation), status=201)
    # TODO elif request.method == 'PUT':
    #    pass
    # TODO elif request.method == 'DELETE':
    #    pass
    else:
        return HttpResponseNotAllowed(['POST', 'PUT', 'DELETE']) 



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
        except (KeyError) as e:
            return HttpResponse(status=400)

        # TRANSACTION FORM!
        sid = transaction.savepoint()

        try:
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
        except:
            transaction.savepoint_rollback(sid)
            return HttpResponse(status=400)
            
        result_dict = { "curation": curation_dict, "book_content": book_content_list } 
        return JsonResponse(result_dict, status=201)
    # TODO elif request.method == 'PUT':
    #    pass
    # TODO elif request.method == 'DELETE':
    #    pass
    else:
        return HttpResponseNotAllowed(['POST', 'PUT', 'DELETE'])

def search_curation(request, keyword):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    
    elif request.method == 'GET':
        decoded_keyword =urllib.parse.unquote(keyword)
        result_users=[]
        all_users = User.objects.all()
        if all_users:
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
    
def make_curation_dict(curation):
    # TODO: comments
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
    book_list = [{'book': model_to_dict(get_object_or_404(Book, isbn=book.book_id)), 'content': book.content} 
                 for book in book_in_curation]  # book_id: isbn 

    comments = get_comments(curation)

    likes = CurationLike.objects.filter(curation_id=curation.id).count()

    curation_dict = {
        'id': curation.id,
        'author': user_dict,
        'books': book_list,    
        'title': curation.title,
        'content': curation.content,
        'date': time_array,
        'comments': comments,
        'likes': likes
    }
 
    return curation_dict


def specific_curation(request, curation_id):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    elif request.method == 'GET':
        curation = get_object_or_404(Curation, id=curation_id)
        return JsonResponse(make_curation_dict(curation), status=200)
    else:
        return HttpResponseNotAllowed(['GET'])


def curation_page(request, page):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    elif request.method == 'GET':
        curations_all = Curation.objects.all().order_by('-id')
        paginator = Paginator(curations_all, 10)
        requested_list = paginator.page(page).object_list

        curations = [] 
        for curation in requested_list:
            deltatime = (datetime.now() - curation.date)
            time_array = [deltatime.days//365, deltatime.days//30, deltatime.days, deltatime.seconds//3600, deltatime.seconds//60]
            books = []
            book_set= []
            for books_in_cur in curation.book_in_curation.all():
                if(len(book_set)==4):
                    books.append(book_set)
                    book_set=[]
                book_set.append(model_to_dict(books_in_cur.book))
            books.append(book_set)
            user=curation.author
            user_dict = {
                'id':user.id,
                'username':user.username,
                'profile_photo':user.profile.profile_photo.name,
                'nickname':user.profile.nickname,
            }
            curation_dict = {
                'id': curation.id,
                'books': books,
                'author': user_dict,
                'title': curation.title,
                'content': curation.content,
                'date': time_array,
            }
            curations.append(curation_dict)
        response_body = {'curations': curations, 'has_next': paginator.page(page).has_next()}
        return JsonResponse(response_body, status=200)
    
    else:
        return HttpResponseNotAllowed(['GET'])

def libraries(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    elif request.method == 'GET':
        try:
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
        except:
            return HttpResponse(status=404)

        return JsonResponse(libraries, status=200, safe=False)
        
    else:
        return HttpResponseNotAllowed(['GET'])
        

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
"""
////* THERE IS ABSOLUTELY NO NEED TO DEFINE THIS VIEW *///////
def book_in_library(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    # TODO elif request.method == 'GET':
    #    pass
    elif request.method == 'POST':
        # { isbn, library }: library means library_id (정수라고 가정)
        try:
            req_data = json.loads(request.body.decode())
            isbn = req_data['isbn']
            library_id = req_data['library']
            book = Book.objects.get(isbn=int(isbn))
            library = Library.objects.get(id=int(library_id))
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
"""

def specific_user(request, username):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    
    elif request.method == 'GET':
        try:
            user = User.objects.get(username=username)
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

def search_user(request, keyword):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    
    elif request.method == 'GET':
        decoded_keyword =urllib.parse.unquote(keyword)
        result_users=[]
        all_users = User.objects.all()
        if all_users:
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

def run_text_detection(path):
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
    return result


def ocr(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    elif request.method == 'POST':
        try:
            image = request.FILES['image']
        except:
            return HttpResponse(status=400)

        fs = FileSystemStorage()
        filename = fs.save(image.name, image)
        path = fs.url(filename)

        result = run_text_detection(path)
        result_dict = { 'quote': result }
        return JsonResponse(result_dict, status=200)                       

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
    else:
        return HttpResponseNotAllowed(['POST'])

def follow(request, user_id):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

    elif request.method == 'POST':
        # { user_id } 
        try:
            followee = get_object_or_404(User, id=user_id)  
            follow = Follow(follower=request.user, followee=followee)
        except:
            HttpResponse(status=404)
            
        follow.save()
        follower_dict = {'id': follow.follower.id,
                         'username': follow.follower.username,
                         'profile_photo': follow.follower.profile.profile_photo.name,
                         'nickname': follow.follower.profile.nickname 
                        }
        followee_dict = {'id': follow.followee.id,
                         'username': follow.followee.username,
                         'profile_photo': follow.followee.profile.profile_photo.name,
                         'nickname': follow.followee.profile.nickname 
                        }
        
        follow_dict = {'follower_dict': follower_dict, 'followee_dict': followee_dict}
        return JsonResponse(follow_dict, status=201)

    elif request.method == 'GET':
        # followers of the requested user
        follower_list = [get_object_or_404(User, id=x.follower_id) 
                         for x in Follow.objects.filter(followee_id=user_id)]   
        follower_list = [{'id': user.id,
                         'username':user.username,
                         'profile_photo':user.profile.profile_photo.name,
                         'nickname':user.profile.nickname } for user in follower_list]

        # users that requested user follows
        followee_list = [get_object_or_404(User, id=x.followee_id) 
                          for x in Follow.objects.filter(follower_id=user_id)]  
        followee_list = [{'id': user.id,
                         'username':user.username,
                         'profile_photo':user.profile.profile_photo.name,
                         'nickname':user.profile.nickname } for user in followee_list]

        result_dict = {'follower_list': follower_list, 'followee_list': followee_list}
        return JsonResponse(result_dict, status=200)

    elif request.method == 'DELETE':
        try:
            followee = get_object_or_404(User, id=user_id)  
            follow = Follow.objects.get(follower=request.user, followee=followee)
        except:
            HttpResponse(status=404)

        follower_dict = {'id': follow.follower.id,
                         'username': follow.follower.username,
                         'profile_photo': follow.follower.profile.profile_photo.name,
                         'nickname': follow.follower.profile.nickname 
                        }
        followee_dict = {'id': follow.followee.id,
                         'username': follow.followee.username,
                         'profile_photo': follow.followee.profile.profile_photo.name,
                         'nickname': follow.followee.profile.nickname 
                        }
        
        follow_dict = {'follower_dict': follower_dict, 'followee_dict': followee_dict}

        follow.delete()

        return JsonResponse(follow_dict, status=200)
    else:
        return HttpResponseNotAllowed(['GET', 'POST','DELETE'])

def article_like(request, article_id):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    
    elif request.method == 'POST':
        like = ArticleLike(user=request.user, article_id=article_id) 
        like.save()
        article = get_object_or_404(Article, id=article_id)
        result_dict = make_article_dict(article)
        return JsonResponse(result_dict, status=201)
    
    elif request.method == 'GET':
        like_count = ArticleLike.objects.filter(article_id=article_id, user_id=request.user.id).count()  
        like_dict = { 'count': like_count }
        return JsonResponse(like_dict, status=200)
    
    elif request.method == 'DELETE':
        like = get_object_or_404(ArticleLike, article_id=article_id, user_id=request.user.id)
        like.delete()
        article = get_object_or_404(Article, id=article_id)
        result_dict = make_article_dict(article)
        return JsonResponse(result_dict, status=200)

    # elif request.method == 'POST':
    #     like = ArticleLike(user=request.user, article_id=article_id) 
    #     like.save()
    #     like_dict = model_to_dict(like)
    #     return JsonResponse(like_dict, status=201)
    
    # elif request.method == 'GET':
    #     like_count = ArticleLike.objects.filter(article_id=article_id).count()
    #     like_dict = { 'count': like_count }
    #     return JsonResponse(like_dict, status=200)
    
    # elif request.method == 'DELETE':
    #     like = get_object_or_404(ArticleLike, article_id=article_id, user_id=user_id)
    #     like_dict = model_to_dict(like)
    #     like.delete()
    #     return JsonResponse(like_dict, status=200)

    else:
        return HttpResponseNotAllowed(['GET', 'POST','DELETE'])



def curation_like(request, curation_id):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    
    elif request.method == 'POST':
        like = CurationLike(user=request.user, curation_id=curation_id) 
        like.save()
        curation = get_object_or_404(Curation, id=curation_id)
        result_dict = make_curation_dict(curation)
        return JsonResponse(result_dict, status=201)
    
    elif request.method == 'GET':
        like_count = CurationLike.objects.filter(curation_id=curation_id, user_id=request.user.id).count()  
        like_dict = { 'count': like_count }
        return JsonResponse(like_dict, status=200)
    
    elif request.method == 'DELETE':
        like = get_object_or_404(CurationLike, curation_id=curation_id, user_id=request.user.id)
        like.delete()
        curation = get_object_or_404(Curation, id=curation_id)
        result_dict = make_curation_dict(curation)
        return JsonResponse(result_dict, status=200)

    else:
        return HttpResponseNotAllowed(['GET', 'POST','DELETE'])




@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])

