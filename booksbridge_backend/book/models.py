from django.db import models
from django.contrib.auth.models import User
from datetime import datetime
from imagekit.models import ProcessedImageField
from imagekit.processors import ResizeToFill
from django.conf import settings

def profile_pic_path(instance, filename): 
    return f'resources/image/profile/{instance.user.username}.jpg'


class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    nickname = models.CharField(max_length=32, blank=True)
    profile_text = models.TextField(blank=True)
    profile_photo = ProcessedImageField(
        default = 'https://react.semantic-ui.com/images/avatar/large/matthew.png',
        upload_to = profile_pic_path,
        processors = [ResizeToFill(300, 300)],
        format = 'JPEG',
        options = {'quality':100},
        )

class Book(models.Model):
    isbn = models.BigIntegerField(primary_key=True)
    title = models.TextField()
    contents = models.TextField()
    url = models.TextField()
    thumbnail = models.TextField()
    authors = models.TextField()
    publisher = models.TextField()
    published_date = models.TextField(null=True)

    def __str__(self):
        return str(self.isbn)


class Article(models.Model):
    objects = models.Manager()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='articles')
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='articles')
    title = models.TextField(blank=True)
    content = models.TextField()
    date = models.DateTimeField(default=datetime.now, blank=True)
    is_long = models.BooleanField(default=False)
    is_short = models.BooleanField(default=False)
    is_phrase = models.BooleanField(default=False)

    def __str__(self):
        return str(self.content)

class Comment(models.Model):
    objects = models.Manager()
    article = models.ForeignKey(Article, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    date = models.DateTimeField(auto_now_add=True)
    parent = models.ForeignKey('self', null=True, blank=True, related_name='replies', on_delete=models.CASCADE)
    class Meta:
        ordering = ('date',)
    def __str__(self):
        return str(self.content)

class Curation(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.TextField()
    content = models.TextField()
    date = models.DateTimeField(default=datetime.now, blank=True)


class BookInCuration(models.Model):
    curation = models.ForeignKey(Curation, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    content = models.TextField()


class Library(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.TextField()
    date = models.DateTimeField(default=datetime.now, blank=True)


class BookInLibrary(models.Model):
    library = models.ForeignKey(Library, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)


class LongReivewComment(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    long_review = models.ForeignKey(Article, on_delete=models.CASCADE)
    content = models.TextField()
    date = models.DateTimeField(default=datetime.now, blank=True)


class CurationComment(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    curation = models.ForeignKey(Curation, on_delete=models.CASCADE)
    content = models.TextField()
    date = models.DateTimeField(default=datetime.now, blank=True)


class ArticleLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    article = models.ForeignKey(Article, on_delete=models.CASCADE)


class CurationLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    curation = models.ForeignKey(Curation, on_delete=models.CASCADE)


class Follow(models.Model):
    follower = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="follower")
    followee = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="followee")