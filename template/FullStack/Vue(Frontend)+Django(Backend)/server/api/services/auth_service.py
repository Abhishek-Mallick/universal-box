from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

# Handles user auth, token generation, and logout
class AuthService:
    @staticmethod
    # Generate auth response with JWT tokens and user data
    def generate_auth_response(user):
        refresh = RefreshToken.for_user(user)
        response = Response({
            'success': True,
            'user': {
                'id': user.id,
                'username': user.username,
                'emailid': user.emailid
            },
            'access': str(refresh.access_token),
            'refresh': str(refresh)
        }, status=status.HTTP_200_OK)
        response.set_cookie('access_token', str(refresh.access_token), httponly=True, samesite='Strict')
        return response

    @staticmethod
    # Handle user logout, clear cookies
    def signout(request):
        try:
            refresh_token = request.data.get('refresh')
            token = RefreshToken(refresh_token)
            token.blacklist()
            response = Response({'success': True, 'message': 'User has been signed out!'}, status=status.HTTP_200_OK)
            response.delete_cookie('access_token')
            return response
        except Exception as e:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)