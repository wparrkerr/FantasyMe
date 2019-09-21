from django.contrib import admin

from .models import Account, Goal, Completion

# Register your models here.

admin.site.register(Account)
admin.site.register(Goal)
admin.site.register(Completion)