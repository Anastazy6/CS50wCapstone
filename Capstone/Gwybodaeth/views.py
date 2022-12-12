from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
import json
from django.db import IntegrityError
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.urls import reverse
from .models import *
from .util   import *


# Create your views here.
# Sourse for login_view, logout_view and register is CS50w's distribution code.


def login_view(request):
    if request.method == 'POST':
        user = authenticate(request,
                            username=request.POST['username'],
                            password=request.POST['password'])
        
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "gwybodaeth/login.html", {
                'message': "Invalid username or password."
            })
    else:
        return render(request, "gwybodaeth/login.html")

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

def register(request):
    if request.method == "POST":
        username = request.POST['username']
        email    = request.POST['email']

        password     = request.POST['password']
        confirmation = request.POST['confirmation']

        if not password == confirmation:
            return render(request, 'gwybodaeth/register.html', {
                'message': 'Password and confirmation must match!'
            })

        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, 'gwybodaeth/register.html', {
                'message': "Username taken."
            })

        login(request, user)
        return HttpResponseRedirect(reverse('index'))

    else:
        return render(request, "gwybodaeth/register.html")

################################################################################

def index(request):
    return render(request, "gwybodaeth/index.html")




def create_set(request):
    require_method(request, ['GET', 'POST'])

    if request.method == 'POST':
        print("Create study set form sent. Warning: functionality is not yet implemented!")

        data = json.loads(request.body)
        print(data)

        terms = {}
        id = 1
        for key in data:
            print(f"{key}: {data[key]}")

    #    for term in request.POST['term']:
      #      new_term = {}
     #       terms['id']             = id

     #       print(f"ID is {id}, term is {term}")
     #       new_term['term']        = term
      #      new_term['definition']  = request.POST['definition'][id - 1]
     #       new_term['category']    = request.POST['category'][id - 1]

      #      id += 1

        print(terms)
        return JsonResponse({"todo": "todo"}, status=200)
        return HttpResponseRedirect(reverse('create-set'))

    else:
        return render(request, "gwybodaeth/create_set.html", {
            'range': range(1, 6),
            'debug': True
        })