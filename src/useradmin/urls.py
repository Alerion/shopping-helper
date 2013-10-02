from django.conf.urls import patterns, url, include


urlpatterns = patterns('src.useradmin.views',
    url(r'^$', 'index', name='index'),
 	url(r'^backbone/$', 'backbone', name='backbone'),
    url(r'^remove_product/$', 'remove_product', name='remove_product'),
)
