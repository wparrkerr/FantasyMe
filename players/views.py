from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render, redirect

from .models import Account, Goal

from django.contrib.auth import login, authenticate
from players.forms import SignUpForm

# Create your views here.

def index(request):
	template = loader.get_template('players/index.html')
	context = {}
	return HttpResponse(template.render(context, request))


def home(request):
	template = loader.get_template('players/home.html')
	context = {}
	return HttpResponse(template.render(context, request))

def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('home')
    else:
        form = SignUpForm()
    return render(request, 'players/signup.html', {'form': form})

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
