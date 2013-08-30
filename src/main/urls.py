from django.conf.urls import patterns, url


urlpatterns = patterns('src.main.views',
    url(r'^$', 'index', name='index'),
    url(r'^remove_shopping/$', 'remove_shopping', name='remove_shopping'),
    url(r'^adding_from_all_products/$', 'adding_from_all_products', name='adding_from_all_products'),
    url(r'^buy_all_products/$', 'buy_all_products', name='buy_all_products'),

)