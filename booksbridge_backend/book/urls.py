from django.urls import path
from book import views

urlpatterns = [
    path('user/', views.signup, name='signup'),
    path('user/profile/', views.profile_update, name='profile_update'),
    path('user/<username>/', views.specific_user, name='specific_user'),
    path('sign_in/', views.signin, name='signin'),
    path('sign_out/', views.signout, name='signout'),
    path('book/<isbn>/', views.specific_book, name='specific_book'),
    path('book/<keyword>/<page>/', views.searchbooks, name='searchbooks'),
    path('article/bookID=<isbn>/', views.search_article, name='searchArticle'),
    path('article/username=<username>/', views.search_article_by_username,
         name='search_article_by_username'),
    path('article/<review_id>/', views.specific_article, name='specific_article'),
    path('comment/article/', views.comment, name='comment'),
    path('token/', views.token, name='token'),
    path('article/', views.article, name='article'),
    path('article/page/<page>/', views.article_page, name='article_page'),
    path('ocr/', views.ocr, name='ocr'),
    path('curation/', views.curation, name='curation'),
    path('curation/<curation_id>/', views.specific_curation, name='specific_curation'),
    path('curation/page/<page>/', views.curation_page, name='curation_page'),
    path('library/', views.library, name='library'),
    path('library/book/', views.book_in_library, name='book_in_library'),
    path('follow/<user_id>', views.follow, name='follow'),
]
