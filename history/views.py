from django.contrib.auth.decorators import login_required
from django.template.response import TemplateResponse


@login_required
def index(request):
    context = {}
    return TemplateResponse(request, 'history/index.html', context)
