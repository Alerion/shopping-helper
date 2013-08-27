from django.conf.urls import patterns, include, url

urlpatterns = patterns('src.examples.views',
    url(r'^$', 'feedback', name='feedback'),
)