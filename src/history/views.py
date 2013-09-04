from django.contrib.auth.decorators import login_required
from django.template.response import TemplateResponse
from src.main.models import ShoppingList
from src.main.models import Category
from src.main.models import Product
from datetime import datetime
from django.http import HttpResponse
from django.http import HttpRequest
import simplejson


@login_required
def index(request):
    dash = request.user.get_dashboard()
    curr_buylist = dash.get_or_create_shopping_list()
    products_out = Product.objects.filter(dashboard = dash) \
        .exclude(pk__in=curr_buylist.products.all())
    products_in = curr_buylist.products.all()
    products = Product.objects.all
    categoriesAll = Category.objects.all() #getting queryset all categories
    categoriesProduct = []
    
    #sizes of shopping list circles css
    sizeTemplate = range(2,22,2)
    sizeTemplate.insert(0, None)

    #menu
    for category in categoriesAll:
        products = dash.product_set.filter(category__id=(category.id))
        categoriesProduct.append({"products":products,"category":category})


    lastDate = None
    sizeOfCircle  = None
    shoppingLists = []

    # will it work only once shoppinglist_set.all().
    for sList in dash.shoppinglist_set.exclude(date=None).order_by('-date'):

        if not lastDate:
            distanceDays = 1+(datetime.now().date() - sList.date).days
        else:
            distanceDays = (lastDate - sList.date).days

        lastDate = sList.date;

        for st in sizeTemplate:
            if (st != None) and len(sList.products.all()) <= st:
                sizeOfCircle = sizeTemplate.index(st);
                break;

        shoppingLists.append({"sList": sList,"Size":sizeOfCircle,"Distance":distanceDays*50});
    
    to_json = []
    for pr in products :
        to_json.append({'name': pr.name})

    context = {
        'category':categoriesAll,
        'categoriesProduct':categoriesProduct,
        'shoppingList'     :shoppingLists,
        'products_out'     :products_out,
        'products_in'      :products_in,
    }
    return TemplateResponse(request, 'history/index.html', context)


def update_timeline(request):
    response = request.POST
    return HttpResponse(response)


def information(request):
    dash = request.user.get_dashboard()
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
