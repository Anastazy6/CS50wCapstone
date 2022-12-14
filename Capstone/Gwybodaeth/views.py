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


################################################################################

def index(request):
    return render(request, "gwybodaeth/index.html")



def create_set(request):
    # TODO: Expand this feature: 
    #   A) allow the user to expand the form to create study sets with more than 5 items.
    #   This should be done with Java Script. Ideally, the user should be able to add another
    #   form line with the Tab key if they tab from the last form cell.
    #   B) allow the user to edit their study sets. This will require python and possibly JS.
    require_method(request, ['GET', 'POST'])

    if request.method == 'POST':
        require_login(request, "Log in to create study sets!")

        data = json.loads(request.body)
        
        Study_set(
            author      = request.user,
            title       = data['title'],
            description = data['description'],
            terms_lang  = data['terms-lang'],
            defs_lang   = data['defs-lang'],
            terms       = data['terms']
        ).save()

        return JsonResponse(
            {   'study_set': data['title'],
                'action'   : "Create"
            },   status    = 200)

    else:
        return render(request, "gwybodaeth/create_set.html", {
            'range': range(1, 6),
            'debug': True
        })



def user_sets(request, username):
    require_method(request, 'GET')
    
    if not username == request.user.username:
        print("Accessing study sets belonging to another user.\
                This may or may not be allowed (TODO as an optional feature.\
                Type: advanced (to be done AFTER the important parts are done and working))")

    sets = Study_set.objects.filter(author__username=username)

    return render(request, "gwybodaeth/user_sets.html", {
        "sets": sets
    })



def study_set_view(request, study_set_id):
    require_method(request, 'GET')

    study_set = require_study_set(request, study_set_id)

    return render(request, "gwybodaeth/study_set.html", {
        "study_set": study_set,
    #   "subtitle" : None       # Keeping this line for information
    })



def flashcards_view(request, study_set_id):
    require_method(request, 'GET')
    
    study_set = require_study_set(request, study_set_id)

    return render(request, "gwybodaeth/flashcards.html", {
        "study_set": study_set,
        "subtitle" : "flashcards"
    })



def write_view(request, study_set_id):
    require_method    (request, 'GET')
    
    study_set = require_study_set(request, study_set_id)

    return render(request, "gwybodaeth/write.html", {
        "study_set": study_set,
        "subtitle" : "write"
    })



def load_study_terms(request, study_set_id):
    require_method(request, 'GET')

    study_set = get_object_if_exists(Study_set, study_set_id)

    if not study_set:
        return JsonResponse(
            {   "error"  :  "Can't load study set data: Study set " +
                            f"with ID #{study_set_id} doesn't exist.",
            },   status  =  404)
    
    return JsonResponse(
        {   "terms" : study_set.terms
        },   status = 200)
