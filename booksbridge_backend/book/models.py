from django.db import models
from django.contrib.auth.models import User

class Book(models.Model):
    ISBN = models.CharField(max_length = 64)
    content = models.TextField()
    author = models.ForeignKey(
        User,
        on_delete = models.CASCADE,
        default = None
    )
