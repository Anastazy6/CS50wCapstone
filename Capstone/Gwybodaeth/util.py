from django.http import JsonResponse
from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist
from .models import *

def require_method(request, method, status=400):
    '''
    Checks if the request's method matches the function's second argument.
    Returns negative JSON response, including the status code (default: 400) if the
    method is wrong. Otherwise does nothing, allowing the code execution to continue.
    Method may be a list of accepted methods. 
    '''
    if (type(method) is list) and (not request.method in method):
        return JsonResponse({"error": f"Request method must be one of the following:\
                            {', '.join(method)}."},
                            status=status)
    
    if not request.method == method:
        return JsonResponse({"error": f"{method} request required"},
                            status=status)



def require_login(request, error_message="Login required!"):
    '''
    Some sort of @login_required that can be attached to a single request method
    if a view allows more than one. Also sends a JsonResponse a user is not logged
    in while trying to access stuff only accessible to authenticated users.
    '''
    if not request.user.is_authenticated:
        return JsonResponse(
            {   "error" : error_message
            },   status = 403)


def require_staff(request, error_mesage="Permission denied!"):
    '''
    Requires the user to be a staff member. Checks, if the user is logged in and
    then checks if they are a staff member (but not neccessarily a superuser).
    '''
    require_login(request)
    
    if not request.user.is_staff:
        return JsonResponse(
            {   "error" : error_mesage
            },   status = 403
        )


def get_object_if_exists(model, id):
    '''
    Returns an instance of model with given id if exists. Else returns False.
    Parametres: 
        model: specifies the database table from which you want to get the object
        id:    primary key of the object
    '''
    try:
        object = model.objects.get(pk=id)
    except ObjectDoesNotExist:
        return False
    return object


def page_not_found(request, type, id):
    return render(request, "gwybodaeth/404_page_not_found.html", {
            "page_type": type,
            "page_id"  : id
        })


def require_study_set(request, study_set_id):
    '''
    Returns a study set if it exists. Otherwise forces rendering a 404 error page
    informing the client that a study set with given id was not found.
    '''
    study_set = get_object_if_exists(Study_set, study_set_id)

    if not study_set:
        return page_not_found(request, "Study set", study_set_id)
    
    return study_set