from rest_framework import serializers
from .models import Account, Goal, Completion


#########
# Serializers are basically objects that turn other objects into 
# sendable formats like, in our case, JSON
#
# They are a part of the Django Rest Framework
#########

class GoalSerializer(serializers.ModelSerializer):
	class Meta:
		model = Goal
		fields = ['id', 'account', 'name', 'points_per_complete']

class AccountSerializer(serializers.ModelSerializer):

	password = serializers.CharField(write_only=True)

	def create(self, validated_data):
		print("ni thing: ")
		print(validated_data)
		acc = Account.objects.create(
			username=validated_data['username'],
			email=validated_data['email']
		)
		acc.set_password(validated_data['password'])
		acc.save()

		return acc

	class Meta:
		model = Account
		fields = ['id', 'username', 'first_name', 'last_name', 'email', 'password', 'is_superuser']
		extra_kwargs = {'password': {'write_only': True}}

class CompletionSerializer(serializers.ModelSerializer):
	class Meta:
		model = Completion
		fields = ['id', 'goal', 'date', 'quantity']