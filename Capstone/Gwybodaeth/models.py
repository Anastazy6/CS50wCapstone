from django.contrib.auth.models import AbstractUser
from django.db import models
from django.forms import CharField
from datetime import datetime 

# Create your models here.

class User(AbstractUser):

    def __str__(self):
        return f"{self.username}"


class Study_set(models.Model):
    author      = models.ForeignKey(User, on_delete=models.CASCADE, related_name="study_sets")
    description = models.CharField (max_length=1023)
    title       = models.CharField (max_length=127)

    defs_lang   = models.CharField (max_length=8)
    terms_lang  = models.CharField (max_length=8)
    terms       = models.JSONField ()

    timestamp   = models.DateTimeField(auto_now_add=True)
    
    def terms_count(self):
        return len(self.terms.keys())
    



class News(models.Model):
    author      = models.ForeignKey(User, on_delete=models.CASCADE, related_name="news")

    title       = models.CharField (max_length=127)
    body        = models.CharField (max_length=2047)

    timestamp   = models.DateTimeField(auto_now_add=True)


# TODO:
#   Zestawy:
#     - oznaczenie pojęcia jako trudnego
#
#   Nauka:
#     - test
#     - poprawianie niepoprawnych odpowiedzi po serii testów
