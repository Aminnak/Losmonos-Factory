from django.urls import path
from .views import CustomUserCreateView ,RetrieveUserView , ListUserView
from rest_framework_simplejwt.views import TokenRefreshView , TokenObtainPairView

urlpatterns = [
    path('register/' , CustomUserCreateView.as_view()),
    path('login/' , TokenObtainPairView.as_view()),
    path('user/<int:pk>' , RetrieveUserView.as_view()),
    # path('users/' , ListUserView.as_view()),
    path('token/refresh/' , TokenRefreshView.as_view()),
]
