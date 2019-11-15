
from django.test import TestCase, Client
from .models import *
from django.contrib.auth.models import User
from urllib import parse
import json

# Create your tests here.


class BookTestCase(TestCase):
    def test_csrf(self):
        client = Client(enforce_csrf_checks=True)
        response = client.post('/api/user/',
                               json.dumps({
                                   'email': 'jsmith@snu.ac.kr',
                                   'username': 'John Smith',
                                   'password': 'mypassword'
                               }),
                               content_type='application/json')
        self.assertEqual(response.status_code, 403)

        response = client.get('/api/token/')
        csrftoken = response.cookies['csrftoken'].value

        response = client.post('/api/user/',
                               json.dumps({
                                   'email': 'jsmith@snu.ac.kr',
                                   'username': 'John Smith',
                                   'password': 'mypassword'
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
                                   'username': 'John Smith',
                                   'password': 'mypassword'
                               }),
                               content_type='application/json')
        self.assertEqual(response.status_code, 201)

        # PUT
        response = client.put('/api/user/',
                              json.dumps({
                                  'email': 'jsmith@snu.ac.kr',
                                  'username': 'John Smith',
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
            username='John Smith',
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
                              }),
                              content_type='application/json')
        self.assertEqual(response.status_code, 400)

        # POST with proper info
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'John Smith',
                                   'password': 'mypassword'
                               }),
                               content_type='application/json')
        self.assertIsNotNone(response.content)
        self.assertEqual(response.status_code, 200)

        # PUT
        response = client.put('/api/sign_in/',
                              json.dumps({
                                  'username': 'John Smith',
                                  'password': 'mypassword'
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
            username='John Smith',
            password='mypassword')

        Profile.objects.create(user=user)

        # GET before sign in
        response = client.get('/api/sign_out/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 401)

        # sign in
        client.post('/api/sign_in/',
                    json.dumps({
                        'username': 'John Smith',
                        'password': 'mypassword'
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


    def test_profile_update(self):
        # Initialize
        client = Client()

        user = User.objects.create_user(
            email='jsmith@snu.ac.kr',
            username='John Smith',
            password='mypassword')

        Profile.objects.create(user=user)

        # GET before sign in
        response = client.get('/api/user/profile/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 401)

        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'John Smith',
                                   'password': 'mypassword'
                               }),
                               content_type='application/json')

        # GET
        response = client.get('/api/user/profile/',
                              content_type='application/json',)
        self.assertEqual(response.status_code, 405)

        # POST
        response = client.post('/api/user/profile/',
                               json.dumps({
                                   'nickname': 'John Smith',
                                   'profile_text': 'mypassword',
                                   'profile_photo': 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
                               }),
                               content_type='application/json')
        self.assertEqual(response.status_code, 405)

        # PUT
        response = client.put('/api/user/profile/',
                              json.dumps({
                                  'nickname': 'John Smith',
                                  'profile_text': 'mypassword',
                                  'profile_photo': 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
                              }),
                              content_type='application/json')
        self.assertEqual(response.status_code, 200)

        # DELETE
        response = client.delete('/api/user/profile/',
                                 content_type='application/json')
        self.assertEqual(response.status_code, 405)

    def test_specific_book(self):
        # Initialize
        client = Client()

        user = User.objects.create_user(
            email='jsmith@snu.ac.kr',
            username='John Smith',
            password='mypassword')

        Profile.objects.create(user=user)

        # GET before sign in
        response = client.get('/api/book/9780140422344/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 401)

        # Sign in
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'John Smith',
                                   'password': 'mypassword'
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
                                   'nickname': 'John Smith',
                                   'profile_text': 'mypassword',
                                   'profile_photo': 'https://react.semantic-ui.com/images/avatar/large/matthew.png'
                               }),
                               content_type='application/json')
        self.assertEqual(response.status_code, 405)

        # PUT
        response = client.put('/api/book/9780140422344/',
                              json.dumps({
                                  'nickname': 'John Smith',
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
            username='John Smith',
            password='mypassword')

        Profile.objects.create(user=user)

        # GET before sign in
        response = client.get('/api/book/' + parse.quote('The Norton Anthology') + '/1/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 401)

        # Sign in
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'John Smith',
                                   'password': 'mypassword'
                               }),
                               content_type='application/json')

        # GET
        response = client.get('/api/book/' + parse.quote('The Norton Anthology') + '/1/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 200)

        """
        # GET on bs query
        response = client.get('/api/book/' + parse.quote('some random bs') + '/1/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 200)"""

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
            username='John Smith',
            password='mypassword')

        Profile.objects.create(user=user)

        # Sign in
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'John Smith',
                                   'password': 'mypassword'
                               }),
                               content_type='application/json')

        # Book registration
        client.get('/api/book/' + parse.quote('The Norton Anthology') + '/1/',
                   content_type='application/json')

        # GET before article registration
        response = client.get('/api/article/bookID=9780393912470/',
                              content_type='application/json')

        self.assertJSONEqual(response.content, [])
        self.assertEqual(response.status_code, 200)

        # Article registration
        client.post('/api/article/',
                    json.dumps({
                        'isbn': '9780393912470',
                        'title': 'test_title',
                        'content': 'test_content',
                        'is_long': True,
                        'is_short': False,
                        'is_phrase': False
                    }),
                    content_type='application/json')

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
            username='John Smith',
            password='mypassword')

        Profile.objects.create(user=user)

        # GET before sign in
        response = client.get('/api/article/1/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 401)

        # Sign in
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'John Smith',
                                   'password': 'mypassword'
                               }),
                               content_type='application/json')

        # Book registration
        client.get('/api/book/' + parse.quote('The Norton Anthology') + '/1/',
                   content_type='application/json')

        # Article registration
        client.post('/api/article/',
                    json.dumps({
                        'isbn': '9780393912470',
                        'title': 'test_title',
                        'content': 'test_content',
                        'is_long': True,
                        'is_short': False,
                        'is_phrase': False
                    }),
                    content_type='application/json')

        # GET
        response = client.get('/api/article/1/',
                              content_type='application/json')

        self.assertIsNot(response.content, b'{}')
        self.assertEqual(response.status_code, 200)

        # POST
        response = client.post('/api/article/1/',
                               json.dumps({
                                   'isbn': '9780393912470',
                                   'title': 'test_title',
                                   'content': 'test_content',
                                   'is_long': True,
                                   'is_short': False,
                                   'is_phrase': False
                               }),
                               content_type='application/json')

        self.assertEqual(response.status_code, 405)

        # PUT
        response = client.put('/api/article/1/',
                               json.dumps({
                                   'isbn': '9780393912470',
                                   'title': 'test_title',
                                   'content': 'test_content',
                                   'is_long': True,
                                   'is_short': False,
                                   'is_phrase': False
                               }),
                               content_type='application/json')

        self.assertEqual(response.status_code, 405)

        # DELETE   
        response = client.delete('/api/article/1/',
                               content_type='application/json')

        self.assertEqual(response.status_code, 405)


    def test_article(self):
        # Initialize
        client = Client()

        user = User.objects.create_user(
            email='jsmith@snu.ac.kr',
            username='John Smith',
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
                                   'is_phrase': False
                               }),
                              content_type='application/json')

        self.assertEqual(response.status_code, 401)

        # Sign in
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'John Smith',
                                   'password': 'mypassword'
                               }),
                               content_type='application/json')

        # Book registration
        client.get('/api/book/' + parse.quote('The Norton Anthology') + '/1/',
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
                              }),
                              content_type='application/json')

        self.assertEqual(response.status_code, 404)

        # POST
        response = client.post('/api/article/',
                              json.dumps({
                                   'isbn': '9780393912470',
                                   'title': 'test_title',
                                   'content': 'test_content',
                                   'is_long': True,
                                   'is_short': False,
                                   'is_phrase': False,
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


    # [NOTE: curation not yet implemented]
    def test_curation(self):
        # Initialize
        client = Client()

        user = User.objects.create_user(
            email='jsmith@snu.ac.kr',
            username='John Smith',
            password='mypassword')

        Profile.objects.create(user=user)

        # POST before sign in
        response = client.post('/api/curation/',
                               json.dumps({
                                   'title': 'test_title',
                                   'content': 'test_content',
                                   'isbn_content_pairs': [
                                       ('9780393912470', 'test_content1'),
                                       ('9780140447934', 'test_content2'),
                                       ('9780131103627', 'test_content3'),
                                   ],
                               }),
                               content_type='application/json')

        self.assertEqual(response.status_code, 401)

        # Sign in
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'John Smith',
                                   'password': 'mypassword'
                               }),
                               content_type='application/json')

        # Book registration
        client.get('/api/book/' + parse.quote('The Norton Anthology') + '/1/',
                   content_type='application/json')

        client.get('/api/book/' + parse.quote('War and Peace') + '/1/',
                   content_type='application/json')
        
        client.get('/api/book/' + parse.quote('C programming') + '/1/',
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
                                       ('9781292101767', 'nonexistingindb'),
                                   ],
                               }),
                               content_type='application/json')

        self.assertEqual(response.status_code, 404)

        # POST
        response = client.post('/api/curation/',
                               json.dumps({
                                   'title': 'test_title',
                                   'content': 'test_content',
                                   'isbn_content_pairs': [
                                       ('9780393912470', 'test_content1'),
                                       ('9780140447934', 'test_content2'),
                                       ('9780131103627', 'test_content3'),
                                   ],
                               }),
                               content_type='application/json')

        self.assertEqual(response.status_code, 201)

    def test_article_page(self):
        # Initialize
        client = Client()

        user = User.objects.create_user(
            email='jsmith@snu.ac.kr',
            username='John Smith',
            password='mypassword')

        Profile.objects.create(user=user)

        # GET before sign in
        response = client.get('/api/article/page/1/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 401)

        # Sign in
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'John Smith',
                                   'password': 'mypassword'
                               }),
                               content_type='application/json')

        # Book registration
        client.get('/api/book/' + parse.quote('The Norton Anthology') + '/1/',
                   content_type='application/json')

        # Article registration
        for i in (1, 22):
            client.post('/api/article/',
                        json.dumps({
                            'isbn': '9780393912470',
                            'title': 'test_title_' + str(i),
                            'content': 'test_content_' + str(i),
                            'is_long': True,
                            'is_short': False,
                            'is_phrase': False
                        }),
                        content_type='application/json')

        # GET
        response = client.get('/api/article/page/1/',
                              content_type='application/json')      

        self.assertIsNotNone(response.content)
        self.assertEqual(response.status_code, 200)

    def test_library(self):
        # Initialize
        client = Client()

        user = User.objects.create_user(
            email='jsmith@snu.ac.kr',
            username='John Smith',
            password='mypassword')

        Profile.objects.create(user=user)

        # POST before sign in
        response = client.post('/api/library/',
                               json.dumps({
                                   'title': 'test_title',
                               }),
                               content_type='application/json')

        self.assertEqual(response.status_code, 401)

        # Sign in
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'John Smith',
                                   'password': 'mypassword'
                               }),
                               content_type='application/json')

        # KeyError
        response = client.post('/api/library/',
                               json.dumps({
                                   'notgoodkey': 'notgoodvalue',
                               }),
                               content_type='application/json')

        self.assertEqual(response.status_code, 400)

        # POST
        response = client.post('/api/library/',
                               json.dumps({
                                   'title': 'test_title',
                               }),
                               content_type='application/json')

        self.assertIsNotNone(response.content)
        self.assertEqual(response.status_code, 201)

        # PATCH
        response = client.patch('/api/library/',
                                content_type='application/json')

        self.assertEqual(response.status_code, 405)
        

    def test_book_in_library(self):
        # Initialize
        client = Client()

        user = User.objects.create_user(
            email='jsmith@snu.ac.kr',
            username='John Smith',
            password='mypassword')

        Profile.objects.create(user=user)

        # POST before sign in
        response = client.post('/api/library/book/',
                               json.dumps({
                                   'title': 'test_title',
                                   'content': 'test_content',
                                   'isbn_content_pairs': [
                                       ('9780393912470', 'test_content1'),
                                       ('9780140447934', 'test_content2'),
                                       ('9780131103627', 'test_content3'),
                                   ],
                               }),
                               content_type='application/json')

        self.assertEqual(response.status_code, 401)

        # Sign in
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'John Smith',
                                   'password': 'mypassword'
                               }),
                               content_type='application/json')

        # Book registration
        client.get('/api/book/' + parse.quote('The Norton Anthology') + '/1/',
                   content_type='application/json')

        # KeyError
        response = client.post('/api/library/book/',
                               json.dumps({
                                   'notgoodkey': 'notgoodvalue',
                               }),
                               content_type='application/json')
        
        # library generation
        response = client.post('/api/library/',
                               json.dumps({
                                   'title': 'test_title',
                               }),
                               content_type='application/json')


        # POST
        response = client.post('/api/library/book/',
                               json.dumps({
                                   'isbn': '9780393912470',
                                   'library': '1',
                               }),
                               content_type='application/json')

        self.assertJSONEqual(response.content, {'id': 1, 'library': 1, 'book': 9780393912470})
        self.assertEqual(response.status_code, 201)

        # PUT
        response = client.put('/api/library/book/',
                              json.dumps({
                                  'isbn': '9780393912470',
                                  'library': '1',
                              }),
                              content_type='application/json')

        self.assertEqual(response.status_code, 405)


    def test_specific_user(self):
        # Initialize
        client = Client()

        user = User.objects.create_user(
            email='jsmith@snu.ac.kr',
            username='John',
            password='mypassword')

        Profile.objects.create(user=user)

        # GET before sign in
        response = client.get('/api/user/1/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 401)

        # Sign in
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'John',
                                   'password': 'mypassword'
                               }),
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

        user = User.objects.create_user(
            email='jsmith@snu.ac.kr',
            username='John Smith',
            password='mypassword')

        Profile.objects.create(user=user)

        # POST before sign in
        response = client.post('/api/comment/article/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 401)

        # Sign in
        response = client.post('/api/sign_in/',
                               json.dumps({
                                   'username': 'John Smith',
                                   'password': 'mypassword'
                               }),
                               content_type='application/json')

        # Book registration
        client.get('/api/book/' + parse.quote('The Norton Anthology') + '/1/',
                   content_type='application/json')

        # Article creation
        client.post('/api/article/',
                    json.dumps({
                        'isbn': '9780393912470',
                        'title': 'test_title',
                        'content': 'test_content',
                        'is_long': True,
                        'is_short': False,
                        'is_phrase': False,
                    }),
                    content_type='application/json')

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
        self.assertEqual(response.status_code, 201)

        # POST as reply
        response = client.post('/api/comment/article/',
                               json.dumps({
                                   'article_id': 1,
                                   'content': 'test_reply',
                                   'parent_id': 1
                               }),
                               content_type='application/json')

        self.assertIsNotNone(response.content)
        self.assertEqual(response.status_code, 201)


    def test_search_article_by_username(self):
        # Initialize
        client = Client()

        user = User.objects.create_user(
            email='jsmith@snu.ac.kr',
            username='John',
            password='mypassword')

        Profile.objects.create(user=user)

        # GET before sign in
        response = client.get('/api/article/username=1/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 401)

        # Sign in
        client.post('/api/sign_in/',
                    json.dumps({
                        'username': 'John',
                        'password': 'mypassword'
                    }),
                    content_type='application/json')

        # Book registration
        client.get('/api/book/' + parse.quote('The Norton Anthology') + '/1/',
                   content_type='application/json')

        # Article creation
        client.post('/api/article/',
                    json.dumps({
                        'isbn': '9780393912470',
                        'title': 'test_title',
                        'content': 'test_content',
                        'is_long': True,
                        'is_short': False,
                        'is_phrase': False,
                    }),
                    content_type='application/json')
        
        client.post('/api/article/',
                    json.dumps({
                        'isbn': '9780393912470',
                        'title': 'test_title2',
                        'content': 'test_content2',
                        'is_long': False,
                        'is_short': True,
                        'is_phrase': False,
                    }),
                    content_type='application/json')

        # GET
        response = client.get('/api/article/username=John/',
                              content_type='application/json')

        self.assertIsNotNone(response.content)
        self.assertEqual(response.status_code, 200)

        # POST
        response = client.post('/api/article/username=John/',
                               content_type='application/json')

        self.assertEqual(response.status_code, 405)

        # PUT
        response = client.put('/api/article/username=John/',
                              content_type='application/json')

        self.assertEqual(response.status_code, 405)

        # DELETE
        response = client.delete('/api/article/username=John/',
                                 content_type='application/json')

        self.assertEqual(response.status_code, 405)











