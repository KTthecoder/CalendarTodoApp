from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *
import calendar
from calendar import HTMLCalendar

# Create your views here.
@api_view(['GET'])
def AllRoutes(request):
    context = {
        'JWT' : 'api/token/',
        'JWT-Refresh' : 'api/token/refresh/',
        'Route Name' : 'api/',
        'ActivityAndSubByDate' : 'api/activities/sub/<str:date>',
        'ActivityByDate' : 'api/activities/<str:date>'
    }
    return Response(context, status=status.HTTP_200_OK)


# @permission_classes([IsAuthenticated])
@api_view(['GET'])
def ActivityAndSubByDate(request, date):
    # if request.user.is_authenticated:
    activities = ActivitiesModel.objects.filter(date = date)
    
    if not activities.exists():
        data = {'Response' : 'Activities does not exists'}
        return Response(data, status=status.HTTP_200_OK)
    
    serializer = ActivitiesWithSubSerializer(activities, many = True)
    return Response(serializer.data, status=status.HTTP_200_OK)
    # else:
    #     data = {'Error' : 'User is not authenticated'}
    #     return Response(data, status=status.HTTP_401_UNAUTHORIZED)


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

# @permission_classes([IsAuthenticated])
@api_view(['GET'])
def ActivityAndSubByYearMonth(request, year, month):
    # if request.user.is_authenticated:
    date = f"{year}-{month}"
    activities = ActivitiesModel.objects.filter(date__contains = date)
    
    if not activities.exists():
        data = {'Response' : 'Activities does not exists'}
        return Response(data, status=status.HTTP_200_OK)
    
    serializer = ActivitiesSerializer(activities, many = True)
    return Response(serializer.data, status=status.HTTP_200_OK)
    # else:
    #     data = {'Error' : 'User is not authenticated'}
    #     return Response(data, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def ShowCalendar(request, year, month):
    if year < 3000 and year > 0 and month < 13 and month > 0:
        cal = HTMLCalendar().formatmonth(year, month)
        data = {'Calendar' : cal}
        return Response(data, status=status.HTTP_200_OK)
    else:
        data = {'Response' : "This month or year does not exist"}
        return Response(data, status=status.HTTP_200_OK)


# @permission_classes([IsAuthenticated])
@api_view(['POST'])
def AddActivity(request):
    # if request.user.is_authenticated:
    if request.method == 'POST':
        activitySerializer = ActivitiesSerializer(data = request.data)
        if activitySerializer.is_valid():
            activitySerializer.save()
            data = {'Response' : 'Activity Added Succesfully'}
            return Response(data, status=status.HTTP_201_CREATED)
    else:
        data = {'Error' : 'Method Not Allowed'}
        return Response(data, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    # else:
    #     data = {'Error' : 'User is not authenticated'}
    #     return Response(data, status=status.HTTP_401_UNAUTHORIZED)
    

   


