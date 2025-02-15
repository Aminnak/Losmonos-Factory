from django.contrib.auth.models import AbstractBaseUser, BaseUserManager ,PermissionsMixin
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, email, full_name, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        if not full_name:
            raise ValueError('The Fullname field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, full_name=full_name, **extra_fields)
        if password:
            user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, full_name, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, full_name, password, **extra_fields)

class CustomUser(AbstractBaseUser , PermissionsMixin):
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=150, default='Anonymous')
    telephone_number = models.CharField(max_length=15, blank=True, null=True)  # Optional
    postal_code = models.CharField(max_length=20, blank=True, null=True)  # Optional
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['full_name']

    def __str__(self):
        return str(self.email)
