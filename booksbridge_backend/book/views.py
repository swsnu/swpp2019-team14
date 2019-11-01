from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie , csrf_exempt
import json
import urllib.request, requests
from .models import *
from django.contrib.auth import authenticate, login, logout
from django.forms.models import model_to_dict
from django.shortcuts import get_object_or_404
from django.core.paginator import Paginator


def signup(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        email = req_data['email']
        password = req_data['password']
        User.objects.create_user(username, email, password)
        return HttpResponse(status=201)
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
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=400)
    else:
        return HttpResponseNotAllowed(['POST'])

def searchbooks(request,keyword,page):
    if request.method == 'GET':
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
        return HttpResponseNotAllowed(['GET','PUT','DELETE']) 

def specific_book(request,isbn):
    if request.method == 'GET':
        book_in_db = Book.objects.get(isbn = isbn)
        book_dict = model_to_dict(book_in_db)
        return JsonResponse(book_dict,status=200)
    else:
        return HttpResponseNotAllowed(['GET'])

def searchArticle(request, isbn):
    if request.method == 'GET':
        review_all_list = [review for review in Article.objects.filter(book_id=isbn).values()]
        return JsonResponse(review_all_list, safe=False)
    else:
        return HttpResponseNotAllowed(['GET'])

def specific_article(request,review_id):
    if request.method == 'GET':
        article = get_object_or_404(Article, id=review_id)
        book_in_db = get_object_or_404(Book, isbn=article.book.isbn)
        book_dict = model_to_dict(book_in_db)
        response_dict = {'id':article.id, 'author':article.author_id, 'book':book_dict, 'title':article.title, 'content':article.content, 'date':article.date}
        return JsonResponse(response_dict)
    else:
        return HttpResponseNotAllowed(['GET'])

@csrf_exempt
def article(request):
    if request.method == 'GET':
        articles_all = Article.objects.all()
        paginator = Paginator(articles_all, 10)
        page = request.GET.get('page')
        articles = list(paginator.page(page).object_list.values())
        return JsonResponse(articles, safe=False)
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
    else:
        pass

def curation(request):
    # {title, content, isbn_content_pairs} from frontend
    if request.method == 'GET':
        pass
    elif request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            isbn = int(req_data['isbn'])
            title = req_data['title']
            content = req_data['content']
            isbn_content_list = req_data['isbn_content_pairs'] 
            # isbn_content_list = [(isbn, content) for (isbn, content) in isbn_content_pairs]
        except (KeyError) as e:
            return HttpResponse(status=400)

        try:
            book_content_list = [(Book.object.get(isbn=isbn), content) for (isbn, content) in isbn_content_list]  
        except Book.DoesNotExist:
            return HttpResponse(status=404)
    
        # should fix into TRANSACTION FORM!
        curation = Curation(author=request.user, title=title, content=content)
        curation.save()
        curation_dict = model_to_dict(curation)

        book_content_dict = []
        for (book, content) in book_content_list:
            new_book_in_curation = BookInCuration(curation=curation, book=book, content=content) 
            new_book_in_curation.save()
            book_content_dict.append(model_to_dict(new_book_in_curation))

        result_dict = { "curation": curation_dict, "book_content": book_content_dict } 
        return JsonResponse(result_dict, status=201)
    else:
        pass





@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])