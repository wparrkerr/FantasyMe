from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render, redirect

from players.models import Account, Goal, Completion

from django.contrib.auth import login, authenticate
from players.forms import SignUpForm

# REST API
from players.serializers import GoalSerializer, AccountSerializer, CompletionSerializer
from django.http import HttpResponse, JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# Create your views here.

#####################################################
################  API BELOW #########################
#####################################################

##### Goals #####

@api_view(['GET'])
def goal_list(request):
	if request.method == 'GET':
		goals = Goal.objects.all()
		serializer = GoalSerializer(goals, many=True)
		return Response(serializer.data)

@api_view(['GET', 'PUT', 'DELETE'])
def goal_detail(request, pk):
	try:
		goal = Goal.objects.get(pk=pk)
	except Goal.DoesNotExist:
		return Response(status=status.HTTP_404_NOT_FOUND)

	if request.method == 'GET':
		serializer = GoalSerializer(goal)
		return Response(serializer.data)

@api_view(['GET'])
def goal_completions(request, pk):
	try:
		goal_asked = Goal.objects.get(pk=pk)
	except Goal.DoesNotExist:
		return Response(status=status.HTTP_404_NOT_FOUND)

	if request.method == 'GET':
		completions = Completion.objects.filter(goal=goal_asked)
		serializer = CompletionSerializer(completions, many=True)
		return Response(serializer.data)

##### Accounts ######

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated]) # To test authentication
def account_list(request):
	if request.method == 'GET':
		accounts = Account.objects.all()
		serializer = AccountSerializer(accounts, many=True)
		return Response(serializer.data)
	elif request.method == 'POST':
		serializer = AccountSerializer(data = request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def account_signup(request):
	if request.method == 'GET':
		return Response('Signup')
	elif request.method == 'POST':
		serializer = AccountSerializer(data = request.data)
		if serializer.is_valid():
			serializer.save()
			return Response(status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def account_detail(request, pk):
	try:
		account = Account.objects.get(pk=pk)
	except Account.DoesNotExist:
		return Response(status=status.HTTP_404_NOT_FOUND)

	if request.method == 'GET':
		serializer = AccountSerializer(account)
		return Response(serializer.data)

@api_view(['GET'])
def account_goals(request, pk):
	try:
		account_asked = Account.objects.get(pk=pk)
	except Account.DoesNotExist:
		return Response(status=status.HTTP_404_NOT_FOUND)

	if request.method == 'GET':
		goals = Goal.objects.filter(account=account_asked)
		serializer = GoalSerializer(goals, many=True)
		return Response(serializer.data)

##### Completions #####

@api_view(['GET'])
def completion_list(request):
	if request.method == 'GET':
		completions = Completion.objects.all()
		serializer = CompletionSerializer(completions, many=True)
		return Response(serializer.data)

@api_view(['GET'])
def completion_detail(request, pk):
	try:
		completion = Completion.objects.get(pk=pk)
	except Completion.DoesNotExist:
		return Response(status=status.HTTP_404_NOT_FOUND)

	if request.method == 'GET':
		serializer = CompletionSerializer(completion)
		return Response(serializer.data)

##############################################################
# pages -- OLD? --- Well, this is pre bootstrap and 
#					react so it'll probably go away
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
