from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import ugettext_lazy as _


class User(AbstractUser):
	def get_dashboard(self):
            return self.dashboard_set.all()[0]
