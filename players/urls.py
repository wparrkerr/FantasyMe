from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('home/', views.home, name='home'), # homepage, for once you've logged in
    path('signup/', views.signup, name = 'signup'),
]