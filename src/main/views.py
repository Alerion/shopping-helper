from django.contrib.auth.decorators import login_required
from django.template.response import TemplateResponse
from models import Dashboard
from django.views.generic import ListView

@login_required
def index(request):
    s1=Dashboard.objects.all()
    context = {'dashboardlist':s1}
    return TemplateResponse(request, 'main/index.html', context)
