from django.template.response import TemplateResponse

from src.examples.forms import FeedbackForm
from src.utils.views import JSONResponse


def feedback(request):
    if request.method == 'POST':
        form = FeedbackForm(request.POST)

        if form.is_valid():
            form.send()
            return JSONResponse({
                'msg': 'Email is sent!'
            })
        else:
            return JSONResponse({
                'errors': form.get_errors()
            })
    else:
        form = FeedbackForm()

    context = {
        'form': form
    }
    return TemplateResponse(request, 'examples/feedback.html', context)
