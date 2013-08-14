from django.conf.urls import patterns, include, url

urlpatterns = patterns('history.views',
    url(r'^$', 'index', name='index'),
)

