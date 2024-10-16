from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from ..serializers import UserSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from ..services.auth_service import AuthService

# User registration endpoint
class SignupView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': True, 'message': 'Signup successful!'}, status=status.HTTP_201_CREATED)
        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

# User login endpoint
class SigninView(APIView):
    def post(self, request):
        emailid = request.data.get('emailid')
        password = request.data.get('password')
        if not emailid or not password:
            return Response({'error': 'All fields are required'}, status=status.HTTP_400_BAD_REQUEST)
        user = authenticate(emailid=emailid, password=password)
        if user is None:
            return Response({'error': 'Invalid email or password. Please try again.'}, status=status.HTTP_400_BAD_REQUEST)
        return AuthService.generate_auth_response(user)

# User logout endpoint
class SignoutView(APIView):
    def post(self, request):
        return AuthService.signout(request)