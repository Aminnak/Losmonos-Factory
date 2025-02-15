from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(required=True)
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=CustomUser.objects.all(), message="This email is already taken.")]
    )
    class Meta:
        model = CustomUser
        fields = [
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
