from django.urls import path
from . import views, auth_views

urlpatterns = [
    # Authentication views
    path("login",      auth_views.login_view,  name="login"     ),
    path("logout",     auth_views.logout_view, name="logout"    ),
    path("register",   auth_views.register,    name="register"  ),

    # No-parameter views
    path("",           views.index,       name="index"),
    path("create-set", views.create_set,  name="create-set"),

    # Single-parameter views
    path("<str:username>/sets",           views.user_sets,            name="user-sets"      ),
    path("<int:study_set_id>",            views.study_set_view,       name="study-set-view" ),
    path("<int:study_set_id>/flashcards", views.flashcards_view,      name="flashcards"     ),
    path("<int:study_set_id>/write",      views.write_view,           name="write"          ),
    path("load/<int:study_set_id>",       views.load_study_terms,     name="load-study-tems")
]