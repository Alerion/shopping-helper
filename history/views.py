from django.contrib.auth.decorators import login_required
from django.template.response import TemplateResponse
from src.main.models import ShoppingList
from src.main.models import Category
from django.http import HttpResponse
@login_required
def index(request):
    dash = request.user.getDashboard()
    sl = dash.shoppinglist_set.all()
    ct = Category.objects.all()
    pr = dash.product_set.all()
    context = {'shoppingList': sl, 'category': ct, 'products': pr}
    return TemplateResponse(request, 'history/index.html', context)



  

