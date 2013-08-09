from django.conf.urls import patterns, include, url


urlpatterns = patterns('src.main.views',
    url(r'^$', 'index', name='index'),
)