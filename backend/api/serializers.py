from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import CustomUser , ProductDetail


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
            'is_active'
        ]
        extra_kwargs = {
            'is_active': {'read_only': True},
            'password' : {'write_only' : True}
        }

    def create(self , validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user


class ProductDeatailSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        request = self.context.get('request')  # Get the request object
        if obj.image:
            return request.build_absolute_uri(f"/api{obj.image.url}")  # Add '/api' before the image URL
        return None
    class Meta:
        model = ProductDetail
        fields = ['id' , 'title' , 'price' , 'image']
        extra_kwargs = {
            'title': {'required': True},
            'price': {'required': True},
            'image': {'required': True,'use_url': True}
        }
