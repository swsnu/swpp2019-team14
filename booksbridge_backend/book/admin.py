from django.contrib import admin
from .models import *

# Register your models here.
class BookAdmin(admin.ModelAdmin):
    fields = ['isbn','title','contents']

class ArticleAdmin(admin.ModelAdmin):
    fields = ['contents','is_long','is_short','is_phrase']
admin.site.register(Book, BookAdmin)
admin.site.register(Article, ArticleAdmin)