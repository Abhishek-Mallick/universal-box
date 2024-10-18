from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# create users
class UserManager(BaseUserManager):
    def create_user(self, emailid, username, password=None):
        if not emailid:
            raise ValueError('Users must have an email address')
        if not username:
            raise ValueError('Users must have a username')
        emailid = self.normalize_email(emailid)
        user = self.model(emailid=emailid, username=username)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, emailid, username, password=None):
        user = self.create_user(
            emailid=emailid,
            username=username,
            password=password,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

# custom user model with email as the unique id
class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=150, unique=True)
    emailid = models.EmailField(unique=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    objects = UserManager()

    USERNAME_FIELD = 'emailid'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.emailid