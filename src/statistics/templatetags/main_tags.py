from django import template

register = template.Library()


@register.inclusion_tag('_menu.html')
def menu():
    return {}