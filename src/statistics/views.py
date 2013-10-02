import json
import datetime
from django.contrib.auth.decorators import login_required
from django.db.models import Sum
from django.http import HttpResponse
from django.template.response import TemplateResponse
from django.template import RequestContext, loader
from src.main.models import Product, Category, ShoppingList


@login_required
def index(request):
    return TemplateResponse(request, 'statistics/index.html')

@login_required
def back_page(request):
    user = request.user
    dashboard  =  request.user.get_dashboard()
    categories  =  Category.objects.all()
    data = [['category name', 'category price']]
    for obj in categories:                           #generate data for piechart
        data.append([ obj.name, get_category_price(obj.pk) ]) 
    data_for_bar_chart = [['category name', 'price']]
    for i in categories: 
        data_for_bar_chart.append([i.name, get_category_price(i.pk)])   #generate data for barchart
    price_by_month = get_price_last_month()            #generate data for time chart
    data_for_stacked_area=[['month','Jan', 'Feb', 'Mar', 'Apr', 'May', 
                            'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']]
    for h in categories:
        a = get_month_price_by_category(h.pk)
        a.insert(0, h.name)
        data_for_stacked_area.append(a)
    mimetype = 'application/json'
    context  =  {
        'data_for_piechart' : json.dumps(data),
        'data_for_bar_chart' : json.dumps(data_for_bar_chart),
        'price_by_month' : json.dumps(price_by_month),
        'data_for_stacked_area' : json.dumps(zip(*data_for_stacked_area))
    }
    return HttpResponse(json.dumps(context),mimetype)
    
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
def get_price_last_year():
    price_by_year = [['month', 'price']]
    products = Product.objects.all()
    monthes = ['','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
               'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    for month in range(13)[1:]:
        price = 0
        for obj in products.filter(shoppinglist__date__month = month):
            price += obj.price
        price_by_year.append([monthes[month], int(price)])
    return price_by_year
def get_price_last_month():
    price_by_month = [['date' , 'price']]
    products = Product.objects.all()
    today = datetime.date.today()
    i = datetime.date(today.year, today.month, 1)
    while i.month == today.month:
        price = 0
        for obj in products.filter(shoppinglist__date = i):
            price += obj.price
        price_by_month.append([i.strftime("%d/%m"), int(price)]) 
        i += datetime.timedelta (days = 3)
    return price_by_month
'''
@param -- category's id
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
