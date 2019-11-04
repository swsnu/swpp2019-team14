from django.test import TestCase, Client
from .models import *
from django.contrib.auth.models import User
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

        # POST
        response = client.post('/api/sign_in/', 
            json.dumps({
                'username': 'John Smith', 
                'password': 'mypassword'
            }), 
            content_type='application/json')
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

