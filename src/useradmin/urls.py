from django.conf.urls import patterns, url, include


urlpatterns = patterns('src.useradmin.views',
    url(r'^$', 'index', name='index'),
 	url(r'^test/$', 'test', name='test'),
    url(r'^remove_product/$', 'remove_product', name='remove_product'),
    url(r'^add_user/$', 'add_user', name='add_user'),
    url(r'^remove_user/$', 'remove_user', name='remove_user'),
)
