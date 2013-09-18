from django.contrib.auth.decorators import login_required
from django.template.response import TemplateResponse
from models import Product
from django import forms
from django.http import HttpResponseRedirect, HttpResponse, Http404
from django.shortcuts import get_object_or_404
from datetime import date
from datetime import timedelta

@login_required
def index(request):
    user=request.user # define who is logged in
    curr_dashboard = request.user.get_dashboard()
    curr_buylist = curr_dashboard.get_or_create_shopping_list()
    listproduct = Product.objects.filter(dashboard = curr_dashboard) \
        .exclude(pk__in=curr_buylist.products.all())
    suggested = listproduct.filter(last_buy__lte= date.today() - timedelta(days=7))


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

    context = {'listproduct': listproduct,
               'currUserDashboard': curr_dashboard,
               'curr_buylist': curr_buylist,
               'user': user,
               'suggested': suggested,
               'form': form}
    return TemplateResponse(request, 'main/index.html', context)


@login_required
def remove_shopping(request):
    product_id = request.POST.get('product_id')

    if not product_id:
        raise Http404

    curr_dashboard = request.user.get_dashboard()

    product = get_object_or_404(Product, id=product_id, dashboard=curr_dashboard)

    curr_buylist = curr_dashboard.get_or_create_shopping_list()
    curr_buylist.products.remove(product)
    curr_buylist.save()
    return HttpResponse()

@login_required
def adding_from_all_products(request):
    product_id = request.POST.get('product_id')

    if not product_id:
        raise Http404

    curr_dashboard = request.user.get_dashboard()
    product = get_object_or_404(Product, id=product_id, dashboard=curr_dashboard)

    curr_buylist = curr_dashboard.get_or_create_shopping_list()
    curr_buylist.add_product(product)
    return HttpResponse(Product.objects.filter(id__exact = product_id))


@login_required
def buy_all_products(request):
    curr_dashboard = request.user.get_dashboard()
    curr_buylist = curr_dashboard.get_or_create_shopping_list()
    all_products = Product.objects.filter(dashboard=curr_dashboard)
    for m in curr_buylist.products.all():
        if m in all_products:
            product = Product.objects.get(name = m, dashboard = curr_dashboard)
            product.last_buy = date.today()
            product.save()
            curr_buylist.products.remove(m)
    return HttpResponse()



class AddForm(forms.ModelForm):

    class Meta:
        model = Product
        fields = ('name', 'price', 'category',)
