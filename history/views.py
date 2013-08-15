from django.contrib.auth.decorators import login_required
from django.template.response import TemplateResponse
from src.main.models import ShoppingList

@login_required
def index(request):
    sl = ShoppingList.objects.all()
    arr=[]
    for s in sl:
	arr.append({'date':s.date,'products':s.products.all()})
    context = {'shoppingList': arr}
    return TemplateResponse(request, 'history/index.html', context)
  


