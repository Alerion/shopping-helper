import json
import datetime
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
from django.db.models import Sum
from django.http import HttpResponse
from django.template.response import TemplateResponse
from django.template import RequestContext, loader
from src.main.models import Product, Category, ShoppingList


@login_required
def index(request):
    categories  =  Category.objects.all()
    category = []
    for obj in categories:
        category.append(obj.name)
    context = {
        'category' : category
    }
    return TemplateResponse(request, 'statistics/index.html', context)

@login_required
def back_page(request):
    user = request.user
    dashboard  =  request.user.get_dashboard()
    date_filter = 'year'
    excl_category = []
    if request.GET:
        date_filter = request.GET.get('filter_d')
        date_filter = serelize_data(date_filter)
        excl_category_str = request.GET.get('filter_c')
        excl_category_str = excl_category_str[1:-1].split(',')
        for a in excl_category_str:
            excl_category.append(a[1:-1]) 
    categories  =  Category.objects.all()
    if excl_category is not None:
        for ex_cat in excl_category:
            categories = categories.exclude(name = ex_cat)
    if date_filter == 'year':
        data_for_pie_chart = get_category_price_piechart_y(categories)
        data_for_bar_chart = get_category_price_barchart_y(categories)
        price_by_month = get_price_by_date_y(categories)
        data_for_stacked_area = get_date_price_by_category_y(categories)
    elif date_filter == 'month':
        data_for_pie_chart = get_category_price_piechart_m(categories)
        data_for_bar_chart = get_category_price_barchart_m(categories)
        price_by_month = get_price_by_date_m(categories)
        data_for_stacked_area = get_date_price_by_category_m(categories)
    elif type(date_filter) is list:
        data_for_pie_chart = get_category_price_piechart_p(date_filter, categories)
        data_for_bar_chart = get_category_price_barchart_p(date_filter, categories)
        price_by_month = get_price_by_date_p(date_filter, categories)
        data_for_stacked_area = get_date_price_by_category_p(date_filter, categories)
    mimetype = 'application/json'
    context  =  {
        'data_for_piechart' : json.dumps(data_for_pie_chart),
        'data_for_bar_chart' : json.dumps(data_for_bar_chart),
        'price_by_month' : json.dumps(price_by_month),
        'data_for_stacked_area' : json.dumps(zip(*data_for_stacked_area))
    }
    return HttpResponse(json.dumps(context),mimetype)
    
'''
@param -- categories to use
get_category_price_piechart() --return data for pie chart by year----
'''

def get_category_price_piechart_y(categories):
    products = Product.objects.all()
    data = [['category name', 'category price']]
    for d in categories:
        price = 0
        for obj in products.filter(category = d.pk).\
            filter(shoppinglist__date__year = 2013):
            price += obj.price
        data.append([d.name, int(price)])
    return data

'''
@param -- categories to use
get_category_price_piechart() --return data for pie chart by month----
'''

def get_category_price_piechart_m(categories):
    products = Product.objects.all()
    data = [['category name', 'category price']]
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
@param -- categories to use
get_category_price_piechart() --return data for pie chart by period----
'''

def get_category_price_piechart_p(filter, categories):
    products = Product.objects.all()
    data = [['category name', 'category price']]
    start_date = datetime.date(int(filter[0][0]), int(filter[0][1]), int(filter[0][2]))
    end_date = datetime.date(int(filter[1][0]), int(filter[1][1]), int(filter[1][2]))
    dates = []
    while end_date >= start_date:
        dates.append(start_date)
        start_date += datetime.timedelta (days = 1)
    for d in categories:
        price = 0
        for cur_date in dates[:]: 
            for obj in products.filter(category = d.pk).\
                filter(shoppinglist__date = cur_date):
                price += obj.price
        data.append([d.name, int(price)])
    return data

'''
@param -- categories to use
get_category_price_barchart --return data for bar chart by year
'''

def get_category_price_barchart_y(categories):
    products = Product.objects.all()
    data = [['category name', 'price']]
    for d in categories:
        price = 0
        for obj in products.filter(category = d.pk).\
            filter(shoppinglist__date__year = 2013):
            price += obj.price
        data.append([d.name, int(price)])
    return data

'''
@param -- categories to use
get_category_price_barchart --return data for bar chart by month
'''

def get_category_price_barchart_m(categories):
    products = Product.objects.all()
    data = [['category name', 'price']]
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
@param -- categories to use
get_category_price_barchart --return data for bar chart by period
'''

