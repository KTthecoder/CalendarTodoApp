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
from accountApp.views import *
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register', RegisterPage, name='RegisterPage'),

    path('api/', AllRoutes, name='AllRoutes'),
    path('api/activities/sub/<str:date>', ActivityAndSubByDate, name='ActivityAndSubByDate'),
    path('api/activities/<str:date>', ActivityByDate, name='ActivityByDate'),
    path('api/calendar/<int:year>/<int:month>', ShowCalendar, name='ShowCalendar'),
    path('api/calendar/year-month/<int:year>/<int:month>', ActivityAndSubByYearMonth, name='ActivityAndSubByYearMonth'),
    path('api/activity/add', AddActivity, name='AddActivity'),
    path('api/sub-activity/add', AddSubActivity, name='AddSubActivity'),
    path('api/home-details-stats', HomePageStats, name='HomePageStats'),
    path('api/complete-task/<int:id>', CompleteTask, name='CompleteTask'),
    path('api/complete-sub-task/<int:id>', CompleteSubTask, name='CompleteSubTask'),
    path('api/activities/sub/search/<str:search>/<str:date>', SearchActivity, name='SearchActivity'),
    path('api/activity/delete/<int:id>', DeleteActivate, name='DeleteActivate'),
    path('api/sub-activity/delete/<int:id>', DeleteSubActivity, name='DeleteSubActivity'),
    path('api/activity/edit/<int:id>', EditActivate, name='EditActivate'),
    path('api/sub-activity/edit/<int:id>', EditSubActivity, name='EditSubActivity'),
]
