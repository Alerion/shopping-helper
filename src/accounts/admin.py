from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib import admin

from .models import User


class UserAdmin(admin.ModelAdmin):
	pass


admin.site.register(User, UserAdmin)
