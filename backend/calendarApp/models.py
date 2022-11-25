from django.db import models
from django.contrib.auth.models import User

# Create your models here.
TASK_VALUE = (
    ('Important', 'Important'),
    ('Long Term', 'Long Term'),
    ('Short Term', 'Short Term')
)

class ActivitiesModel(models.Model):
    title = models.CharField(max_length=150)
    date = models.DateField(auto_now=False, auto_now_add=False)
    finished = models.BooleanField(default=False)
    note = models.TextField(blank=True, null=True)
    status = models.CharField(choices=TASK_VALUE, default='Short Term', max_length=20)

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class SubActivitesModel(models.Model):
    title = models.CharField(max_length=150)
    finished = models.BooleanField(default=False)
    note = models.TextField(blank=True, null=True)
    status = models.CharField(choices=TASK_VALUE, default='Short Term', max_length=20)

    activity = models.ForeignKey(ActivitiesModel, related_name='subActivity', on_delete=models.CASCADE)

    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
    