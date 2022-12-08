from django.contrib import admin
from .models import *


class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'first_name','last_name',\
                    'date_joined', 'last_login', 'is_active',\
                    'is_staff', 'is_superuser')

class Study_setAdmin(admin.ModelAdmin):
    list_display = ('author', 'title', 'description',\
                    'terms_lang', 'defs_lang', 'terms')

# Register your models here.

admin.site.register(User, UserAdmin)
admin.site.register(Study_set, Study_setAdmin)