"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from calendarApp.views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('api/', AllRoutes, name='AllRoutes'),
    path('api/activities/sub/<str:date>', ActivityAndSubByDate, name='ActivityAndSubByDate'),
    path('api/activities/<str:date>', ActivityByDate, name='ActivityByDate'),
    path('api/calendar/<int:year>/<int:month>', ShowCalendar, name='ShowCalendar'),
    path('api/calendar/year-month/<int:year>/<int:month>', ActivityAndSubByYearMonth, name='ActivityAndSubByYearMonth'),
    path('api/activity/add', AddActivity, name='AddActivity'),
]
