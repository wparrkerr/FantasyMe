from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    #path('<int:player_id>', views.player_detail, name='player detail'),
]