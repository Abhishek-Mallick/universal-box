from rest_framework.response import Response

def error_response(message, status_code):
    return Response({'success': False, 'message': message}, status=status_code)