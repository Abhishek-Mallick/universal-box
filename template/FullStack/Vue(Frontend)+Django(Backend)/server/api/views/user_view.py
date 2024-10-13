from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from ..serializers import UserSerializer
from ..services.user_service import UserService

# Authenticated user profile view
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        return UserService.get_profile(request.user)

# Public API test endpoint
class TestView(APIView):
    def get(self, request):
        return Response({'message': 'API is working!'}, status=status.HTTP_200_OK)