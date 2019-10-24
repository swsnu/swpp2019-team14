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