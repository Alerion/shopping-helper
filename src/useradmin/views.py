from django.contrib.auth.decorators import login_required
from django.template.response import TemplateResponse
from django.db.models import F
from src.main.models import Product, ShoppingList, Dashboard, Category
from src.accounts.models import User
from django import forms
from django.http import HttpResponseRedirect, HttpResponse, Http404
from django.shortcuts import get_object_or_404
from datetime import date
from datetime import timedelta
import copy

@login_required
def index(request):
    user = request.user
    all_dashboards = Dashboard.objects.filter(users = user)
    curr_dashboard = request.user.get_dashboard()
    curr_buylist = curr_dashboard.get_or_create_shopping_list()
    not_curr_username = User.objects.exclude(dashboard = curr_dashboard)
    curr_username = User.objects.filter(dashboard = curr_dashboard)
    # Add Product Form
    if request.method == 'POST': # If the form has been submitted...
        name_add = request.POST.get("name")
        form = AddForm(request.POST) # A form bound to the POST datas
        not_add = 0
        if form.is_valid(): # All validation rules pass
            for n in Product.objects.filter(dashboard = curr_dashboard):
                if n.name == name_add:
                    not_add = 1
            if not_add != 1:
                obj = form.save(commit=False)
                obj.dashboard = curr_dashboard
                obj.save()
                curr_buylist.add_product(obj.id)
                return HttpResponseRedirect(request.get_full_path()) # Redirect after POST
            else:
                forms.ValidationError("You already have this")
                return HttpResponseRedirect(request.get_full_path())

    else:
        form = AddForm() # An unbound form

    context = {
        'all_dashboards': all_dashboards,
        'form': form,
        'not_curr_username': not_curr_username,
        'curr_username': curr_username
    }

    return TemplateResponse(request, 'useradmin/index.html', context)

def test(request):
    all_dashboards = Dashboard.objects.all()
    curr_dashboard = request.user.get_dashboard()
    curr_buylist = curr_dashboard.get_or_create_shopping_list()
    all_products = Product.objects.filter(dashboard = curr_dashboard)
    not_curr_username = User.objects.exclude(dashboard = curr_dashboard)
    curr_username = User.objects.filter(dashboard = curr_dashboard)
    if request.method == 'POST': # If the form has been submitted...
        name_add = request.POST.get("name")
        form = AddForm(request.POST) # A form bound to the POST datas
        not_add = 0
        if form.is_valid(): # All validation rules pass
            for n in Product.objects.filter(dashboard = curr_dashboard):
                if n.name == name_add:
                    not_add = 1
            if not_add != 1:
                obj = form.save(commit=False)
                obj.dashboard = curr_dashboard
                obj.save()
                curr_buylist.add_product(obj.id)
                return HttpResponseRedirect(request.get_full_path()) # Redirect after POST
            else:
                forms.ValidationError("You already have this")
                return HttpResponseRedirect(request.get_full_path())

    else:
        form = AddForm() # An unbound form

    context = {
        'all_dashboards': all_dashboards,
        'all_products': all_products,
        'form': form,
        'curr_buylist': curr_buylist,
        'not_curr_username': not_curr_username,
        'curr_username': curr_username
    }

    return TemplateResponse(request, 'useradmin/test.html', context)

def remove_product(request):
    product_id = request.POST.get('product_id')
    Product.objects.get(id__exact = product_id).delete()

    return HttpResponse()


class AddForm(forms.ModelForm):

    class Meta:
        model = Product
        fields = ('name', 'price', 'category',)
