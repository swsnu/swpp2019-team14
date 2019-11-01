from django.contrib import admin
from .models import *

# Register your models here.
class BookAdmin(admin.ModelAdmin):
    fields = ['isbn','title','contents']

admin.site.register(Book, BookAdmin)
admin.site.register(Article)