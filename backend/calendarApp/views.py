from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import *
from .serializers import *
import calendar
from calendar import HTMLCalendar
from datetime import date
from django.db.models import Count
from django.contrib.auth.models import User

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


@permission_classes([IsAuthenticated])
@api_view(['GET'])
def ActivityAndSubByDate(request, date):
    if request.user.is_authenticated:
        activities = ActivitiesModel.objects.filter(date = date, user = request.user)
        
        if not activities.exists():
            data = {'Response' : 'Add tasks to see them in that pannel'}
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
        activities = ActivitiesModel.objects.filter(date = date, user = request.user)
        
        if not activities.exists():
            data = {'Response' : 'Add tasks to see them in that pannel'}
            return Response(data, status=status.HTTP_200_OK)
        
        serializer = ActivitiesSerializer(activities, many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        data = {'Error' : 'User is not authenticated'}
        return Response(data, status=status.HTTP_401_UNAUTHORIZED)


@permission_classes([IsAuthenticated])
@api_view(['GET'])
def ActivityAndSubByYearMonth(request, year, month):
    if request.user.is_authenticated:
        date = f"{year}-{month}"
        activities = ActivitiesModel.objects.filter(date__contains = date, user = request.user)
        
        if not activities.exists():
            data = {'Response' : 'Activities does not exists'}
            return Response(data, status=status.HTTP_200_OK)
        
        serializer = ActivitiesSerializer(activities, many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        data = {'Error' : 'User is not authenticated'}
        return Response(data, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def ShowCalendar(request, year, month):
    if year < 3000 and year > 0 and month < 13 and month > 0:
        cal = HTMLCalendar().formatmonth(year, month)
        data = {'Calendar' : cal}
        return Response(data, status=status.HTTP_200_OK)
    else:
        data = {'Response' : "This month or year does not exist"}
        return Response(data, status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated])
@api_view(['POST'])
def AddActivity(request):
    if request.user.is_authenticated:
        if request.method == 'POST':
            activitySerializer = ActivitiesSerializer(data = request.data)
            if activitySerializer.is_valid():
                activitySerializer.save()
                data = {'Response' : 'Activity Added Succesfully'}
                return Response(data, status=status.HTTP_201_CREATED)
        else:
            data = {'Error' : 'Method Not Allowed'}
            return Response(data, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    else:
        data = {'Error' : 'User is not authenticated'}
        return Response(data, status=status.HTTP_401_UNAUTHORIZED)


@permission_classes([IsAuthenticated])
@api_view(['GET'])
def HomePageStats(request):
    if request.user.is_authenticated:
        today = date.today()
        todayConuter = ActivitiesModel.objects.filter(date = today, user = request.user).count()

        planned = ActivitiesModel.objects.values(
            'date'
        ).annotate(name_count=Count('date')).filter(name_count__gt=0, user = request.user)

        completed = ActivitiesModel.objects.filter(finished = True, user = request.user).count()
         
        return Response({'today' : todayConuter, 'planned' : planned.count(), 'completed' : completed}, status=status.HTTP_200_OK)
    else:
        data = {'Error' : 'User is not authenticated'}
        return Response(data, status=status.HTTP_401_UNAUTHORIZED)


@permission_classes([IsAuthenticated])
@api_view(['POST'])
def CompleteTask(request, id):
    if request.user.is_authenticated:
        if request.method == 'POST':
            try:
                activity = ActivitiesModel.objects.get(id = id, user = request.user)
            except ActivitiesModel.DoesNotExist:
                data = {'Error' : 'Activity Does Not Exists'}
                return Response(data)
            
            activity.finished = True
            activity.save()

            subActivities = SubActivitesModel.objects.filter(activity = activity)
            for item in subActivities:
                item.finished = True
                item.save()

            data = {'Response' : 'Activity Finished Succesfully'}
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            data = {'Error' : 'Method Not Allowed'}
            return Response(data, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    else:
        data = {'Error' : 'User is not authenticated'}
        return Response(data, status=status.HTTP_401_UNAUTHORIZED)


@permission_classes([IsAuthenticated])
@api_view(['POST'])
def CompleteSubTask(request, id):
    if request.user.is_authenticated:
        if request.method == 'POST':
            try:
                activity = SubActivitesModel.objects.get(id = id, user = request.user)
            except SubActivitesModel.DoesNotExist:
                data = {'Error' : 'SubActivity Does Not Exists'}
                return Response(data)
            
            activity.finished = True
            activity.save()
            
            data = {'Response' : 'SubActivity Finished Succesfully'}
            return Response(data, status=status.HTTP_201_CREATED)
        else:
            data = {'Error' : 'Method Not Allowed'}
            return Response(data, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    else:
        data = {'Error' : 'User is not authenticated'}
        return Response(data, status=status.HTTP_401_UNAUTHORIZED)


@permission_classes([IsAuthenticated])
@api_view(['GET'])
def SearchActivity(request, search, date):
    if request.user.is_authenticated:
        activities = ActivitiesModel.objects.filter(title__contains = search, user = request.user, date = date)
        
        if not activities.exists():
            data = {'Response' : 'Activities does not exists'}
            return Response(data, status=status.HTTP_200_OK)
        
        serializer = ActivitiesWithSubSerializer(activities, many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        data = {'Error' : 'User is not authenticated'}
        return Response(data, status=status.HTTP_401_UNAUTHORIZED)
   


