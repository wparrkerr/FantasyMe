from django.urls import path
from rest_framework import routers

from . import views
from rest_framework_simplejwt import views as jwt_views

router = routers.DefaultRouter()

urlpatterns = [
    path('', views.index, name='index'),
    path('home/', views.home, name='home'), # homepage, for once you've logged in
    path('signup/', views.signup, name = 'signup'),
    ## Auth API ##
    path('api/token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'),  # override sjwt stock token
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    ## API ##
    path('api/goals/', views.goal_list),
    path('api/goals/<int:pk>', views.goal_detail),
    path('api/goals/<int:pk>/completions', views.goal_completions),
    path('api/goals/create', views.goal_create),
    path('api/accounts/signup/', views.account_signup),
    path('api/accounts/', views.account_list),
    path('api/accounts/<int:pk>', views.account_detail),
    path('api/accounts/<int:pk>/goals', views.account_goals),
    path('api/completions/', views.completion_list),
    path('api/completions/<int:pk>', views.completion_detail),
]