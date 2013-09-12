import json
from django.contrib.auth.decorators import login_required
from django.db.models import Sum
from django.http import HttpResponse
from django.template import RequestContext, loader
from src.main.models import Product, Category, ShoppingList


@login_required
def index(request):
    user = request.user
    dashboard  =  request.user.get_dashboard()
    categories  =  Category.objects.all()
    data = []
    data_for_stacked_area=[]
    for obj in categories:              #generate data for piechart
        data.append([ obj.name, get_category_price(obj.pk) ]) 
    price  =  []
    categories_name = []
    for i in categories:                #generate data for barchart
        price.append(get_category_price(i.pk))
        categories_name.append(i.name)
    price_by_month = get_price_by_date()#generate data for time chart
    cat_price=[]
    for h in categories:
        data_for_stacked_area.append({
            'data' : get_month_price_by_category(h.pk),
            'name' : h.name
        })
    template  =  loader.get_template('statistics/index.html')
    context  =  RequestContext(request, {
        'data_for_piechart': json.dumps(data),
        'price' : json.dumps(price),
        'categories_name' : json.dumps(categories_name),
        'price_by_month' : price_by_month,
        'data_for_stacked_area' : json.dumps(data_for_stacked_area)
    })
    return HttpResponse(template.render(context))

'''
@param -- category's id
get_category_price() --return percentage of spended money for each category----
'''
def get_category_price(id):
    price = 0
    products = Product.objects.all()
    for obj in products.filter(category = id).filter(shoppinglist__date__year = 2013):
        price += obj.price
    return int(price)
'''
get_price_by_date() -- function to take data fir time line grafic
'''
def get_price_by_date():
    price_by_month = []
    products = Product.objects.all()
    for month in range(13)[1:]:
        price = 0
        for obj in products.filter(shoppinglist__date__month = month):
            price += obj.price
        price_by_month.append(int(price))
    return price_by_month
'''
get_month_price_by_category(id) -- return summ manthly spended
for each category
'''
def get_month_price_by_category(id):
    products = Product.objects.all()
    price_by_category = []
    for month in range(13)[1:]:
        price = 0
        for obj in products.filter(category = id)\
        .filter(shoppinglist__date__month = month):
            price += obj.price
        price_by_category.append(int(price))
    return  price_by_category