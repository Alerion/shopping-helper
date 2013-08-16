from django.contrib.auth.decorators import login_required
from django.template.response import TemplateResponse
from src.main.models import ShoppingList

@login_required
def index(request):
    sl = ShoppingList.objects.all()
    context = {'shoppingList': sl}
    return TemplateResponse(request, 'history/index.html', context)

