from django.urls import path
from rest_framework import routers

from . import views

router = routers.DefaultRouter()


urlpatterns = [
    path('', views.index, name='index'),
    path('home/', views.home, name='home'), # homepage, for once you've logged in
    path('signup/', views.signup, name = 'signup'),
    ## API ##
    path('api/goals/', views.goal_list),
    path('api/goals/<int:pk>', views.goal_detail),
    path('api/goals/<int:pk>/completions', views.goal_completions),
    path('api/accounts/', views.account_list),
    path('api/accounts/<int:pk>', views.account_detail),
    path('api/accounts/<int:pk>/goals', views.account_goals),
    path('api/completions/', views.completion_list),
    path('api/completions/<int:pk>', views.completion_detail),
]