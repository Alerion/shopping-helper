from django.contrib.auth.decorators import login_required
from django.template.response import TemplateResponse
from django.db.models import F
from src.main.models import Product, ShoppingList, Dashboard, Category
from django import forms
from django.http import HttpResponseRedirect, HttpResponse, Http404
from django.shortcuts import get_object_or_404
from datetime import date
from datetime import timedelta
import copy

@login_required
def index(request):
    
    all_dashboards = Dashboard.objects.all()
    context = {
    	'all_dashboards': all_dashboards
    }
    return TemplateResponse(request, 'useradmin/index.html', context)