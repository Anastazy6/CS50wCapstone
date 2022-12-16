from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist

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