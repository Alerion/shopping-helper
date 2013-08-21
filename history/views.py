from django.contrib.auth.decorators import login_required
from django.template.response import TemplateResponse
from src.main.models import ShoppingList
from src.main.models import Category
from django.http import HttpResponse
from django.http import HttpRequest
@login_required
def index(request):
    dash = request.user.get_dashboard()
    sl = dash.shoppinglist_set.all()
    categoriesAll = Category.objects.all() #getting queryset all categories
    categoriesProduct = []
    for category in categoriesAll :
    	products = dash.product_set.filter(category__id=(category.id))
    	categoriesProduct.append({"products":products,"category":category})
        
   
    context = {'category':categoriesAll, 'categoriesProduct':categoriesProduct, 'shoppingList' :sl}

    return TemplateResponse(request, 'history/index.html', context)



def update_timeline(request):
    
    response = request.POST

    return HttpResponse(response)






