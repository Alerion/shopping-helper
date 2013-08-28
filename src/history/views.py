from django.contrib.auth.decorators import login_required
from django.template.response import TemplateResponse
from src.main.models import ShoppingList
from src.main.models import Category
from datetime import datetime
from django.http import HttpResponse
from django.http import HttpRequest
import simplejson
@login_required
def index(request):
    dash = request.user.get_dashboard()
    
    categoriesAll = Category.objects.all() #getting queryset all categories
    categoriesProduct = []
    #sizes of shopping list circles css 
    sizeTemplate = range(2,22,2)
    sizeTemplate.insert(0, None)    

    for category in categoriesAll:
        products = dash.product_set.filter(category__id=(category.id))
        categoriesProduct.append({"products":products,"category":category})

      
    lastDate = None
    sizeOfCircle  = None
    shoppingLists = []

    # will it work only once shoppinglist_set.all().
    for sList in dash.shoppinglist_set.all().order_by('-date'):

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

    context = {'category':categoriesAll, 'categoriesProduct':categoriesProduct, 'shoppingList' :shoppingLists}
    return TemplateResponse(request, 'history/index.html', context)


def update_timeline(request):
    
    response = request.POST
    '''????'''

    return HttpResponse(response)


def information(request):
    to_json={'olena':'like vk'}
    response_data = simplejson.dumps(to_json)
    return HttpResponse(response_data, mimetype='application/json')
