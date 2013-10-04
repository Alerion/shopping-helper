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
    
    data_for_pie_chart = get_category_price_piechart('month')
    data_for_bar_chart = get_category_price_barchart('month')
    price_by_month = get_price_by_date('month')            #generate data for time chart
    data_for_stacked_area = get_date_price_by_category('month')

    mimetype = 'application/json'
    context  =  {
        'data_for_piechart' : json.dumps(data_for_pie_chart),
        'data_for_bar_chart' : json.dumps(data_for_bar_chart),
        'price_by_month' : json.dumps(price_by_month),
        'data_for_stacked_area' : json.dumps(zip(*data_for_stacked_area))
    }
    return HttpResponse(json.dumps(context),mimetype)
    
'''
@param -- filter by date
get_category_price_piechart() --return data for pie chart----
'''
def get_category_price_piechart(filter):
    products = Product.objects.all()
    categories  =  Category.objects.all()
    data = [['category name', 'category price']]
    if filter == 'year':
        for d in categories:
            price = 0
            for obj in products.filter(category = d.pk).\
                filter(shoppinglist__date__year = 2013):
                price += obj.price
            data.append([d.name, int(price)])
    elif filter == 'month':
        today = datetime.date.today()
        for d in categories:
            price = 0
            for obj in products.filter(category = d.pk).\
                filter(shoppinglist__date__month = today.month):
                price += obj.price
            data.append([d.name, int(price)])
    
    return data
'''
@param -- filter by date
get_category_price_barchart --return data for bar chart----
'''
def get_category_price_barchart(filter):
    products = Product.objects.all()
    categories  =  Category.objects.all()
    data = [['category name', 'price']]
    if filter == 'year':
        for d in categories:
            price = 0
            for obj in products.filter(category = d.pk).\
                filter(shoppinglist__date__year = 2013):
                price += obj.price
            data.append([d.name, int(price)])
    elif filter == 'month':
        today = datetime.date.today()
        for d in categories:
            price = 0
            for obj in products.filter(category = d.pk).\
                filter(shoppinglist__date__month = today.month):
                price += obj.price
            data.append([d.name, int(price)])

    return data
'''
@param -- filter by date
get_price_by_date() -- function to take data fir time line grafic
'''
def get_price_by_date(filter):
    price_by_date = [['month', 'price']]
    products = Product.objects.all()
    if filter == 'year':
        monthes = ['','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        for month in range(13)[1:]:
            price = 0
            for obj in products.filter(shoppinglist__date__month = month):
                price += obj.price
            price_by_date.append([monthes[month], int(price)])
    elif filter == 'month':
        today = datetime.date.today()
        i = datetime.date(today.year, today.month, 1)
        dates = []
        while i.month == today.month:
            dates.append(i)
            i += datetime.timedelta (days = 1)
        for cur_date in dates[:]:
            price = 0
            for obj in products.filter(shoppinglist__date = cur_date):
                price += obj.price
            price_by_date.append([cur_date.strftime("%d/%m"), int(price)]) 

    return price_by_date
'''
@param -- filter by date
get_date_price_by_category(id) -- return summ manthly spended
for each category
'''
def get_date_price_by_category(filter):
    products = Product.objects.all()
    categories = Category.objects.all()
    price_by_category = []
    if filter == 'year': 
        monthes = ['date','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        for h in categories:
            price_by_date = []
            for month in range(13)[1:]:
                price = 0
                for obj in products.filter(category = h.pk)\
                .filter(shoppinglist__date__month = month):
                    price += obj.price
                price_by_date.append(int(price))
            price_by_date.insert(0, h.name)
            price_by_category.append(price_by_date)
        price_by_category.insert(0, monthes)
    elif filter == 'month':
        today = datetime.date.today()
        i = datetime.date(today.year, today.month, 1)
        dates = []
        while i.month == today.month:
            dates.append(i)
            i += datetime.timedelta (days = 1)
        for h in categories:
            price_by_date = []
            for cur_date in dates[:]:
                price = 0
                for obj in products.filter(category = h.pk)\
                .filter(shoppinglist__date = cur_date):
                    price += obj.price
                price_by_date.append(int(price))
            price_by_date.insert(0, h.name)
            price_by_category.append(price_by_date)   
            
        first_row = ['date']
        g = datetime.date(today.year, today.month, 1)
        while g.month == today.month:
            first_row.append(g.strftime("%d/%m"))
            g += datetime.timedelta (days = 1)
        price_by_category.insert(0, first_row)

    return  price_by_category
