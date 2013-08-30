from django.contrib.auth.decorators import login_required
from django.template.response import TemplateResponse
from django.http import HttpResponse


@login_required
def index(request):
   response = HttpResponse(request.user.getDashboard())
return response
