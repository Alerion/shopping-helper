from django.forms.formsets import BaseFormSet
from django.utils.encoding import force_unicode


class AjaxForm(object):

    def get_form_errors(self, form):
        output = {}
        for name, value in form.errors.items():
            if form.prefix:
                key = '%s-%s' % (form.prefix, name)
            else:
                key = name
            output[key] = '/n'.join([force_unicode(i) for i in value])
        return output

    def get_errors(self):
        if isinstance(self, BaseFormSet):
            errors = {}
            for form in self:
                errors.update(self.get_form_errors(form))
            return errors
        else:
            return self.get_form_errors(self)
