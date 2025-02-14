from rest_framework.generics import CreateAPIView
from .models import CustomUser
from .serializers import CustomUserSerializer

class CustomUserCreateView(CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
