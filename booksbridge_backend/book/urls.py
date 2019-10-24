from django.urls import path
from blog import views

urlpatterns = [
    path('user/', views.user, name='signup'),
    path('sign_in/', views.signin, name='signin'),
    path('sign_out/', views.signout, name='signout'),
    path('book/', views.books, name='articles'),
    path('book/?searchWord=<keyword>/', views.searchbooks, name='')
]