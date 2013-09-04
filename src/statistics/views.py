import json
from django.contrib.auth.decorators import login_required
from django.db.models import Sum
from django.http import HttpResponse
from django.template import RequestContext, loader
from src.main.models import Product, Category


@login_required
def index(request):
    categories = Category.objects.all()
    data=[]
    for obj in categories:
        data.append([ obj.name, get_category_price(obj.pk) ])
    price = []
    categories_name=[]
    for i in categories:
        price.append(get_category_price(i.pk))
        categories_name.append(i.name)
    template = loader.get_template('statistics/index.html')
    context = RequestContext(request, {
        'data_for_piechart': json.dumps(data),
        'price' : json.dumps(price),
        'categories_name' : json.dumps(categories_name)
    })
    return HttpResponse(template.render(context))

'''
@param -- category's id
get_category_price() --return percentage of spended money for each category    
'''
def get_category_price(id):
    price=0
    total_price=0
    products=Product.objects.all()
    for obj in products.filter(category=id):
        price+=obj.price
    return round(price)
