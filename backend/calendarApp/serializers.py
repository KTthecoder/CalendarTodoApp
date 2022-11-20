from rest_framework import serializers
from .models import *

class SubActivitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubActivitesModel
        fields = '__all__'

class ActivitiesWithSubSerializer(serializers.ModelSerializer):
    subActivity = SubActivitiesSerializer(read_only = True, many = True)

    class Meta:
        model = ActivitiesModel
        fields = ['title', 'date', 'finished', 'note', 'subActivity']

class ActivitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActivitiesModel
        fields = '__all__'