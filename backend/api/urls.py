from django.urls import path
from .views import CustomUserCreateView ,RetrieveUserView , ListUserView


urlpatterns = [
    path('register/' , CustomUserCreateView.as_view()),
    path('user/<int:pk>' , RetrieveUserView.as_view()),
    path('users/' , ListUserView.as_view()),
]
