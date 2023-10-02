from django.urls import path

from .views import *

urlpatterns = [
    path('signup', RegisterView.as_view()),
    path('signin', LoginView.as_view()),
    path('restore', RestorePassView.as_view()),
    path('changePass', ChangePassView.as_view()),
]
