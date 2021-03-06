#from django.contrib.auth.decorators import login_required
from django.template.response import TemplateResponse
from src.main.models import ShoppingList
from src.main.models import Category
from src.main.models import Product
from datetime import datetime
from django.http import HttpResponse
from django.http import HttpRequest
from django.http import Http404

import simplejson


#@login_required
def index(request):
    return TemplateResponse(request, 'history/backbone.html')

def error(request):
    return TemplateResponse(request, 'history/error.html')

def old(request):
    dash = request.user.get_dashboard()
    curr_buylist = dash.get_or_create_shopping_list()

    products_out = Product.objects.filter(dashboard = dash) \
        .exclude(pk__in=curr_buylist.products.all())
        
    products_in = curr_buylist.products.all()
    products_all = Product.objects.all()
    categoriesAll = Category.objects.all() #getting queryset all categories
    categoriesProduct = []
    
    #sizes of shopping list circles css
    sizeTemplate = range(2,22,2)
    sizeTemplate.insert(0, None)

    #menu
    for category in categoriesAll:
        products = dash.product_set.filter(category__id=(category.id))
        categoriesProduct.append({"products":products,"category":category, "icon": category.icon.url})


    lastDate = None
    sizeOfCircle  = None
    shoppingLists = []
    shoppingDates = []
    
    # will it work only once shoppinglist_set.all().
    for sList in dash.shoppinglist_set.exclude(date=None).order_by('-date'):

        shoppingDates.append(sList.date.strftime('%Y-%m-%d'))

        if not lastDate:
            distanceDays = 1+(datetime.now().date() - sList.date).days
        else:
            distanceDays = (lastDate - sList.date).days
        lastDate = sList.date;

        for st in sizeTemplate:
            if (st != None) and len(sList.products.all()) <= st:
                sizeOfCircle = sizeTemplate.index(st);
                break;

        shoppingLists.append({"sList": sList,"Size":sizeOfCircle,"Distance":distanceDays*20,"dateId":sList.date.strftime('%Y-%m-%d')});



    context = {
        'category':categoriesAll,
        'categoriesProduct':categoriesProduct,
        'shoppingList'     :shoppingLists,
        'products_out'     :products_out,
        'products_in'      :products_in,
        'shoppingDates'    : simplejson.dumps(shoppingDates).replace('&quot;','"')    
    }

    return TemplateResponse(request, 'history/index.html', context)


def information(request):

    dash = request.user.get_dashboard()
    if 'id' not in request.GET.keys():
        return TemplateResponse(request, 'history/error.html')
    else:
        product_id = request.GET['id']
    
    product = dash.product_set.filter(id=(product_id))[0]
    to_json = {
        'name'      :product.name,
        'category'  :product.category.name,
        'last_buy'  :str(product.last_buy),
        'price'     :product.price,
        'buy_period':product.buy_period
    }
    response_data = simplejson.dumps(to_json)
    return HttpResponse(response_data, mimetype = 'application/json')

def add_to_list(request):

    products_all = Product.objects.all()
    ids = [] 
    if 'id' not in request.GET.keys():
        return TemplateResponse(request, 'history/error.html')
    else :
        for pr in products_all :
            ids.append(pr.id)
            product_id = request.GET['id']
        if int(product_id) not  in ids :
            return TemplateResponse(request, 'history/error.html')
        else :
            dash = request.user.get_dashboard() 
            product = dash.product_set.filter(id=(product_id))[0]
            curr_buylist = dash.get_or_create_shopping_list()
            products_in = curr_buylist.products.all()
            product_in_ids = []

            #check if product is in current shopping-list
            for pr in products_in :
                product_in_ids.append(str(pr.id))

            if product_id not in product_in_ids :
                #add  product to current list
                curr_buylist.add_product(product_id)
                curr_buylist.save()
                #if data successfull update we send true
                response = simplejson.dumps({'flag' : 'true', 'name' : product.name})
            else : 
                #delete  product from current list
                curr_buylist.del_product(product_id)
                curr_buylist.save()
                #if data successfull update we send false
                response = simplejson.dumps({'flag' : 'false', 'name' : product.name})

    return HttpResponse(response,mimetype = 'application/json')

def previous_settings (request) :
    dash = request.user.get_dashboard()
    curr_buylist = dash.get_or_create_shopping_list()
    products_in = curr_buylist.products.all()
    products_in_id = []
    product_name = []

    for pr in products_in :
        products_in_id.append({'product_in_id' : str(pr.id)})
        product_name.append({'product_name' : pr.name})
    response = simplejson.dumps([products_in_id, product_name])
    return HttpResponse(response,mimetype = 'application/json')

def prices (request) :
    products_all = Product.objects.all()
    #prices for products 
    product_prices = []
    for pr in products_all :
       product_prices.append({'pr_id' : str(pr.id), 'pr_price' : pr.price})
    response = simplejson.dumps(product_prices)
    return HttpResponse(response,mimetype = 'application/json')


def work_with_map (request) :
    dash = request.user.get_dashboard()
    products_all = Product.objects.all()
    ids = []
    for pr in products_all :
        ids.append(pr.id)
    if  'id' not in request.GET.keys():
        return TemplateResponse(request, 'history/error.html')
    else :
        product_id = request.GET['id']
        if int(product_id) not  in ids :
            return TemplateResponse(request, 'history/error.html')
        else :
            product = dash.product_set.filter(id=(product_id))[0]
                
            coord = [];
            loc_name = [];

            for l in product.locations.all():
                coord.append([float(x) for x in l.coordinate.split(';')])
                loc_name.append(l.name)

            to_json = {
                'url' : str(product.category.icon),
                'positions' : coord,
                'pr_name'   : product.name,
                'loc_names' : loc_name

            }

            response_data = simplejson.dumps(to_json)
            return HttpResponse(response_data, mimetype = 'application/json')