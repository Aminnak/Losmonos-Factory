from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenRefreshView , TokenVerifyView
from .views import (
    CustomUserCreateView,
    RetrieveUserView,
    ListUserView,
    ProductListView,
    CustomTokenObtainPairView,
    UpdateUserView
)

urlpatterns = [
    path('token/refresh/' , TokenRefreshView.as_view()),
    path('token/verify/' , TokenVerifyView.as_view()),
    path('register/' , CustomUserCreateView.as_view()),
    path('login/' , CustomTokenObtainPairView.as_view()),
    path('user/<int:pk>/update/' , UpdateUserView.as_view()),
    path('users/' , ListUserView.as_view()),
    path('user/' , RetrieveUserView.as_view()), # just for test
    path('products/' , ProductListView.as_view()),
]



if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
