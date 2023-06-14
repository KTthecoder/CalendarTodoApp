from .models import *
from .serializers import *
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

# Create your views here.
@api_view(['POST'])
def RegisterPage(request):
    if request.method == "POST":
        account = AccountSerializer(data = request.data)
        if account.is_valid():
            data = {}
            username = account.data["username"]
            password = account.data["password"]
            email = account.data["email"]

            user = User.objects.create_user(username, email, password)
            user.save()
            data = {'Response' : 'User created Succesfully'}
            return Response(data)
        else:
            data = {'Response' : 'Username or email is already taken!'} 
            return Response(data)
    else:
        data = {'Error' : 'Bad Request'}
        return Response(data, status=status.HTTP_400_BAD_REQUEST)