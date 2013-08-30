import json
from django.contrib.auth.decorators import login_required
from django.db.models import Sum
from django.http import HttpResponse
from django.template import RequestContext, loader
from src.main.models import Product, Category


@login_required
def index(request):
    categories=Category.objects.all()
    data=[]
    for obj in categories:
        data.append([ obj.name, get_category_price(obj.pk) ])
    template = loader.get_template('statistics/index.html')
    context = RequestContext(request, {
        'categories': json.dumps(data)
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
        
    each_price=[i.price for i in Product.objects.all()]
    for i in each_price:
        total_price+=i
    if total_price>0:
        percentage=price/total_price
    elif total_price==0:
        percentage=0
    return round(percentage,2)
    
    
    
    

