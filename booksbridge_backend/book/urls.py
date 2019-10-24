from django.urls import path
from blog import views

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('signin/', views.signin, name='signin'),
    path('signout/', views.signout, name='signout'),
    path('article/', views.articles, name='articles'),
    path('article/<article_id>/', views.article, name='article'),
    path('article/<article_id>/comment/', views.comments, name='comments'),
    path('comment/<comment_id>/', views.comment,name='comment'),
    path('token/', views.token, name='token'),
]