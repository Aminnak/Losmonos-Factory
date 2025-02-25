from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView , TokenObtainPairView
from .views import CustomUserCreateView ,RetrieveUserView , ListUserView , ProductListView

urlpatterns = [
    path('token/refresh/' , TokenRefreshView.as_view()),
    path('register/' , CustomUserCreateView.as_view()),
    path('login/' , TokenObtainPairView.as_view()),
    path('users/' , ListUserView.as_view()),
    path('user/<int:pk>' , RetrieveUserView.as_view()), # just for test
    path('products/' , ProductListView.as_view()),
]
