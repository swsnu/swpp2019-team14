from django.urls import path
from book import views

urlpatterns = [
    path('user/', views.signup, name='signup'),
    path('user/profile/', views.profile, name='profile'),
    path('user/<username>/', views.specific_user, name='specific_user'),
    path('user/search/<keyword>/', views.search_user, name='search_user'),
    path('profile/<userid>/', views.profile, name='profile'),
    path('sign_in/', views.signin, name='signin'),
    path('sign_out/', views.signout, name='signout'),
    path('book/<isbn>/', views.specific_book, name='specific_book'),
    path('book/<keyword>/<page>/', views.searchbooks, name='searchbooks'),
    path('article/bookID=<isbn>/', views.search_article, name='searchArticle'),
    path('article/username=<username>/<page>/', views.search_article_by_author,
          name='search_article_by_author'),
    path('alarm/',views.alarm, name='alarm'),
    path('alarm/<alarm_id>/',views.specific_alarm, name='specific_alarm'),
    path('article/<review_id>/', views.specific_article, name='specific_article'),
    path('token/', views.token, name='token'),
    path('article/', views.article, name='article'),
    path('article/page/<page>/', views.article_page, name='article_page'),
    path('comment/article/', views.article_comment, name='long_review_comment'),
    path('curation/', views.curation, name='curation'),
    path('curation/<curation_id>/',
         views.specific_curation, name='specific_curation'),
    path('curation/page/<page>/', views.curation_page, name='curation_page'),
    path('curation/username=<username>/<page>/', views.search_curation_by_author,
         name='search_curation_by_author'),
    path('curation/search/<keyword>/', views.search_curation),
    path('library/<library_id>/', views.library, name='library'),
    path('comment/curation/', views.curation_comment, name='curation_comment'),
    # path('library/', views.library, name='library'),
    path('libraries/', views.libraries, name='libraries'),
    path('follow/', views.follow, name='follow'),
    path('follow/user_id=<user_id>/', views.follow, name='follow'),
    path('ocr/', views.ocr, name='ocr'),
    path('image/profile/', views.photo_upload, name='propic_upload'),
    path('like/article/<article_id>/', views.article_like, name='article_like'),
    path('like/book/<isbn>/', views.book_like, name='book_like'),
    path('like/curation/<curation_id>/', views.curation_like, name='curation_like'),
    path('group/', views.group, name='group'),
    path('group/<group_id>/', views.specific_group, name='specific_group'),
    path('like_books/',views.like_books,name='like_books')
    
     

]
