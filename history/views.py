from django.contrib.auth.decorators import login_required
from django.template.response import TemplateResponse
from src.main.models import ShoppingList
from src.main.models import Category
from django.http import HttpResponse
from django.http import HttpRequest
import simplejson
@login_required
def index(request):
    dash = request.user.get_dashboard()
    shoppingLists = dash.shoppinglist_set.all()[:3]
    categoriesAll = Category.objects.all() #getting queryset all categories
    categoriesProduct = []
    sizeTemplate = range(2,22,2)
    mass = []

    for category in categoriesAll :
    	products = dash.product_set.filter(category__id=(category.id))
    	categoriesProduct.append({"products":products,"category":category})
    for slist in shoppingLists :
        for  st in sizeTemplate :
            if len(slist.products.all()) <= st  :
                mass.append(sizeTemplate.index(st));
                break;



   
    context = {'category':categoriesAll, 'categoriesProduct':categoriesProduct, 'shoppingList' :shoppingLists, 'mas':mass}
    return TemplateResponse(request, 'history/index.html', context)


def update_timeline(request):
    
    response = request.POST
    '''????'''

    return HttpResponse('privet')


def information(request):
    to_json={'olena':'like vk'}
    response_data = simplejson.dumps(to_json)
    return HttpResponse(response_data, mimetype='application/json')








