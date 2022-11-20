from django.db import models

# Create your models here.

class ActivitiesModel(models.Model):
    title = models.CharField(max_length=150)
    date = models.DateField(auto_now=False, auto_now_add=False)
    finished = models.BooleanField(default=False)
    note = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.title

class SubActivitesModel(models.Model):
    title = models.CharField(max_length=150)
    finished = models.BooleanField(default=False)
    note = models.TextField(blank=True, null=True)

    activity = models.ForeignKey(ActivitiesModel, related_name='subActivity', on_delete=models.CASCADE)

    def __str__(self):
        return self.title
    