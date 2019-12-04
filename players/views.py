from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.shortcuts import redirect

from .models import Account, Goal

# Create your views here.

def index(request):
	template = loader.get_template('players/index.html')
	context = {}
	return HttpResponse(template.render(context, request))

def login(request):
	template = loader.get_template('players/login.html')
	context = {}
	return HttpResponse(template.render(context, request))

def home(request):
	template = loader.get_template('players/home.html')
	context = {}
	return HttpResponse(template.render(context, request))

def player_detail(request, player_id):

	# try:
	# 	player_obj = Player.objects.get(id=player_id)
	# except Player.DoesNotExist:
	# 	return redirect('/players')
	# try:
	# 	current_goals = Goal.objects.get(player=player_obj)
	# except Goal.DoesNotExist:
	# 	current_goals = []

	# template = loader.get_template('players/index.html')
	# context = {
	# 	'current_goals': current_goals,
	# }
	return "hey" #HttpResponse(template.render(context, request))

