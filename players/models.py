from django.db import models

# Create your models here.

class Player(models.Model):
	name = models.CharField(max_length=40)


class Goal(models.Model):
	player = models.ForeignKey(Player, on_delete=models.CASCADE)
	name = models.CharField(max_length=40)
	due_date = models.DateField()
	completed = models.BooleanField()
	#numeric = BooleanField()
	#goal_amount = models.IntegerField(default=-1)
	#amount_done = models.IntegerField(default=0)