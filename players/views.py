from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.shortcuts import redirect

from .models import Player, Goal

# Create your views here.

def index(request):
	return HttpResponse("Ayy")

def player_detail(request, player_id):
	try:
		player_obj = Player.objects.get(id=player_id)
	except Player.DoesNotExist:
		return redirect('/players')
	try:
		current_goals = Goal.objects.get(player=player_obj)
	except Goal.DoesNotExist:
		current_goals = []

	template = loader.get_template('players/index.html')
	context = {
		'current_goals': current_goals,
	}
	return HttpResponse(template.render(context, request))

