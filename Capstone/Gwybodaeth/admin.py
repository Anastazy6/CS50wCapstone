from django.contrib import admin
from .models import *


class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'first_name','last_name',\
                    'date_joined', 'last_login', 'is_active',\
                    'is_staff', 'is_superuser')

# Register your models here.

admin.site.register(User, UserAdmin)