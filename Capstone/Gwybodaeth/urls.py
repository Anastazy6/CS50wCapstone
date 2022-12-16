from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login",      views.login_view,  name="login"),
    path("logout",     views.logout_view, name="logout"),
    path("register",   views.register,    name="register"),
    path("create-set", views.create_set,  name="create-set"),


    path("<str:username>/sets",  views.user_sets,      name="user-sets"),
    path("<int:study_set_id>",   views.study_set_view, name="study-set-view")
]