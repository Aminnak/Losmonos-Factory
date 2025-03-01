from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny , IsAuthenticated
from rest_framework.generics import CreateAPIView , RetrieveAPIView , ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from .models import CustomUser , ProductDetail
from .serializers import (
    CustomUserSerializer,
    ProductDeatailSerializer,
    CustomTokenObtainPairSerializer,
)

class CustomUserCreateView(CreateAPIView):
    '''create the new user'''
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    authentication_classes = []
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()


        refresh = RefreshToken.for_user(user)

        return Response({
            'user': serializer.data,
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }, status=status.HTTP_201_CREATED)


class CustomTokenObtainPairView(TokenObtainPairView):
    '''
    responsible for loging the user in
    '''
    serializer_class = CustomTokenObtainPairSerializer


class CustomPagination(PageNumberPagination):
    page_size = 20

class ProductListView(ListAPIView):
    '''
        lists the product instances for frontend
    '''
    queryset = ProductDetail.objects.all()
    serializer_class = ProductDeatailSerializer
    authentication_classes = []
    permission_classes = [AllowAny]
    pagination_class = CustomPagination


class RetrieveUserView(RetrieveAPIView):
    '''
    just for developement purpose
    '''
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]


    def retrieve(self, request, *args, **kwargs):
        user = request.user
        serializer = self.get_serializer(user)
        return Response(serializer.data)


class ListUserView(ListAPIView):
    '''
        just for developement purpose
    '''
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    authentication_classes = []
    permission_classes = [AllowAny]