def get_category_price_barchart_p(filter, categories):
    products = Product.objects.all()
    data = [['category name', 'price']]
    start_date = datetime.date(int(filter[0][0]), int(filter[0][1]), int(filter[0][2]))
    end_date = datetime.date(int(filter[1][0]), int(filter[1][1]), int(filter[1][2]))
    dates = []
    while end_date >= start_date:
        dates.append(start_date)
        start_date += datetime.timedelta (days = 1)
    for d in categories:
        price = 0
        for cur_date in dates[:]:
            for obj in products.filter(category = d.pk).\
            filter(shoppinglist__date = cur_date):
                price += obj.price
        data.append([d.name, int(price)])
    return data

'''
@param -- categories
get_price_by_date() -- function to take data fir time line grafic by year
'''
def get_price_by_date_y(categories):
    price_by_date = [['month', 'price']]
    products = Product.objects.all()
    monthes = ['','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    for month in range(13)[1:]:
        price = 0
        for obj in products.filter(shoppinglist__date__month = month):
            price += obj.price
        price_by_date.append([monthes[month], int(price)])
    return price_by_date

'''
@param -- categories
get_price_by_date() -- function to take data fir time line grafic by month
'''

def get_price_by_date_m(categories):
    price_by_date = [['month', 'price']]
    products = Product.objects.all()
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
@param -- categories
get_price_by_date() -- function to take data fir time line grafic by period
'''

def get_price_by_date_p(filter, categories):
    price_by_date = [['month', 'price']]
    products = Product.objects.all()
    start_date = datetime.date(int(filter[0][0]), int(filter[0][1]), int(filter[0][2]))
    end_date = datetime.date(int(filter[1][0]), int(filter[1][1]), int(filter[1][2]))
    dates = []
    while end_date >= start_date:
        dates.append(start_date)
        start_date += datetime.timedelta (days = 1)
    for cur_date in dates[:]:
        price = 0
        for obj in products.filter(shoppinglist__date = cur_date):
            price += obj.price
        price_by_date.append([cur_date.strftime("%d/%m"), int(price)]) 
    return price_by_date

'''
@param -- categories to use
get_date_price_by_category(id) -- return summ manthly spended
for each category, by year
'''
def get_date_price_by_category_y(categories):
    products = Product.objects.all()
    price_by_category = []
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
    return price_by_category
'''
@param -- categories to use
get_date_price_by_category(id) -- return summ manthly spended
for each category, by month
'''

def get_date_price_by_category_m(categories):
    products = Product.objects.all()
    price_by_category = []
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
    return price_by_category
'''
@param -- filter by date
@param -- categories to use
get_date_price_by_category(id) -- return summ manthly spended
for each category, by period
'''

def get_date_price_by_category_p(filter, categories):
    products = Product.objects.all()
    price_by_category = []
    start_date = datetime.date(int(filter[0][0]), int(filter[0][1]), int(filter[0][2]))
    end_date = datetime.date(int(filter[1][0]), int(filter[1][1]), int(filter[1][2]))
    dates = []
    first_row = ['date']
    while end_date >= start_date:
        first_row.append(start_date.strftime("%d/%m"))
        dates.append(start_date)
        start_date += datetime.timedelta (days = 1)
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
    price_by_category.insert(0, first_row)
    return  price_by_category

'''
@param -- string for serelization
serelize_data() -- serelize date from ajax to djang date format
'''
def serelize_data (string_date):
    if string_date[0] == '[':
        string_date = string_date.split(',')
        start_date = string_date[0][2:-1].split('/')
        end_date = string_date[1][1:-2].split('/')
        start_date.insert(0, start_date[-1])
        start_date[3] = start_date[2]
        end_date.insert(0, end_date[-1])
        end_date[3] = end_date[2]
        return [start_date[:-1], end_date[:-1]]
    else :
       return string_date
