
from django.test import TestCase, Client
from .models import *
from django.contrib.auth.models import User
from urllib import parse
import json
from unittest.mock import MagicMock, patch
from .views import make_article_dict, make_curation_dict


class BookTestCase(TestCase):

    def setUp(self):
        book1 = Book(isbn='9780393912470', title='I Love SWPP!', contents='contents', url='url', thumbnail='thumbnail', authors='authors', publisher='publishers', published_date='published_date')
        book1.save()
        book2 = Book(isbn='9780140447934', title='I Love SWPP!', contents='contents', url='url', thumbnail='thumbnail', authors='authors', publisher='publishers', published_date='published_date')
        book2.save()
        book3 = Book(isbn='9780131103627', title='I Love SWPP!', contents='contents', url='url', thumbnail='thumbnail', authors='authors', publisher='publishers', published_date='published_date')
        book3.save()
        book4 = Book(isbn='9780131103628', title='I Love SWPP!', contents='contents', url='url', thumbnail='thumbnail', authors='authors', publisher='publishers', published_date='published_date')
        book4.save()
        book5 = Book(isbn='9780131103629', title='I Love SWPP!', contents='contents', url='url', thumbnail='thumbnail', authors='authors', publisher='publishers', published_date='published_date')
        book5.save()
        book6 = Book(isbn='9780131103630', title='I Love SWPP!', contents='contents', url='url', thumbnail='thumbnail', authors='authors', publisher='publishers', published_date='published_date')
        book6.save()

        client = Client()

        # Create user
        user = User.objects.create_user(
            email='team14@snu.ac.kr',
            username='Fourteen',
            password='mypassword')

        Profile.objects.create(user=user)

        # Sign in
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'Fourteen',
                                   'password': 'mypassword',
                                   'auto_login': False
                               }),
                               content_type='application/json')


        # Book registration
        client.get('/api/book/' + parse.quote('The Norton Anthology') + '/1/',
                   content_type='application/json')

        client.get('/api/book/' + parse.quote('War and Peace') + '/1/',
                   content_type='application/json')
        
        client.get('/api/book/' + parse.quote('C programming') + '/1/',
                   content_type='application/json')

        # Article registration
        client.post('/api/article/',
                    json.dumps({
                        'isbn': '9780393912470',
                        'title': 'test_title',
                        'content': 'test_content',
                        'is_long': True,
                        'is_short': False,
                        'is_phrase': False,
                        'is_spoiler': False,
                    }),
                    content_type='application/json')

        # Article Like
        response = client.post('/api/like/article/1/',
                               json.dumps({}),
                               content_type='application/json')

        # Library registration
        client.post('/api/library/9999/',
                    json.dumps({
                        'title': 'test_library',
                        'books': [
                            {
                                'isbn': 9780393912470,
                            },
                            {
                                'isbn': 9780140447934,
                            }
                        ],
                    }),
                    content_type='application/json')

        # Curation registration 
        response = client.post('/api/curation/',
                               json.dumps({
                                   'title': 'test_title',
                                   'content': 'test_content',
                                   'isbn_content_pairs': [
                                       { 'isbn' : '9780393912470', 'content': 'test_content1'},
                                       { 'isbn' : '9780140447934', 'content': 'test_content2'},
                                       { 'isbn' : '9780131103627', 'content': 'test_content3'},
                                   ],
                               }),
                               content_type='application/json')
 
        

        
    

    
    def test_csrf(self):
        client = Client(enforce_csrf_checks=True)
        response = client.post('/api/user/',
                               json.dumps({
                                   'email': 'jsmith@snu.ac.kr',
                                   'username': 'John',
                                   'password': 'mypassword'
                               }),
                               content_type='application/json')
        self.assertEqual(response.status_code, 403)

        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/api/user/',
                               json.dumps({
                                   'email': 'jsmith@snu.ac.kr',
                                   'username': 'John',
                                   'password': 'mypassword',
                                   'nickname': 'Anonymous',
                               }),
                               content_type='application/json',
                               HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 201)

        response = client.delete('/api/token/',
                                 content_type='application/json',
                                 HTTP_X_CSRFTOKEN=csrftoken)
        self.assertEqual(response.status_code, 405)

    def test_sign_up(self):
        # Initialize
        client = Client()

        # GET
        response = client.get('/api/user/',
                              content_type='application/json')
        self.assertEqual(response.status_code, 405)

        # POST
        response = client.post('/api/user/',
                               json.dumps({
                                   'email': 'jsmith@snu.ac.kr',
                                   'username': 'John',
                                   'password': 'mypassword',
                                   'nickname': 'Anonymous',
                               }),
                               content_type='application/json')
        self.assertEqual(response.status_code, 201)

        # PUT
        response = client.put('/api/user/',
                              json.dumps({
                                  'email': 'jsmith@snu.ac.kr',
                                  'username': 'John',
                                  'password': 'mypassword'
                              }),
                              content_type='application/json',)
        self.assertEqual(response.status_code, 405)

        # DELETE
        response = client.delete('/api/user/',
                                 content_type='application/json',)
        self.assertEqual(response.status_code, 405)

    def test_sign_in(self):
        # Initialize
        client = Client()

        user = User.objects.create_user(
            email='jsmith@snu.ac.kr',
            username='John',
            password='mypassword')

        Profile.objects.create(user=user)

        # GET
        response = client.get('/api/sign_in/',
                              content_type='application/json',)
        self.assertEqual(response.status_code, 405)

        # POST without proper info
        response = client.post('/api/sign_in/',
                              json.dumps({
                                  'username': 'PeaceSong',
                                  'password': 'q1w2e3r4',
                                  'auto_login': False,
                              }),
                              content_type='application/json')
        self.assertEqual(response.status_code, 400)

        # POST with proper info
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'John',
                                   'password': 'mypassword',
                                   'auto_login': False,
                               }),
                               content_type='application/json')
        self.assertIsNotNone(response.content)
        self.assertEqual(response.status_code, 200)

        # Sign out
        client.get('/api/sign_out/',
                   content_type='application/json')

        # POST with auto login
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'John',
                                   'password': 'mypassword',
                                   'auto_login': True,
                               }),
                               content_type='application/json')
        self.assertIsNotNone(response.content)
        self.assertEqual(response.status_code, 200)

        # POST with cookie
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'John',
                                   'password': 'mypassword',
                                   'auto_login': True,
                               }),
                               content_type='application/json')
        self.assertIsNotNone(response.content)
        self.assertEqual(response.status_code, 200)

        # PUT
        response = client.put('/api/sign_in/',
                              json.dumps({
                                  'username': 'John',
                                  'password': 'mypassword',
                                  'auto_login': False,
                              }),
                              content_type='application/json')
        self.assertEqual(response.status_code, 405)


        # DELETE
        response = client.delete('/api/sign_in/',
                                 content_type='application/json')
        self.assertEqual(response.status_code, 405)


    def test_sign_out(self):
        # Initialize
        client = Client()

        user = User.objects.create_user(
            email='jsmith@snu.ac.kr',
            username='John',
            password='mypassword')

        Profile.objects.create(user=user)

        # GET before sign in
        response = client.get('/api/sign_out/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 401)

        # sign in
        client.post('/api/sign_in/',
                    json.dumps({
                        'username': 'John',
                        'password': 'mypassword',
                        'auto_login': False,
                    }),
                    content_type='application/json')

        # GET
        response = client.get('/api/sign_out/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 204)

        # POST
        response = client.post('/api/sign_out/',
                              content_type='application/json')
        
        self.assertEqual(response.status_code, 405)

        # PUT
        response = client.put('/api/sign_out/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 405)


        # DELETE
        response = client.delete('/api/sign_out/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 405)

    def test_profile(self):
        # Initialize
        client = Client()
        # self.pretest(client, '/api/profile/1/')

        user = User.objects.create_user(
            email='jsmith@snu.ac.kr',
            username='John',
            password='mypassword')

        Profile.objects.create(user=user)

        # before sign in
        response = client.put('/api/profile/1/',
                                json.dumps({
                                  'nickname': 'John',
                                  'profile_text': 'mypassword',
                                  'profile_photo': 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
                              }),
                              content_type='application/json')

        self.assertEqual(response.status_code, 401)

        # Sign in
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'John',
                                   'password': 'mypassword',
                                   'auto_login': False,
                               }),
                               content_type='application/json')

        # Like a book
        response = client.post('/api/like/book/9780393912470/',
                               json.dumps({}),
                               content_type='application/json')

        # GET
        response = client.get('/api/profile/1/',
                              content_type='application/json',)
        self.assertEqual(response.status_code, 405)

        # PUT
        response = client.put('/api/profile/1/',
                              json.dumps({
                                  'nickname': 'John',
                                  'profile_text': 'mypassword',
                                  'profile_photo': 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
                              }),
                              content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_search_user(self):
        # Initialize
        client = Client()

        # User creation
        user1 = User.objects.create_user(
            email='jsmith@snu.ac.kr',
            username='John_Smith',
            password='mypassword'
        )

        user2 = User.objects.create_user(
            email='anonymous@snu.ac.kr',
            username='John_Cena',
            password='mypassword'
        )
        
        user3 = User.objects.create_user(
            email='bored_af@snu.ac.kr',
            username='John_Nash',
            password='mypassword'
        )

        Profile.objects.create(user=user1)
        Profile.objects.create(user=user2)
        Profile.objects.create(user=user3)

        # GET before sign in
        response = client.get('/api/user/search/John/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 401)

        # Sign in
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'John_Smith',
                                   'password': 'mypassword',
                                   'auto_login': False,
                               }),
                               content_type='application/json')

        # GET
        response = client.get('/api/user/search/John/',
                              content_type='application/json')

        self.assertIsNotNone(response.content)
        self.assertEqual(response.status_code, 200)

        # Disallowed request
        response = client.post('/api/user/search/John/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 405)

    def test_specific_book(self):
        # Initialize
        client = Client()

        user = User.objects.create_user(
            email='jsmith@snu.ac.kr',
            username='John',
            password='mypassword')

        Profile.objects.create(user=user)

        # GET before sign in
        response = client.get('/api/book/9780140422344/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 401)

        # Sign in
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'John',
                                   'password': 'mypassword',
                                   'auto_login': False,
                               }),
                               content_type='application/json')

        # GET before putting a book into db
        response = client.get('/api/book/9780140422344/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 400)

        # Put a book into db
        response = client.get('/api/book/' + parse.quote('canterbury') + '/1/',
                              content_type='application/json')

        # GET after putting a book into db
        response = client.get('/api/book/9780140422344/',
                              content_type='application/json',)

        self.assertIsNotNone(response.content)
        self.assertEqual(response.status_code, 200)

        # POST
        response = client.post('/api/book/9780140422344/',
                               json.dumps({
                                   'nickname': 'John',
                                   'profile_text': 'mypassword',
                                   'profile_photo': 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
                               }),
                               content_type='application/json')
        self.assertEqual(response.status_code, 405)

        # PUT
        response = client.put('/api/book/9780140422344/',
                              json.dumps({
                                  'nickname': 'John',
                                  'profile_text': 'mypassword',
                                  'profile_photo': 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
                              }),
                              content_type='application/json')
        self.assertEqual(response.status_code, 405)

        # DELETE
        response = client.delete('/api/book/9780140422344/',
                                 content_type='application/json')
        self.assertEqual(response.status_code, 405)

    def test_searchbooks(self):
        # Initialize
        client = Client()

        user = User.objects.create_user(
            email='jsmith@snu.ac.kr',
            username='John',
            password='mypassword')

        Profile.objects.create(user=user)

        # GET before sign in
        response = client.get('/api/book/' + parse.quote('The Norton Anthology') + '/1/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 401)

        # Sign in
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'John',
                                   'password': 'mypassword',
                                   'auto_login': False,
                               }),
                               content_type='application/json')

        # GET
        response = client.get('/api/book/' + parse.quote('The Norton Anthology') + '/1/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 200)


        # POST
        response = client.post('/api/book/' + parse.quote('The Norton Anthology') + '/1/',
                               json.dumps({
                                   'content': 'random bs'
                               }),
                               content_type='application/json')

        self.assertEqual(response.status_code, 405)

        # PUT
        response = client.put('/api/book/' + parse.quote('The Norton Anthology') + '/1/',
                              json.dumps({
                                  'content': 'random bs'
                              }),
                              content_type='application/json')

        self.assertEqual(response.status_code, 405)

        # DELETE
        response = client.delete('/api/book/' + parse.quote('The Norton Anthology') + '/1/',
                                 content_type='application/json')

        self.assertEqual(response.status_code, 405)

    def test_search_article(self):
        # Initialize
        client = Client()

        user = User.objects.create_user(
            email='jsmith@snu.ac.kr',
            username='John',
            password='mypassword')

        Profile.objects.create(user=user)

        # Sign in
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'John',
                                   'password': 'mypassword',
                                   'auto_login': False,
                               }),
                               content_type='application/json')

        # GET before article registration
        response = client.get('/api/article/bookID=9780393912471/',  # changed last digit to 0
                              content_type='application/json')

        self.assertJSONEqual(response.content, [])
        self.assertEqual(response.status_code, 200)

        # GET after article registration
        response = client.get('/api/article/bookID=9780393912470/',
                              content_type='application/json')

        self.assertNotEqual(response.content, b'[]')
        self.assertEqual(response.status_code, 200)

        # POST
        response = client.post('/api/article/bookID=9780393912470/',
                               json.dumps({
                                   'content': 'test_content'
                               }),
                               content_type='application/json')

        self.assertEqual(response.status_code, 405)

        # PUT
        response = client.put('/api/article/bookID=9780393912470/',
                              json.dumps({
                                  'content': 'test_content'
                              }),
                              content_type='application/json')

        self.assertEqual(response.status_code, 405)

        # DELETE
        response = client.delete('/api/article/bookID=9780393912470/',
                                 content_type='application/json')

        self.assertEqual(response.status_code, 405)

    def test_specific_article(self):
        # Initialize
        client = Client()

        user = User.objects.create_user(
            email='jsmith@snu.ac.kr',
            username='John',
            password='mypassword')

        Profile.objects.create(user=user)

        # GET before sign in
        response = client.get('/api/article/1/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 401)

        # Sign in
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'John',
                                   'password': 'mypassword',
                                   'auto_login': False,
                               }),
                               content_type='application/json')

        # GET
        response = client.get('/api/article/1/',
                              content_type='application/json')

        self.assertIsNot(response.content, b'{}')
        self.assertEqual(response.status_code, 200)

        # POST not allowed
        response = client.post('/api/article/1/',
                               json.dumps({
                                   'isbn': '9780393912470',
                                   'title': 'test_title',
                                   'content': 'test_content',
                                   'is_long': True,
                                   'is_short': False,
                                   'is_phrase': False,
                                   'is_spoiler': False,
                               }),
                               content_type='application/json')

        self.assertEqual(response.status_code, 405)

        # POST
        client.post('/api/article/',
                    json.dumps({
                        'isbn': '9780393912470',
                        'title': 'test_title',
                        'content': 'test_content',
                        'is_long': True,
                        'is_short': False,
                        'is_phrase': False,
                        'is_spoiler': False,
                    }),
                    content_type='application/json')

        # PUT with wrong user
        response = client.put('/api/article/1/',
                               json.dumps({
                                   'isbn': '9780393912470',
                                   'title': 'test_title',
                                   'content': 'test_content',
                                   'is_long': True,
                                   'is_short': False,
                                   'is_phrase': False,
                                   'is_spoiler': False,
                               }),
                               content_type='application/json')

        self.assertEqual(response.status_code, 403)

        # PUT with correct user, but raises KeyError
        response = client.put('/api/article/2/',
                               json.dumps({
                                   'key': 'val',
                               }),
                               content_type='application/json')

        self.assertEqual(response.status_code, 400)

        # PUT with correct user
        response = client.put('/api/article/2/',
                               json.dumps({
                                   'isbn': '9780393912470',
                                   'title': 'test_title',
                                   'content': 'test_content',
                                   'is_long': True,
                                   'is_short': False,
                                   'is_phrase': False,
                                   'is_spoiler': False,
                               }),
                               content_type='application/json')

        self.assertEqual(response.status_code, 200)

        # DELETE with wrong user
        response = client.delete('/api/article/1/',
                               content_type='application/json')

        self.assertEqual(response.status_code, 403)

        # DELETE with correct user
        response = client.delete('/api/article/2/',
                               content_type='application/json')

        self.assertEqual(response.status_code, 200)


    def test_article(self):
        # Initialize
        client = Client()

        user = User.objects.create_user(
            email='jsmith@snu.ac.kr',
            username='John',
            password='mypassword')

        Profile.objects.create(user=user)

        # GET before sign in
        response = client.post('/api/article/',
                               json.dumps({
                                   'isbn': '9780393912470',
                                   'title': 'test_title',
                                   'content': 'test_content',
                                   'is_long': True,
                                   'is_short': False,
                                   'is_phrase': False,
                                   'is_spoiler': False,
                               }),
                              content_type='application/json')

        self.assertEqual(response.status_code, 401)

        # Sign in
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'John',
                                   'password': 'mypassword',
                                   'auto_login': False,
                               }),
                               content_type='application/json')

        # GET
        response = client.get('/api/article/',
        content_type='application/json')

        self.assertEqual(response.status_code, 405)

        # POST with wrong key
        response = client.post('/api/article/',
                              json.dumps({
                                   'isbn': '9780393912470',
                                   'title': 'test_title',
                                   'content': 'test_content',
                                   'is_long': True,
                                   'is_short': False,
                                   'is_spoiler': False,
                                   'wrong_key': 'wrong_value'
                              }),
                              content_type='application/json')

        self.assertEqual(response.status_code, 400)

        # POST with wrong isbn
        response = client.post('/api/article/',
                              json.dumps({
                                   'isbn': '0123456789012',
                                   'title': 'test_title',
                                   'content': 'test_content',
                                   'is_long': True,
                                   'is_short': False,
                                   'is_phrase': False,
                                   'is_spoiler': False,
                              }),
                              content_type='application/json')

        self.assertEqual(response.status_code, 404)

        # POST with long
        response = client.post('/api/article/',
                              json.dumps({
                                   'isbn': '9780393912470',
                                   'title': 'test_title',
                                   'content': 'test_content',
                                   'is_long': True,
                                   'is_short': False,
                                   'is_phrase': False,
                                   'is_spoiler': False,
                              }),
                              content_type='application/json')

        self.assertIsNotNone(response.content)
        self.assertEqual(response.status_code, 201)

        # POST with non-long
        response = client.post('/api/article/',
                              json.dumps({
                                   'isbn': '9780393912470',
                                   'title': 'test_title',
                                   'content': 'test_content',
                                   'is_long': False,
                                   'is_short': True,
                                   'is_phrase': False,
                                   'is_spoiler': False,
                              }),
                              content_type='application/json')

        self.assertIsNotNone(response.content)
        self.assertEqual(response.status_code, 201)

        # PUT [NOTE: must reimplement when view implementation complete]
        """response = client.put('/api/article/',
                              json.dumps({
                                'isbn': '9780393912470',
                                'title': 'test_title',
                                'content': 'test_content_amended',
                                'is_long': True,
                                'is_short': False,
                                'is_phrase': False,
                              }),
                            content_type='application/json')

        self.assertEqual(response.status_code, 200)"""

        # DELETE [NOTE: must reimplement when view implementation complete]
        """response = client.delete('/api/article/',
                            content_type='application/json')

        self.assertEqual(response.status_code, 200)"""


    def test_curation(self):
         # Initialize
        client = Client()

        user = User.objects.create_user(
            email='jsmith@snu.ac.kr',
            username='John',
            password='mypassword')

        Profile.objects.create(user=user)

        # POST before sign in
        response = client.post('/api/curation/',
                               json.dumps({
                                   'title': 'test_title',
                                   'content': 'test_content',
                                   'isbn_content_pairs': [
                                       {'isbn': 9780393912470, 'content':'test_content1'},
                                       {'isbn': 9780140447934, 'content':'test_content2'},
                                       {'isbn': 9780131103627, 'content':'test_content3'},
                                   ],
                               }),
                               content_type='application/json')

        self.assertEqual(response.status_code, 401)

        # Sign in
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'John',
                                   'password': 'mypassword',
                                   'auto_login': False,
                               }),
                               content_type='application/json')

        # GET
        response = client.get('/api/curation/',
                               content_type='application/json')

        self.assertEqual(response.status_code, 405)

        # Key error
        response = client.post('/api/curation/',
                               json.dumps({
                                   'nonexistingkey': 'nonexistingvalue',
                               }),
                               content_type='application/json')

        self.assertEqual(response.status_code, 400)

        # Book.DoesNotExist
        response = client.post('/api/curation/',
                               json.dumps({
                                   'title': 'test_title',
                                   'content': 'test_content',
                                   'isbn_content_pairs': [
                                       {'isbn': 4, 'content':'nonexistingindb'},
                                   ],
                               }),
                               content_type='application/json')
        self.assertEqual(response.status_code, 404)

        # POST
        response = client.post('/api/curation/',
                               json.dumps({
                                   'title': 'test_title2',
                                   'content': 'test_content',
                                   'isbn_content_pairs': [
                                       {'isbn': '9780393912470', 'content':'test_content1'},
                                       {'isbn': '9780140447934', 'content':'test_content2'},
                                       {'isbn': '9780131103627', 'content':'test_content3'},
                                       {'isbn': '9780131103628', 'content':'test_content3'},
                                   ],
                               }),
                               content_type='application/json')
        self.assertEqual(response.status_code, 201)

        # PUT with KeyError
        response = client.put('/api/curation/',
                              json.dumps({
                                  'title': 'test_title',
                                  'content': 'test_content',
                                  'isbn_content_pairs': [
                                      {'isbn': '9780393912470', 'content':'test_content1'},
                                      {'isbn': '9780140447934', 'content':'test_content2'},
                                  ],
                              }),
                              content_type='application/json')

        self.assertEqual(response.status_code, 400)

        # PUT with non-existing curation_id
        response = client.put('/api/curation/',
                              json.dumps({
                                  'title': 'test_title',
                                  'content': 'test_content',
                                  'isbn_content_pairs': [
                                      {'isbn': '9780393912470', 'content':'test_content1'},
                                      {'isbn': '9780140447934', 'content':'test_content2'},
                                  ],
                                  'curation_id': 9999,                                  
                              }),
                              content_type='application/json')

        self.assertEqual(response.status_code, 404)

        # PUT
        response = client.put('/api/curation/',
                              json.dumps({
                                  'title': 'test_title_put',
                                  'content': 'test_content',
                                  'isbn_content_pairs': [
                                      {'isbn': '9780140447934', 'content':'test_content2'},
                                      {'isbn': '9780131103628', 'content':'test_content3'},
                                      {'isbn': '9780131103629', 'content':'test_content3'},
                                      {'isbn': '9780131103630', 'content':'test_content3'},
                                  ],
                                  'curation_id': 3,                                  
                              }),
                              content_type='application/json')

        self.assertEqual(response.status_code, 201)
            
        # Disallowed request
        response = client.patch('/api/curation/',
                                content_type='application/json')

        self.assertEqual(response.status_code, 405)


    def test_article_page(self):
        # Initialize
        client = Client()

        user = User.objects.create_user(
            email='jsmith@snu.ac.kr',
            username='John',
            password='mypassword')

        Profile.objects.create(user=user)

        # GET before sign in
        response = client.get('/api/article/page/1/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 401)

        # Sign in
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'John',
                                   'password': 'mypassword',
                                   'auto_login': False,
                               }),
                               content_type='application/json')

        # Multiple Article registration
        for i in (1, 22):
            client.post('/api/article/',
                        json.dumps({
                            'isbn': '9780393912470',
                            'title': 'test_title_' + str(i),
                            'content': 'test_content_' + str(i),
                            'is_long': True,
                            'is_short': False,
                            'is_phrase': False,
                            'is_spoiler': False,
                        }),
                        content_type='application/json')

        # GET
        response = client.get('/api/article/page/1/',
                              content_type='application/json')      

        self.assertIsNotNone(response.content)
        self.assertEqual(response.status_code, 200)

        # POST
        response = client.post('/api/article/page/1/',
                               json.dumps({}),
                               content_type='application/json')

        self.assertEqual(response.status_code, 405)

    def test_libraries(self):
        # Initialize
        client = Client()

        user1 = User.objects.create_user(
            email='jsmith@snu.ac.kr',
            username='John',
            password='mypassword')

        user2 = User.objects.create_user(
            email='kdhong@snu.ac.kr',
            username='Kildong Hong',
            password='mypassword')

        Profile.objects.create(user=user1)
        Profile.objects.create(user=user2)

        # GET before sign in
        response = client.get('/api/libraries/',
                               content_type='application/json')

        self.assertEqual(response.status_code, 401)

        # Sign in
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'John',
                                   'password': 'mypassword',
                                   'auto_login': False,
                               }),
                               content_type='application/json')

        # Library registration
        response = client.post('/api/library/9999/',
                               json.dumps({
                                   'title': 'test_title',
                                   'books': [
                                       {
                                          'isbn': 9780140447934,
                                       },
                                       {
                                          'isbn': 9780131103627,
                                       }
                                   ],
                               }),
                               content_type='application/json')

        # GET
        response = client.get('/api/libraries/',
                              content_type='application/json')

        self.assertIsNotNone(response.content)
        self.assertEqual(response.status_code, 200)

        # Disallowed request
        response = client.post('/api/libraries/',
                               json.dumps({
                                   'whocares': 'notavalidoption'
                               }),
                               content_type='application/json')

        self.assertEqual(response.status_code, 405)

    def test_library(self):
        # Initialize
        client = Client()

        user = User.objects.create_user(
            email='jsmith@snu.ac.kr',
            username='John',
            password='mypassword')

        Profile.objects.create(user=user)

        # POST before sign in
        response = client.post('/api/library/9999/',
                               json.dumps({
                                   'title': 'test_title',
                               }),
                               content_type='application/json')

        self.assertEqual(response.status_code, 401)

        # Sign in
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'John',
                                   'password': 'mypassword',
                                   'auto_login': False,
                               }),
                               content_type='application/json')

        # KeyError
        response = client.post('/api/library/9999/',
                               json.dumps({
                                   'notgoodkey': 'notgoodvalue',
                               }),
                               content_type='application/json')

        self.assertEqual(response.status_code, 400)

        # POST
        response = client.post('/api/library/9999/',
                               json.dumps({
                                   'title': 'test_title',
                                   'books': [],
                               }),
                               content_type='application/json')

        self.assertIsNotNone(response.content)
        self.assertEqual(response.status_code, 201)

        # GET
        response = client.get('/api/library/1/',
                              content_type='application/json')

        self.assertIsNotNone(response.content)
        self.assertEqual(response.status_code, 200)   

        # PUT with KeyError
        response = client.put('/api/library/1/',
                              json.dumps({
                                   'key': 'val',
                              }),
                              content_type='application/json')

        self.assertIsNotNone(response.content)
        self.assertEqual(response.status_code, 400)

        # PUT with invalid library id
        response = client.put('/api/library/9999/',
                              json.dumps({
                                   'title': 'test_title',
                                   'books': [],
                              }),
                              content_type='application/json')

        self.assertIsNotNone(response.content)
        self.assertEqual(response.status_code, 404)

        # PUT
        response = client.put('/api/library/1/',
                              json.dumps({
                                   'title': 'test_title',
                                   'books': [
                                        {
                                            'isbn': 9780140447934,
                                        },
                                        {
                                            'isbn': 9780131103627,
                                        },
                                   ],
                              }),
                              content_type='application/json')

        self.assertIsNotNone(response.content)
        self.assertEqual(response.status_code, 201)

        # DELETE
        response = client.delete('/api/library/1/',
                              content_type='application/json')

        self.assertIsNotNone(response.content)
        self.assertEqual(response.status_code, 200)   

        # Disallowed request
        response = client.patch('/api/library/1/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 405)   

    def test_specific_user(self):
        # Initialize
        client = Client()
        self.pretest(client, '/api/user/1/')

        # Like a book
        response = client.post('/api/like/book/9780393912470/',
                               json.dumps({}),
                               content_type='application/json')

        # Nonexisting user
        response = client.get('/api/user/9999/',
                               content_type='application/json')

        self.assertEqual(response.status_code, 404)

        # GET
        response = client.get('/api/user/John/',
                              content_type='application/json')

        self.assertIsNotNone(response.content)
        self.assertEqual(response.status_code, 200)

        # POST
        response = client.post('/api/user/1/',
                               json.dumps({
                                   'testkey': 'testvalue',
                               }),
                              content_type='application/json')

        self.assertEqual(response.status_code, 405)

        # PUT
        response = client.put('/api/user/1/',
                               json.dumps({
                                   'testkey': 'testvalue',
                               }),
                              content_type='application/json')

        self.assertEqual(response.status_code, 405) 

        # DELETE
        response = client.delete('/api/user/1/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 405)

    def test_comment(self):
        # Initialize
        client = Client()
        self.pretest(client, '/api/comment/article/')

        # GET
        response = client.get('/api/comment/article/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 405)

        # KeyError
        response = client.post('/api/comment/article/',
                               json.dumps({
                                    'notgoodkey': 'notgoodvalue',
                               }),
                               content_type='application/json')

        self.assertEqual(response.status_code, 400)

        # POST as comment
        response = client.post('/api/comment/article/',
                               json.dumps({
                                    'article_id': 1,
                                    'content': 'test_comment',
                                    'parent_id': None
                               }),
                               content_type='application/json')

        self.assertIsNotNone(response.content)
        self.assertEqual(response.status_code, 200)

        # POST as reply
        response = client.post('/api/comment/article/',
                               json.dumps({
                                   'article_id': 1,
                                   'content': 'test_reply',
                                   'parent_id': 1
                               }),
                               content_type='application/json')

        self.assertIsNotNone(response.content)
        self.assertEqual(response.status_code, 200)

    def test_article_comment(self):
        # Initialize
        client = Client()
        self.pretest(client, '/api/comment/article/')

        # POST with wrong key value
        response = client.post('/api/comment/article/',
                               json.dumps({
                                    'wrong_key': 'wrong_value',
                               }),
                               content_type='application/json')

        self.assertEqual(response.status_code, 400)

        # POST
        response = client.post('/api/comment/article/',
                               json.dumps({
                                    'article_id': 1,
                                    'content': 'test_comment',
                                    'parent_id': None
                               }),
                               content_type='application/json')

        self.assertIsNotNone(response.content)
        self.assertEqual(response.status_code, 200)

        # Disallowed request
        response = client.delete('/api/comment/article/',
                                 content_type='application/json')

        self.assertEqual(response.status_code, 405)


    def test_search_article_by_author(self):
        # Initialize
        client = Client()
        self.pretest(client, '/api/article/username=John/1/')

        # Book registration
        client.get('/api/book/' + parse.quote('The Norton Anthology') + '/1/',
                   content_type='application/json')

        client.get('/api/book/' + parse.quote('War and Peace') + '/1/',
                   content_type='application/json')
        
        client.get('/api/book/' + parse.quote('C programming') + '/1/',
                   content_type='application/json')

        # Article registration
        client.post('/api/article/',
                    json.dumps({
                        'isbn': '9780393912470',
                        'title': 'test_title',
                        'content': 'test_content',
                        'is_long': True,
                        'is_short': False,
                        'is_phrase': False,
                        'is_spoiler': False,
                    }),
                    content_type='application/json')

        # GET
        response = client.get('/api/article/username=John/1/',
                              content_type='application/json')

        self.assertIsNotNone(response.content)
        self.assertEqual(response.status_code, 200)

        # POST
        response = client.post('/api/article/username=John/1/',
                               content_type='application/json')

        self.assertEqual(response.status_code, 405)

        # PUT
        response = client.put('/api/article/username=John/1/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 405)

        # DELETE
        response = client.delete('/api/article/username=John/1/',
                                 content_type='application/json')

        self.assertEqual(response.status_code, 405)
    

    def test_specific_comment(self):
        # Initialize
        client = Client()
        self.pretest(client, '/api/comment/article/1/')

        # Another user creation
        user2 = User.objects.create_user(
            email='jbg@snu.ac.kr',
            username='JBG',
            password='mypassword')

        Profile.objects.create(user=user2) 

        # Comment registration
        response = client.post('/api/comment/article/',
                               json.dumps({
                                    'article_id': 1,
                                    'content': 'test_comment',
                                    'parent_id': None
                               }),
                               content_type='application/json')

        # PUT with KeyError
        response = client.put('/api/comment/article/1/',
                               json.dumps({
                                    'key': 'value',
                               }),
                               content_type='application/json')

        self.assertEqual(response.status_code, 400)

        # PUT
        response = client.put('/api/comment/article/1/',
                               json.dumps({
                                    'content': 'test_comment1',
                               }),
                               content_type='application/json')

        self.assertEqual(response.status_code, 200)

        # DELETE
        response = client.delete('/api/comment/article/1/',
                               json.dumps({
                                    'content': 'test_comment1',
                               }),
                               content_type='application/json')

        self.assertEqual(response.status_code, 200)

        # Sign out
        client.get('/api/sign_out/',
                   content_type='application/json')

        # User 2 sign-in
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'JBG',
                                   'password': 'mypassword',
                                   'auto_login': False,
                               }),
                               content_type='application/json')

        # Article comment by user 2
        response = client.post('/api/comment/article/',
                               json.dumps({
                                    'article_id': 1,
                                    'content': 'test_comment',
                                    'parent_id': None
                               }),
                               content_type='application/json')

        # PUT with no permission
        response = client.put('/api/comment/article/1/',
                               json.dumps({
                                    'content': 'test_comment1',
                               }),
                               content_type='application/json')

        self.assertEqual(response.status_code, 403)

        # DELETE with no permission
        response = client.delete('/api/comment/article/1/',
                               json.dumps({
                                    'content': 'test_comment1',
                               }),
                               content_type='application/json')

        self.assertEqual(response.status_code, 403)

        # Disallowed request
        response = client.patch('/api/comment/article/1/',
                                content_type='application/json')

        self.assertEqual(response.status_code, 405)


    def test_specific_curation(self):
        # Initialize
        client = Client()
        self.pretest(client, '/api/curation/1/')

        # GET
        response = client.get('/api/curation/1/',
                              content_type='application/json')

        self.assertIsNot(response.content, b'{}')
        self.assertEqual(response.status_code, 200)

        # DELETE
        response = client.delete('/api/curation/1/',
                                 content_type='application/json')

        self.assertEqual(response.status_code, 200)

        # Disallowed requests 
        response = client.post('/api/curation/1/',
                                 content_type='application/json')
        self.assertEqual(response.status_code, 405)                        


    def test_specific_curation_comment(self):
        # Initialize
        client = Client()
        self.pretest(client, '/api/comment/curation/1/')

        # Another user creation
        user2 = User.objects.create_user(
            email='jbg@snu.ac.kr',
            username='JBG',
            password='mypassword')

        Profile.objects.create(user=user2) 

        # Comment registration
        response = client.post('/api/comment/curation/',
                               json.dumps({
                                    'curation_id': 1,
                                    'content': 'test_comment',
                                    'parent_id': None
                               }),
                               content_type='application/json')

        # PUT with KeyError
        response = client.put('/api/comment/curation/1/',
                               json.dumps({
                                    'key': 'value',
                               }),
                               content_type='application/json')

        self.assertEqual(response.status_code, 400)

        # PUT
        response = client.put('/api/comment/curation/1/',
                               json.dumps({
                                    'content': 'test_comment1',
                               }),
                               content_type='application/json')

        self.assertEqual(response.status_code, 200)

        # DELETE
        response = client.delete('/api/comment/curation/1/',
                               json.dumps({
                                    'content': 'test_comment1',
                               }),
                               content_type='application/json')

        self.assertEqual(response.status_code, 200)

        # Sign out
        client.get('/api/sign_out/',
                   content_type='application/json')

        # User 2 sign-in
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'JBG',
                                   'password': 'mypassword',
                                   'auto_login': False,
                               }),
                               content_type='application/json')

        # Article comment by user 2
        response = client.post('/api/comment/curation/',
                               json.dumps({
                                    'article_id': 1,
                                    'content': 'test_comment',
                                    'parent_id': None
                               }),
                               content_type='application/json')

        # PUT with no permission
        response = client.put('/api/comment/curation/1/',
                               json.dumps({
                                    'content': 'test_comment1',
                               }),
                               content_type='application/json')

        self.assertEqual(response.status_code, 403)

        # DELETE with no permission
        response = client.delete('/api/comment/curation/1/',
                               json.dumps({
                                    'content': 'test_comment1',
                               }),
                               content_type='application/json')

        self.assertEqual(response.status_code, 403)

        # Disallowed request
        response = client.patch('/api/comment/curation/1/',
                                 content_type='application/json')
        self.assertEqual(response.status_code, 405)          


    def test_search_curation(self):
        # Initialize
        client = Client()
        self.pretest(client, '/api/curation/search/test/')

        client.get('/api/book/' + parse.quote('The Norton Anthology') + '/1/',
                   content_type='application/json')

        # GET before curation registration
        response = client.get('/api/curation/search/test/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 200)

        # Curation registration
        response = client.post('/api/curation/',
                               json.dumps({
                                   'title': 'test_title1',
                                   'content': 'test_content1',
                                   'isbn_content_pairs': [
                                       {'isbn': '9780393912470', 'content':'test_content1'},
                                       {'isbn': '9780140447934', 'content':'test_content2'},
                                       {'isbn': '9780131103627', 'content':'test_content3'},
                                   ],
                               }),
                               content_type='application/json')
        
        # GET after curation registration, search success
        response = client.get('/api/curation/search/test1/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 200)

        # GET after curation registration, search success for book
        response = client.get('/api/curation/search/SWPP/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 200)

        # GET after curation registration, search fail
        response = client.get('/api/curation/search/frozen/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 200)

        # Disallowed request
        response = client.post('/api/curation/search/test/',
                               json.dumps({
                                   'whocares': 'itsdisallowed'
                               }),
                               content_type='application/json')

        self.assertEqual(response.status_code, 405)



    def test_search_curation_by_author(self):
        # Initialize
        client = Client()
        self.pretest(client, '/api/curation/username=John/1/')

        # Curation registration
        response = client.post('/api/curation/',
                               json.dumps({
                                   'title': 'test_title',
                                   'content': 'test_content',
                                   'isbn_content_pairs': [
                                       {'isbn': '9780393912470', 'content':'test_content1'},
                                       {'isbn': '9780140447934', 'content':'test_content2'},
                                       {'isbn': '9780131103627', 'content':'test_content3'},
                                   ],
                               }),
                               content_type='application/json')

        # GET
        response = client.get('/api/curation/username=John/1/',
                              content_type='application/json')

        self.assertIsNotNone(response.content)
        self.assertEqual(response.status_code, 200)

        # Disallowed request
        response = client.post('/api/curation/username=John/1/',
                               json.dumps({
                                   'whocares': 'itsdisallowed'
                               }),
                               content_type='application/json')

        self.assertEqual(response.status_code, 405)

    def test_make_curation_dict(self):
        # Initialize
        client = Client()

        user = User.objects.create_user(
            email='jsmith@snu.ac.kr',
            username='John',
            password='mypassword')

        Profile.objects.create(user=user)

        # Sign in
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'John',
                                   'password': 'mypassword',
                                   'auto_login': False,
                               }),
                               content_type='application/json')

        curation = Curation.objects.get(id=1)
        curation_dict = make_curation_dict(curation)

        self.assertIsInstance(curation_dict, dict)

    def test_curation_page(self):
        # Initialize
        client = Client()
        self.pretest(client, '/api/curation/page/1/')

        # Curation registration 
        for i in range(1, 22):
            client.post('/api/curation/',
                        json.dumps({
                            'title': 'test_title1',
                            'content': 'test_content1',
                            'isbn_content_pairs': [
                                { 'isbn' : '9780393912470', 'content': 'test_content1'},
                                { 'isbn' : '9780140447934', 'content': 'test_content2'},
                                { 'isbn' : '9780131103627', 'content': 'test_content3'},
                                { 'isbn' : '9780393912470', 'content': 'test_content4'},
                                { 'isbn' : '9780393912470', 'content': 'test_content5'},
                                { 'isbn' : '9780393912470', 'content': 'test_content6'},
                            ],
                        }),
                        content_type='application/json')
        
        # GET
        response = client.get('/api/curation/page/1/',
                              content_type='application/json')      
        
        self.assertIsNotNone(response.content)
        self.assertEqual(response.status_code, 200)

        # unallowed requests 
        response = client.delete('/api/curation/page/1/',
                                 content_type='application/json')
        self.assertEqual(response.status_code, 405)                        


    def test_follow(self):
        client = Client()
        # self.pretest(client, '/api/follow/user_id=2/')

        # user 1
        user1 = User.objects.create_user(
            email='jsmith@snu.ac.kr',
            username='John',
            password='mypassword')

        Profile.objects.create(user=user1)

        # user 2
        user2 = User.objects.create_user(
            email='asmith@snu.ac.kr',
            username='Adam Smith',
            password='mypassword')

        Profile.objects.create(user=user2)

        # user1 follows user2
        follow = Follow(follower=user1, followee=user2)

        # GET before sign in 
        response = client.get('/api/follow/user_id=2/',
                              content_type='application/json')
        self.assertEqual(response.status_code, 401)

        # Sign in by user 1
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'John',
                                   'password': 'mypassword',
                                   'auto_login': False,
                               }),
                               content_type='application/json')

        # GET 
        response = client.get('/api/follow/user_id=2/',
                              content_type='application/json')

        self.assertIsNot(response.content, b'{}')
        self.assertEqual(response.status_code, 200)

        # POST with non-existing user
        response = client.post('/api/follow/user_id=4321/',
                               content_type='application/json') 
        self.assertEqual(response.status_code, 404)

        # POST
        response = client.post('/api/follow/user_id=2/',
                               content_type='application/json') 
        self.assertEqual(response.status_code, 201)

        # PUT
        response = client.put('/api/follow/user_id=2/', 
                              content_type='application/json')
        self.assertEqual(response.status_code, 405)                                  

        # DELETE with non-existing user
        response = client.delete('/api/follow/user_id=4321/',
                                 content_type='application/json') 
        self.assertEqual(response.status_code, 404)

        # DELETE
        response = client.delete('/api/follow/user_id=2/',
                                 content_type='application/json')
        self.assertEqual(response.status_code, 200)            

    def test_like_books(self):
        # Initialize
        client = Client()
        self.pretest(client, '/api/like_books/')

        # Like a book
        response = client.post('/api/like/book/9780393912470/',
                               json.dumps({}),
                               content_type='application/json')

        # GET
        response = client.get('/api/like_books/',
                              content_type='application/json')
        
        self.assertEqual(response.status_code, 200)

        # Disallowed request
        response = client.post('/api/like_books/',
                               content_type='application/json')

        self.assertEqual(response.status_code, 405)

    def test_article_like(self):
        # Initialize
        client = Client()
        self.pretest(client, '/api/like/article/1/')

        # POST
        response = client.post('/api/like/article/1/',
                    json.dumps({ }),  
                    content_type='application/json')
        self.assertEqual(response.status_code, 201)

        # GET
        response = client.get('/api/like/article/1/',
                               content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertIsNot(response.content, { 'count': 1})

        # DELETE
        response = client.delete('/api/like/article/1/',
                               json.dumps({ }),
                               content_type='application/json')
        self.assertIsNot(response.content, b'{}')
        self.assertEqual(response.status_code, 200)

        # unallowed requests 
        response = client.put('/api/like/article/1/', 
                              json.dumps({ }),  
                              content_type='application/json')
        self.assertEqual(response.status_code, 405)                        
    

    def test_curation_like(self):
        # Initialize
        client = Client()
        self.pretest(client, '/api/like/curation/1/')

        # POST
        response = client.post('/api/like/curation/1/',
                    json.dumps({ }),  
                    content_type='application/json')
        self.assertEqual(response.status_code, 201)

        # GET
        response = client.get('/api/like/curation/1/',
                               content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertIsNot(response.content, { 'count': 1})

        # DELETE
        response = client.delete('/api/like/curation/1/',
                               json.dumps({}),
                               content_type='application/json')
        self.assertIsNot(response.content, b'{}')
        self.assertEqual(response.status_code, 200)

        # unallowed requests 
        response = client.put('/api/like/curation/1/', 
                              json.dumps({ }),  
                              content_type='application/json')
        self.assertEqual(response.status_code, 405)                        
    
    def test_make_article_dict(self):
        # Initialize
        client = Client()

        user = User.objects.create_user(
            email='jsmith@snu.ac.kr',
            username='John',
            password='mypassword')

        Profile.objects.create(user=user)
        
        # Sign in
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'John',
                                   'password': 'mypassword',
                                   'auto_login': False,
                               }),
                               content_type='application/json')
                               
        # Comment registration
        response = client.post('/api/comment/article/',
                               json.dumps({
                                    'article_id': 1,
                                    'content': 'test_comment',
                                    'parent_id': None
                               }),
                               content_type='application/json')

        article = Article.objects.get(id=1)
        
        article_dict = make_article_dict(article)
        
        self.assertIsInstance(article_dict, dict)

    def test_article_like(self):
        # Initialize
        client = Client()
        self.pretest(client, '/api/like/article/1/')

        # POST
        response = client.post('/api/like/article/1/',
                    json.dumps({ }),  
                    content_type='application/json')
        self.assertEqual(response.status_code, 201)

        # GET
        response = client.get('/api/like/article/1/',
                               content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertIsNot(response.content, { 'count': 1})

        # DELETE
        response = client.delete('/api/like/article/1/',
                               json.dumps({}),
                               content_type='application/json')
        self.assertIsNot(response.content, b'{}')
        self.assertEqual(response.status_code, 200)

        # unallowed requests 
        response = client.put('/api/like/article/1/', 
                              json.dumps({ }),  
                              content_type='application/json')
        self.assertEqual(response.status_code, 405)                        

    def mock_run_text_detection(path):
        return "TEST_QUOTE"

    @patch('book.views.run_text_detection_url', side_effect=mock_run_text_detection) 
    def test_ocr(self, arg):
        # Initialize
        client = Client()
        self.pretest(client, '/api/ocr/')

        # POST 
        with open('sapiens.jpg', 'rb') as f:
            # response = client.post('/api/ocr/', json.dumps({ 'image': f}), content_type='multipart/form-data')
            response = client.post('/api/ocr/', { 'image': f})
            self.assertEqual(response.status_code, 200)                        
        
        # POST with wrong request 
        with open('sapiens.jpg', 'rb') as f:
            response = client.post('/api/ocr/', { })
            self.assertEqual(response.status_code, 400)                        
         
        # unallowed requests 
        response = client.get('/api/ocr/', 
                               content_type='application/json')
        self.assertEqual(response.status_code, 405)                        
    
    def test_photo_upload(self):
        # Initialize
        client = Client()
        self.pretest(client, '/api/image/profile/')

        # Like a book
        response = client.post('/api/like/book/9780393912470/',
                               json.dumps({}),
                               content_type='application/json')

        # POST 
        with open('sapiens.jpg', 'rb') as f:
            response = client.post('/api/image/profile/', { 'image': f})
            self.assertEqual(response.status_code, 200)                        
        
        # POST with wrong request 
        with open('sapiens.jpg', 'rb') as f:
            response = client.post('/api/image/profile/', { })
            self.assertEqual(response.status_code, 400)                        
         
        # unallowed requests 
        response = client.get('/api/image/profile/', 
                               content_type='application/json')
        self.assertEqual(response.status_code, 405) 

    def pretest(self, client, url):
        # create user -> request before sign in -> sign in 
        user = User.objects.create_user(
            email='jsmith@snu.ac.kr',
            username='John',
            password='mypassword')

        Profile.objects.create(user=user)

        # request before sign in
        response = client.post(url, content_type='application/json')

        self.assertEqual(response.status_code, 401)

        # Sign in
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'John',
                                   'password': 'mypassword',
                                   'auto_login': False,
                               }),
                               content_type='application/json')


    def test_curation_comment(self):
        # Initialize
        client = Client()
        self.pretest(client, '/api/comment/curation/')

        # GET
        response = client.get('/api/comment/curation/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 405)

        # KeyError
        response = client.post('/api/comment/curation/',
                               json.dumps({
                                    'notgoodkey': 'notgoodvalue',
                               }),
                               content_type='application/json')

        self.assertEqual(response.status_code, 400)

        # POST as comment
        response = client.post('/api/comment/curation/',
                               json.dumps({
                                    'curation_id': 1,
                                    'content': 'test_comment',
                                    'parent_id': None
                               }),
                               content_type='application/json')

        self.assertIsNotNone(response.content)
        self.assertEqual(response.status_code, 200)

        # POST as reply
        response = client.post('/api/comment/curation/',
                               json.dumps({
                                   'curation_id': 1,
                                   'content': 'test_reply',
                                   'parent_id': 1
                               }),
                               content_type='application/json')

        self.assertIsNotNone(response.content)
        self.assertEqual(response.status_code, 200)

        # unallowed requests 
        response = client.get('/api/comment/curation/', 
                               content_type='application/json')
        self.assertEqual(response.status_code, 405)  
    

    # def test_group(self):
    #     client = Client()
    #     self.pretest(client, '/api/group/')

    #     # POST with KeyError
    #     response = client.post('/api/group/',
    #                            json.dumps({
    #                                 'key': 'value',
    #                                 'gaehagisilta': 'real_true',
    #                            }),
    #                            content_type='application/json')

    #     self.assertIsNotNone(response.content)
    #     self.assertEqual(response.status_code, 400)

    #     # POST
    #     response = client.post('/api/group/',
    #                            json.dumps({
    #                                 'name': 'TEST_GROUP',
    #                                 'explanation': 'THIS IS NEW GROUP',
    #                            }),
    #                            content_type='application/json')

    #     self.assertIsNotNone(response.content)
    #     self.assertEqual(response.status_code, 201)

    #     # GET
    #     response = client.get('/api/group/', content_type='application/json')
    #     self.assertEqual(response.status_code, 200)

    #     # unallowed request
    #     response = client.put('/api/group/', content_type='application/json')
    #     self.assertEqual(response.status_code, 405)
    

    # def test_specific_group(self):
    #     client = Client()
    #     self.pretest(client, '/api/group/1/')

    #     # group registration 
    #     response = client.post('/api/group/',
    #                            json.dumps({
    #                                 'name': 'TEST_GROUP',
    #                                 'explanation': 'THIS IS NEW GROUP',
    #                            }),
    #                            content_type='application/json')

    #     # POST
    #     response = client.post('/api/group/1/',
    #                            content_type='application/json')
    #     self.assertEqual(response.status_code, 201)

    #     # Disallowed request
    #     response = client.patch('/api/group/1/',
    #                             content_type='application/json')
    #     self.assertEqual(response.status_code, 405)

        
    def test_book_like(self):
        client = Client()
        self.pretest(client, '/api/like/book/9780393912470/')

        # POST
        response = client.post('/api/like/book/9780393912470/',
                               content_type='application/json')
        self.assertEqual(response.status_code, 201)

        # PUT
        response = client.put('/api/like/book/9780393912470/',
                              content_type='application/json')
        self.assertEqual(response.status_code, 201)

        # Disallowed request
        response = client.delete('/api/like/book/9780393912470/', 
                                content_type='application/json')
        self.assertEqual(response.status_code, 405)


    def test_alarm(self):
        client = Client()
        
        # Initialization
        user1 = User.objects.create_user(
            email='jsmith@snu.ac.kr',
            username='John',
            password='mypassword')

        Profile.objects.create(user=user1)

        # request before sign in
        response = client.post('/api/alarm/', 
                               content_type='application/json')

        self.assertEqual(response.status_code, 401)

        # Sign in
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'John',
                                   'password': 'mypassword',
                                   'auto_login': False,
                               }),
                               content_type='application/json')

        # Another user creation
        user2 = User.objects.create_user(
            email='jbg@snu.ac.kr',
            username='JBG',
            password='mypassword')

        Profile.objects.create(user=user2)    

        # Book registration
        book = Book(isbn='9780736430517', title='test_book', contents='test_contents', url='url', thumbnail='thumbnail', authors='authors', publisher='publishers', published_date='published_date')
        book.save()

        # Article registration
        client.post('/api/article/',
                    json.dumps({
                        'isbn': '9780736430517',
                        'title': 'test_title1',
                        'content': 'test_content1',
                        'is_long': True,
                        'is_short': False,
                        'is_phrase': False,
                        'is_spoiler': False,
                    }),
                    content_type='application/json')

        # Article comment by user 1
        response = client.post('/api/comment/article/',
                               json.dumps({
                                    'article_id': 2,
                                    'content': 'test_comment',
                                    'parent_id': None
                               }),
                               content_type='application/json')

        # Curation registration 
        response = client.post('/api/curation/',
                               json.dumps({
                                   'title': 'test_title1',
                                   'content': 'test_content1',
                                   'isbn_content_pairs': [
                                       { 'isbn' : '9780393912470', 'content': 'test_content1'},
                                       { 'isbn' : '9780140447934', 'content': 'test_content2'},
                                       { 'isbn' : '9780131103627', 'content': 'test_content3'},
                                   ],
                               }),
                               content_type='application/json')

        # Follow by user 1
        response = client.post('/api/follow/user_id=3/',
                               content_type='application/json') 

        # Like a book
        response = client.post('/api/like/book/9780393912470/',
                               json.dumps({}),
                               content_type='application/json')

        # Sign out
        client.get('/api/sign_out/',
                   content_type='application/json')

        # User 2 sign-in
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'JBG',
                                   'password': 'mypassword',
                                   'auto_login': False,
                               }),
                               content_type='application/json')
        
        # Curation comment by user 2
        response = client.post('/api/comment/curation/',
                               json.dumps({
                                    'curation_id': 2,
                                    'content': 'test_comment',
                                    'parent_id': None
                               }),
                               content_type='application/json')
        
        # Article comment by user 2
        response = client.post('/api/comment/article/',
                               json.dumps({
                                    'article_id': 2,
                                    'content': 'test_comment',
                                    'parent_id': None
                               }),
                               content_type='application/json')

        # Article reply by user 2
        response = client.post('/api/comment/article/',
                               json.dumps({
                                    'article_id': 2,
                                    'content': 'test_comment',
                                    'parent_id': 1
                               }),
                               content_type='application/json')

        # Article Like by user 2
        response = client.post('/api/like/article/2/',
                               json.dumps({}),
                               content_type='application/json')

        # Follow by user 2
        response = client.post('/api/follow/user_id=2/',
                               content_type='application/json') 

        # Article by user 2
        client.post('/api/article/',
                    json.dumps({
                        'isbn': '9780393912470',
                        'title': 'test_title1',
                        'content': 'test_content1',
                        'is_long': True,
                        'is_short': False,
                        'is_phrase': False,
                        'is_spoiler': False,
                    }),
                    content_type='application/json')

        # Sign out
        client.get('/api/sign_out/',
                   content_type='application/json')

        # User 1 sign-in
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'John',
                                   'password': 'mypassword',
                                   'auto_login': False,
                               }),
                               content_type='application/json')

        # GET
        response = client.get('/api/alarm/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 200)

        # PUT
        response = client.put('/api/alarm/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 200)

        # Disallowed request
        response = client.patch('/api/alarm/',
                                content_type='application/json')

        self.assertEqual(response.status_code, 405)
        

    def test_speicific_alarm(self):
        client = Client()
        self.pretest(client, '/api/alarm/1/')

        # Another user creation
        user2 = User.objects.create_user(
            email='jbg@snu.ac.kr',
            username='JBG',
            password='mypassword')

        Profile.objects.create(user=user2)    

        # Book registration
        book = Book(isbn='9780736430517', title='test_book', contents='test_contents', url='url', thumbnail='thumbnail', authors='authors', publisher='publishers', published_date='published_date')
        book.save()

        # Article registration
        client.post('/api/article/',
                    json.dumps({
                        'isbn': '9780736430517',
                        'title': 'test_title1',
                        'content': 'test_content1',
                        'is_long': True,
                        'is_short': False,
                        'is_phrase': False,
                        'is_spoiler': False,
                    }),
                    content_type='application/json')

        # Sign out
        client.get('/api/sign_out/',
                   content_type='application/json')

        # User 2 sign-in
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'JBG',
                                   'password': 'mypassword',
                                   'auto_login': False,
                               }),
                               content_type='application/json')

        # Article comment by user 2
        response = client.post('/api/comment/article/',
                               json.dumps({
                                    'article_id': 2,
                                    'content': 'test_comment',
                                    'parent_id': None
                               }),
                               content_type='application/json')

        # PUT
        response = client.put('/api/alarm/1/',
                               content_type='application/json')
        
        self.assertEqual(response.status_code, 200)

        # Disallowed request
        response = client.patch('/api/alarm/1/',
                                content_type='application/json')
                        
        self.assertEqual(response.status_code, 405)

    
    def test_bookmark(self):
        # Initialize
        client = Client()
        self.pretest(client, '/api/like/articles/Fourteen/1/')

        # GET
        response = client.get('/api/like/articles/Fourteen/1/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 200)

        # Disallowed request
        response = client.patch('/api/like/articles/Fourteen/1/',
                                content_type='application/json')

        self.assertEqual(response.status_code, 405)


    def test_curation_bookmark(self):
        # Initialize
        client = Client()
        self.pretest(client, '/api/like/curations/Fourteen/1/')

        # GET
        response = client.get('/api/like/curations/Fourteen/1/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 200)

        # Disallowed request
        response = client.patch('/api/like/curations/Fourteen/1/',
                                content_type='application/json')

        self.assertEqual(response.status_code, 405)
