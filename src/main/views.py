from django.contrib.auth.decorators import login_required
from django.template.response import TemplateResponse
from models import Product, ShoppingList, Dashboard, Category
from django import forms
from django.http import HttpResponseRedirect, HttpResponse, Http404
from django.shortcuts import get_object_or_404


@login_required
def index(request):
    user=request.user # define who is logged in
    curr_dashboard = request.user.get_dashboard()
    curr_buylist = curr_dashboard.get_or_create_shopping_list()
    #curr_buylist1 = Product.objects.filter(dashboard = curr_dashboard)
    listproduct = Product.objects.filter(dashboard = curr_dashboard)

    if request.method == 'POST': # If the form has been submitted...
        form = AddForm(request.POST) # A form bound to the POST datas
        if form.is_valid(): # All validation rules pass
            obj = form.save(commit=False)
            obj.dashboard = curr_dashboard
            obj.save()
            curr_buylist.add_product(obj.id)
            return HttpResponseRedirect(request.get_full_path()) # Redirect after POST
    else:
        form = AddForm() # An unbound form

    context = {'listproduct': listproduct,
               'currUserDashboard': curr_dashboard,
               'curr_buylist': curr_buylist,
               'user': user,
               'form': form}
    return TemplateResponse(request, 'main/index.html', context)


@login_required
def remove_shopping(request):
    product_id = request.POST.get('product_id')
    print product_id
    if not product_id:
        raise Http404

    curr_dashboard = request.user.get_dashboard()
    #product = get_object_or_404(product_id) # returns error
    curr_buylist = curr_dashboard.get_or_create_shopping_list()
    curr_buylist.products.remove(product_id)
    curr_buylist.save()
    return HttpResponse()

@login_required
def adding_from_all_products(request):
    product_add_name = request.POST.get("product_add_name")
    print product_add_name
    curr_dashboard = request.user.get_dashboard()
    #what_to_add = Product.objects.filter(dashboard=curr_dashboard, name = product_add_name)
    #print what_to_add
    curr_buylist = curr_dashboard.get_or_create_shopping_list()
    curr_buylist.add_product(product_add_name)
    curr_buylist.save()
    listproduct = Product.objects.filter(dashboard = curr_dashboard)
    return HttpResponse()



class AddForm(forms.ModelForm):

    class Meta:
        model = Product
        fields = ('name', 'price', 'category',)
