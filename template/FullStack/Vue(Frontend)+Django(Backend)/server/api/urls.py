
from django.urls import path
from .views import SignupView, SigninView, SignoutView, ProfileView, TestView

#  URL patterns for the API views
urlpatterns = [
    # Authentication routes
    path('auth/signup', SignupView.as_view(), name='signup'),
    path('auth/signin', SigninView.as_view(), name='signin'),

    # User routes
    path('user/signout', SignoutView.as_view(), name='signout'),
    path('user/profile', ProfileView.as_view(), name='profile'),
    path('user/test', TestView.as_view(), name='test'),
]