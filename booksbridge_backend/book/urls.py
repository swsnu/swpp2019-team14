from django.urls import path
from book import views

urlpatterns = [
    path('user/', views.signup, name='signup'),
    path('sign_in/', views.signin, name='signin'),
    # path('sign_out/', views.signout, name='signout'),
    # path('book/', views.books, name='book'),
    path('book/<isbn>/', views.specific_book, name='specific_book'),
    path('book/<keyword>/<page>/', views.searchbooks, name='searchbooks'),
    path('review_phrase/bookID=<isbn>/', views.searchPhrases, name='searchphrases'),
    path('review_long/bookID=<isbn>/', views.searchLongReviews, name='searchlongreviews'),
    # path('review_short/?bookID=<isbn>/', views.searchShortReviews, name='searchshortreviews'),
    path('review_short/bookID=<isbn>/', views.searchShortReviews, name='searchshortreviews'),
    path('token/', views.token, name='token'),
    path('review_short/', views.short_review, name='create_short_review'),
]