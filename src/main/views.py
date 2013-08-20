from django.contrib.auth.decorators import login_required
from django.template.response import TemplateResponse
from models import Product, ShoppingList, Dashboard
from django import forms
from django.http import HttpResponseRedirect, HttpResponse
from django.shortcuts import render_to_response
from src.accounts.models import User
from src.main.models import Category

@login_required
def index(request):
    list1=Product.objects.all()
    user=request.user # define who is logged in
    f=AddForm(request.POST)
    currUserDashboard = Dashboard.objects.filter(users = user)
    currBuyList = ShoppingList.objects.filter(dashboard = currUserDashboard)
    context = {'listproduct':list1 , 'currUserDashboard':currUserDashboard[0], 'currBuyList': currBuyList,  'user':user, 'test': f,}
    return TemplateResponse(request, 'main/index.html', context)


def contact(request):
    if request.method == 'POST': # If the form has been submitted...
        form = AddForm(request.POST) # A form bound to the POST data
        if form.is_valid(): # All validation rules pass
            prodName = form.cleaned_data['prodName']
            prodCategory = form.cleaned_data['prodCategory']
    else:
        form = AddForm() # An unbound form
    return render_to_response('index.html', {'form': form,})


class AddForm(forms.Form):
    prodName=forms.CharField()
    prodCategory=forms.CharField()
    def test(self):
        return self.prodName