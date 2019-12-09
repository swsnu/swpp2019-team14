from django.contrib import admin
from .models import *
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin

# Register your models here.
class BookAdmin(admin.ModelAdmin):
    fields = ['isbn','title','contents']

class ProfileInline(admin.StackedInline): 
    model = Profile
    con_delete = False                    

class CustomUserAdmin(UserAdmin):
    inlines = (ProfileInline,)

admin.site.register(Book, BookAdmin)
admin.site.register(Article)
admin.site.register(Comment)
admin.site.register(Curation)
admin.site.register(BookInCuration)
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
admin.site.register(Alarm)