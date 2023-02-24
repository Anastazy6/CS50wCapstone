from django.http import HttpResponseRedirect
from django.db import IntegrityError
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render
from django.urls import reverse
from .models import User




# Source for login_view, logout_view and register is CS50w's distribution code.

def login_view(request):
    if request.method == 'POST':
        user = authenticate(request,
                            username=request.POST['username'],
                            password=request.POST['password'])
        
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "gwybodaeth/Auth/login.html", {
                'message': "Invalid username or password."
            })
    else:
        return render(request, "gwybodaeth/Auth/login.html")

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
            return render(request, 'gwybodaeth/Auth/register.html', {
                'message': 'Password and confirmation must match!'
            })

        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, 'gwybodaeth/Auth/register.html', {
                'message': "Username taken."
            })

        login(request, user)
        return HttpResponseRedirect(reverse('index'))

    else:
        return render(request, "gwybodaeth/Auth/register.html")