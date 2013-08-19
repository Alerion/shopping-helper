from django.conf.urls import patterns, url


urlpatterns = patterns('src.main.views',
    url(r'^$', 'index', name='index'),
    url(r'^current_list/$', 'current_list', name='current_list'),
)