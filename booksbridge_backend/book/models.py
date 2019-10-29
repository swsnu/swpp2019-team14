from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

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

class ShortReview(models.Model):
    objects = models.Manager()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    content = models.TextField()
    date = models.DateTimeField(default=datetime.now, blank=True)
    def __str__(self):
        return str(self.content)

class LongReview(models.Model):
    objects = models.Manager()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    title = models.TextField(default='NO TITLE')
    content = models.TextField()
    date = models.DateTimeField(default=datetime.now, blank=True)
    def __str__(self):
        return str(self.title)

class Phrase(models.Model):
    objects = models.Manager()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    content = models.TextField()
    date = models.DateTimeField(default=datetime.now, blank=True)
    def __str__(self):
        return str(self.content)

class Curation(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.TextField()
    date = models.DateTimeField(default=datetime.now, blank=True)

class BookInCuration(models.Model):
    curation = models.ForeignKey(Curation, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    content = models.TextField()

class Library(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(default=datetime.now, blank=True)

class BookInLibrary(models.Model):
    library = models.ForeignKey(Library, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)

class LongReivewComment(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    long_review = models.ForeignKey(LongReview, on_delete=models.CASCADE)
    content = models.TextField()
    date = models.DateTimeField(default=datetime.now, blank=True)

class CurationComment(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    curation = models.ForeignKey(Curation, on_delete=models.CASCADE)
    content = models.TextField()
    date = models.DateTimeField(default=datetime.now, blank=True)

class ShortReviewLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    short_reiew = models.ForeignKey(ShortReview, on_delete=models.CASCADE)
     
class LongReivewLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    long_review = models.ForeignKey(LongReview, on_delete=models.CASCADE)

class PhraseLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    phrase = models.ForeignKey(Phrase, on_delete=models.CASCADE)

class CurationLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    curation = models.ForeignKey(Curation, on_delete=models.CASCADE)

class Follow(models.Model):
    follower = models.ForeignKey(User, on_delete=models.CASCADE, related_name="follower")
    followee = models.ForeignKey(User, on_delete=models.CASCADE, related_name="followee")


