from django.conf.urls import patterns, include, url

urlpatterns = patterns('src.examples.views',
    url(r'^$', 'index', name='index'),
    url(r'^feedback/$', 'feedback', name='feedback'),
)