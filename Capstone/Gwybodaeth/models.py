from django.contrib.auth.models import AbstractUser
from django.db import models
from django.forms import CharField

# Create your models here.

class User(AbstractUser):
  
    def __str__(self):
        return f"{self.username}"

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