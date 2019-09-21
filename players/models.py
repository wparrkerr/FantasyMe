from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

class Account(AbstractUser):
	pass


class Goal(models.Model):
	account = models.ForeignKey(Account, on_delete=models.CASCADE)
	name = models.CharField(max_length=100)
	points_per_complete = models.IntegerField()
	#goal_amount = models.IntegerField(default=-1)

class Completion(models.Model):
	goal = models.ForeignKey(Goal, on_delete=models.CASCADE)
	date = models.DateField()
	quantity = models.IntegerField()