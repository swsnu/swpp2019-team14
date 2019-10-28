from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie , csrf_exempt
import json
import urllib.request, requests
from .models import *  
from django.contrib.auth import authenticate, login, logout
from django.forms.models import model_to_dict

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


@csrf_exempt
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
                            authors = book['authors'],
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
                            authors = book['authors'],
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

@csrf_exempt
def specific_book(request,isbn):
    if request.method == 'GET':
        book_in_db = Book.objects.get(isbn = isbn)
        book_dict = model_to_dict(book_in_db)
        return JsonResponse(book_dict,status=200)
    else:
        return HttpResponseNotAllowed(['GET'])


@csrf_exempt
def short_review(request):
    if request.method == 'POST':
        try:
            req_data = json.loads(request.body.decode())
            isbn = int(req_data['isbn'])
            title = req_data['title']
            content = req_data['content']
        except (KeyError) as e:
            return HttpResponse(status=400)
        try:
            book = Book.objects.get(isbn=isbn)   # 미움받을 용기는 되나 문병로 알고리즘은 안 됨 
        except Book.DoesNotExist:
            return HttpResponse(status=404)
        short_review = ShortReview(author=request.user, book=book, content=content, title=title)
        short_review.save()
        short_review_dict = model_to_dict(short_review)
        return JsonResponse(short_review_dict, status=201)
    else:
        pass

def long_review(request):
    pass

def phrase(request):
    pass




@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])