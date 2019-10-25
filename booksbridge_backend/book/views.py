from django.http import HttpResponse, HttpResponseNotAllowed, JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import ensure_csrf_cookie , csrf_exempt
import json
import urllib.request, requests
from .models import Book
from django.contrib.auth import authenticate, login, logout
from django.forms.models import model_to_dict

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
                        continue
                except Book.DoesNotExist:
                    new_book = Book(
                        isbn = int(book['isbn'][11:]) if (len(book['isbn']) == 24) else int(book['isbn']),
                        title = book['title'],
                        contents = book['contents'],
                        url = book['url'],
                        thumbnail = book['thumbnail'],
                        authors = book['authors'],
                        publisher = book['publisher'],
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
        return HttpResponseNotAllowed


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])