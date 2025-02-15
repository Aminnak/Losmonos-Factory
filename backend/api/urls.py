from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import CustomUserCreateView


urlpatterns = [
    path('register/' , CustomUserCreateView.as_view()),
]
