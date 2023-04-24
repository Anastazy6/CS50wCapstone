from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
import json
from django.db import IntegrityError
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.urls import reverse
from django.views.decorators.csrf import ensure_csrf_cookie

from .models import *
from .util   import *


# Create your views here.

DEBUG = False
################################################################################

# View for testing and experimentation purposes. REMOVE FOR PRODUCTION etc...
def test_view(request):
    return render(request, "gwybodaeth/Simple/test_page.html")


def index(request):
    require_method(request, ['GET', 'POST'])

    if request.method == 'POST':
        require_staff(request)

        data = json.loads(request.body)

        News(
            author = request.user,
            title  = data['title'],
            body   = data['body']
        ).save()

        return HttpResponseRedirect(reverse('index'))

    else:
        news = News.objects.all().order_by('-timestamp').values()
        
        for news_item in news:
            news_item['author'] = User.objects.get(pk=news_item['author_id'])

        return render(request, "gwybodaeth/Simple/index.html", {
            'news': news
        })
    


def create_set_post(request):
    '''
    Creates a new Study Set from the data sent with Create module's form (POST method).
    This is exactly the same for both Vanilla JS Create and Angular Create.
    '''
    require_login(request, "Log in to create study sets!")
    
    try:    
        data = json.loads(request.body)

        new_set = Study_set(
            author      = request.user,
            title       = data['title'],
            description = data['description'],
            terms_lang  = data['terms-lang'],
            defs_lang   = data['defs-lang'],
            terms       = data['terms']
        )

        new_set.save()
    
        return JsonResponse({
            "message": "Study set created successfully!",
            "set-url":  str(reverse("study-set-view", args=(new_set.id,)))
        },   status  =  200)
    
    except Exception as error:
        return JsonResponse({
            "message": "Something went wrong...",
            "error"  :  str(error)
        },   status  =  418
    )


def create_set_vanilla_js(request):
    # TODO: Expand this feature: 
    #   B) allow the user to edit their study sets. This will require python and possibly JS.
    require_method(request, ['GET', 'POST'])

    if request.method == 'POST':
        create_set_post(request)

    else:
        return render(request, "gwybodaeth/Create/create_set.html", {
            'range': range(0),
            'debug': DEBUG
        })

@ensure_csrf_cookie
def create_set_react(request):
    # TODO: Develop Create view using React
    require_method(request, ['GET', 'POST'])

    if request.method == 'POST':
        create_set_post(request)

    else:
        return render(request, "gwybodaeth/CreateReact/create_set_react.html", {
            'range': range(0),
            'debug': DEBUG
        })
    


def user_sets(request, username):
    require_method(request, 'GET')
    
    if not username == request.user.username:
        print("Accessing study sets belonging to another user.\
                This may or may not be allowed (TODO as an optional feature.\
                Type: advanced (to be done AFTER the important parts are done and working))")

    sets = Study_set.objects.filter(author__username=username)

    return render(request, "gwybodaeth/Simple/user_sets.html", {
        "sets": sets
    })



def study_set_view(request, study_set_id):
    require_method(request, 'GET')

    study_set = require_study_set(request, study_set_id)
    

    return render(request, "gwybodaeth/Simple/study_set.html", {
        "study_set": study_set,
    #   "subtitle" : None       # Keeping this line for information
    })



def flashcards_view(request, study_set_id):
    require_method(request, 'GET')
    
    study_set = require_study_set(request, study_set_id)

    return render(request, "gwybodaeth/Simple/flashcards.html", {
        "study_set": study_set,
        "subtitle" : "flashcards"
    })



def write_view(request, study_set_id):
    require_method(request, 'GET')
    
    study_set = require_study_set(request, study_set_id)

    return render(request, "gwybodaeth/Write/write.html", {
        "study_set": study_set,
        "subtitle" : "write"
    })

#TODO: Consider merging the nearly the same 4 functions into one.
def learn_view(request, study_set_id):
    require_method(request, 'GET')

    study_set = require_study_set(request, study_set_id)

    return render(request, "gwybodaeth/Learn/learn.html", {
        "study_set": study_set,
        "subtitle" : 'learn'
    })


def load_study_set(request, study_set_id):
    require_method(request, 'GET')

    study_set = get_object_if_exists(Study_set, study_set_id)

    if not study_set:
        return JsonResponse(
            {   "error"  :  "Can't load study set data: Study set " +
                            f"with ID #{study_set_id} doesn't exist.",
            },   status  =  404)
    
    return JsonResponse(
        {   "author"     : study_set.author.username,
            "description": study_set.description,
            "title"      : study_set.title,

            "defs_lang"  : study_set.defs_lang,
            "terms_lang" : study_set.terms_lang,
            "terms"      : study_set.terms,

            "timestamp"  : study_set.timestamp
        },   status = 200)
