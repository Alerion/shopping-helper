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
    category_id=[r.pk for r in categories]
    for i in category_id:
        name=[i.name for i in categories.filter(id=i)]
        data.append([ name, get_category_price(i) ])
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
    for e in Product.objects.filter(category=id).values('price'):
        price+=e['price']
        
    each_price=[i.price for i in Product.objects.all()]
    for i in each_price:
        total_price+=i
    if total_price>0:
        percentage=price/total_price
    elif total_price==0:
        percentage=0
    return round(percentage,2)

