from rest_framework import serializers
from .models import CustomUser


class CustomeUserSerializer(serializers.ModelSerializer):
    class Meta:
        # model = CustomUser
        # fields = ['full_name' , 'email' , 'password']
        pass
