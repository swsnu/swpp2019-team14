from django.db import models
from django.contrib.auth.models import User

class Book(models.Model):
    isbn = models.BigIntegerField(primary_key=True)
    title = models.TextField()
    contents = models.TextField()
    url = models.TextField()
    thumbnail = models.TextField()
    authors = models.TextField()
    publisher = models.TextField()
    def __str__(self):
        return str(self.isbn)

class ShortReview(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    content = models.TextField()
    date = models.DateTimeField(default=datetime.now, blank=True)	


class LongReview(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    content = models.TextField()
    date = models.DateTimeField(default=datetime.now, blank=True)

class Phrase(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    content = models.TextField()
    date = models.DateTimeField(default=datetime.now, blank=True)

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
    book = models.ForeignKey(Book, on_delete=CASCADE)

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
    long_review = models.ForeignKey(LongReivew, on_delete=models.CASCADE)

class PhraseLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    phrase = models.ForeignKey(Phrase, on_delete=models.CASCADE)

class CurationLike(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    curation = models.ForeignKey(Curation, on_delete=models.CASCADE)

class Follow(models.Model):
    follower = models.ForeignKey(User, on_delete=models.CASCADE)
    followee = models.ForeignKey(User, on_delete=models.CASCADE)


