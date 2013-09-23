from django.conf.urls import patterns, include, url


urlpatterns = patterns('src.statistics.views',
    url(r'^$', 'index', name='index'),
    url(r'^back_page/', 'back_page', name='back_page'),
    
)