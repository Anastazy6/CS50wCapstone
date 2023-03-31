from django.urls import path
from . import views, auth_views

urlpatterns = [
    # Authentication views
    path(  "login",
            auth_views.login_view,
            name="login"),

    path(  "logout",
            auth_views.logout_view,
            name="logout"  ),

    path(  "register",
            auth_views.register,
            name="register"),



    # No-parameter views
    path(  "",
            views.index,
            name="index"),

    path(  "create-set",
            views.create_set_vanilla_js,
            name="create-set"),

    path(  "create-set-angular",
            views.create_set_angular,
            name="create-set-angular"),



    # Single-parameter views
    path(  "<str:username>/sets",
            views.user_sets,
            name="user-sets"),

    path(  "set/<int:study_set_id>",
            views.study_set_view,
            name="study-set-view"),

    path(  "set/<int:study_set_id>/flashcards",
            views.flashcards_view,
            name="flashcards"),

    path(  "set/<int:study_set_id>/write",
            views.write_view,
            name="write"),

    path(  "set/<int:study_set_id>/learn",
            views.learn_view,
            name="learn"),

    path(  "load/<int:study_set_id>",
            views.load_study_set,
            name="load-study-set")
]