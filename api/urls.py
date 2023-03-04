from django.urls import path
from . import views

urlpatterns = [
    path('detect/',views.fingerprint_login, name = "detect"), 
    path('signup/',views.signup, name = "signup"), 
]