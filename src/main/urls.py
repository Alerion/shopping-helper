from django.conf.urls import patterns, url


urlpatterns = patterns('src.main.views',
    url(r'^$', 'index', name='index'),
)