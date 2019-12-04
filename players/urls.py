from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login', views.login, name='login'),
    path('home', views.home, name='home') # homepage, for once you've logged in

    # JUNK: path('<int:player_id>', views.player_detail, name='player detail'),
]