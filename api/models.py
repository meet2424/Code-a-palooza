from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
# Create your models here.

class UserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifier
    for authentication instead of usernames.
    """
    def create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError('The Email must be set')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a superuser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(email, password, **extra_fields)

def upload_path_handler(instance, filename):
    return "/{name}/{file}".format(
        name=instance.email, file="1."+filename.split(".")[-1]
    )

class User(AbstractUser):
    username = None
    first_name = None
    last_name = None
    email = models.EmailField(unique=True)
    address = models.CharField(max_length=512)
    pan = models.CharField(max_length = 20)
    fingerprint = models.ImageField(upload_to=upload_path_handler, blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS=[]

    objects = UserManager()

    def __str__(self):
        return self.email