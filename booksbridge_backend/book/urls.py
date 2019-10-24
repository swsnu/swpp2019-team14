from django.urls import path
from book import views

urlpatterns = [
    # path('user/', views.user, name='signup'),
    # path('sign_in/', views.signin, name='signin'),
    # path('sign_out/', views.signout, name='signout'),
    # path('book/', views.books, name='book'),
    path('book/<keyword>/<page>/', views.searchbooks, name='searchbooks'),
    path('token/', views.token, name='token'),
]