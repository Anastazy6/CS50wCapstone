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
    description = models.CharField(max_length=1023)
    title       = models.CharField(max_length=127)

    defs_lang   = models.CharField(max_length=8)
    terms_lang  = models.CharField(max_length=8)
    terms       = models.JSONField()

    timestamp   = models.DateTimeField(auto_now_add=True)
    
    def terms_count(self):
        return len(self.terms.keys())


# TODO:
#   Zestawy:
#     - id
#     - user
#     - pojęcia
#     - język pojęć
#     - język definicji
#     - kategorie pojęć
#     - oznaczenie pojęcia jako trudnego
#
#
#
#   Nauka:
#     - fiszki
#     - nauka poprzez testy wyboru 1 z 4
#     - nauka poprzez pisanie
#     - cały tryb "pisanie" jak w quizlecie
#     - test
#     - liczenie poprawnych/niepoprawnych odpowiedzi
#     - poprawianie niepoprawnych odpowiedzi po serii testów
#
#   Pojęcia:
#     - Pytanie: Zrobić osobny model dla pojęć (niezależnie od tego, czy będzie to samodzielna tabela,
#         jakiś typ one-to-many field czy coś), czy trzymać pojęcia dla danego zestawu w jednej komórce
#         (np. jako JSON)
#
#
#