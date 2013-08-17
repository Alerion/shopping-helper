from django.contrib.auth.decorators import login_required
from django.template.response import TemplateResponse
from models import Dashboard, Product
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.shortcuts import render_to_response
from django.views.generic import ListView

@login_required
def index(request):
    s1=Product.objects.all()
    list1=Product.objects.all()
    paginator=Paginator(list1, 5, allow_empty_first_page=True)
    page=request.GET.get("page")
    try:
        listproduct = paginator.page(page)
    except PageNotAnInteger:
        listproduct = paginator.page(1)
    except EmptyPage:
        listproduct = paginator.page(paginator.num_pages)
    context = {'listproduct':listproduct}
    return TemplateResponse(request, 'main/index.html', context)
