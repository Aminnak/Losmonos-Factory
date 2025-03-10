from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import CustomUser , ProductDetail
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomUserSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(required=True)
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=CustomUser.objects.all(), message="This email is already taken.")]
    )
    class Meta:
        model = CustomUser
        fields = [
            'pk',
            'full_name',
            'email',
            'password',
            'telephone_number',
            'postal_code',
            'is_active',
            'date_joined'
        ]
        extra_kwargs = {
            'date_joined' : {'read_only' : True},
            'is_active': {'read_only': True},
            'password' : {'write_only' : True}
        }

    def create(self , validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user


class ProductDeatailSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(f"/api{obj.image.url}")
        return None
    class Meta:
        model = ProductDetail
        fields = ['id' , 'title' , 'price' , 'image']
        extra_kwargs = {
            'title': {'required': True},
            'price': {'required': True},
            'image': {'required': True,'use_url': True}
        }

# pylint: disable=abstract-method
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        data["user"] = {
            'pk' :self.user.pk,
            'full_name' : self.user.full_name,
            'email' : self.user.email,
            'postal_code' :  self.user.postal_code if self.user.postal_code else None ,
            'telephone_number' : self.user.telephone_number if self.user.postal_code else None ,
            'date_joined' : self.user.date_joined
        }

        return data
