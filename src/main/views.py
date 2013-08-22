from django.contrib.auth.decorators import login_required
from django.template.response import TemplateResponse
from models import Product, ShoppingList, Dashboard, Category
from django import forms
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render_to_response, render
from src.accounts.models import User
from src.main.models import Category

@login_required
def index(request):
    """

    :param request:
    :return:
    """
    list1=Product.objects.all()
    user=request.user # define who is logged in
    f=AddForm(request.POST)
    currUserDashboard = Dashboard.objects.filter(users = user)
    currBuyList = ShoppingList.objects.filter(dashboard = currUserDashboard)
    categories_select = Category.objects.all()
    context = {'listproduct':list1 ,
               'currUserDashboard':currUserDashboard[0],
               'currBuyList': currBuyList,
               'user':user,
               'test': f,
               'categories_select':categories_select, }

    return TemplateResponse(request, 'main/index.html', context)


def contact(request):
    if request.method == 'POST': # If the form has been submitted...
        form = AddForm(request.POST) # A form bound to the POST data
        if form.is_valid(): # All validation rules pass
            Product.name=form.cleaned_data['name']
            Product.category=form.cleaned_data['category']
            Product.dashboard=form.cleaned_data['dashboard']
            Product.last_buy=form.cleaned_data['last_buy']
            Product.price=form.cleaned_data['price']
            Product.buy_period=form.cleaned_data['buy_period']
            return HttpResponseRedirect(request.get_full_path()) # Redirect after POST
    else:
        form = AddForm() # An unbound form

    return render(request, 'contact.html', {
        'form': form,
    })


class AddForm(forms.Form):
    name=forms.CharField(max_length=255)
    category=forms.CharField()
    dashboard=forms.CharField()
    last_buy=forms.DateField()
    price = forms.DecimalField(max_digits=6, decimal_places=2)
    buy_period = forms.IntegerField()
