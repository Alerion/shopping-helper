from django import forms
from django.utils.translation import ugettext_lazy as _

from src.utils.forms import AjaxForm


class FeedbackForm(forms.Form, AjaxForm):
    email = forms.EmailField(label=_(u'Email'))
    message = forms.CharField(label=_(u'Message'), widget=forms.Textarea())

    def send(self):
        pass
