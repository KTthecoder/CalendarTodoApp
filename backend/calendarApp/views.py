from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *

# Create your views here.
@api_view(['GET'])
def AllRoutes(request):
    context = {
        'JWT' : 'api/token/',
        'JWT-Refresh' : 'api/token/refresh/',
        'Route Name' : 'api/',
    }
    return Response(context, status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated])
@api_view(['GET'])
def ActivityAndSubByDate(request, date):
    if request.user.is_authenticated:
        activities = ActivitiesModel.objects.filter(date = date)
        
        if not activities.exists():
            data = {'Response' : 'Activities does not exists'}
            return Response(data, status=status.HTTP_200_OK)
        
        serializer = ActivitiesWithSubSerializer(activities, many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        data = {'Error' : 'User is not authenticated'}
        return Response(data, status=status.HTTP_401_UNAUTHORIZED)


@permission_classes([IsAuthenticated])
@api_view(['GET'])
def ActivityByDate(request, date):
    if request.user.is_authenticated:
        activities = ActivitiesModel.objects.filter(date = date)
        
        if not activities.exists():
            data = {'Response' : 'Activities does not exists'}
            return Response(data, status=status.HTTP_200_OK)
        
        serializer = ActivitiesSerializer(activities, many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        data = {'Error' : 'User is not authenticated'}
        return Response(data, status=status.HTTP_401_UNAUTHORIZED)


