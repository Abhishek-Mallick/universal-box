from rest_framework import status
from rest_framework.response import Response
from ..serializers import UserSerializer

# Service for user-related operations
class UserService:
    @staticmethod
    def get_profile(user):
        serializer = UserSerializer(user)
        return Response({'success': True, 'user': serializer.data}, status=status.HTTP_200_OK)