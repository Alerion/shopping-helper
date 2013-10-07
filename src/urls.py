from django.conf import settings
from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

from src.main.api import router

admin.autodiscover()

urlpatterns = patterns('',
    url(r'^', include('src.main.urls', 'main')),
    url(r'^accounts/', include('src.accounts.urls', 'accounts')),
    url(r'^statistics/', include('src.statistics.urls', 'statistics')),
    url(r'^history/', include('src.history.urls', 'history')),
    url(r'^useradmin/', include('src.useradmin.urls', 'useradmin')),
    url(r'^examples/', include('src.examples.urls', 'examples')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^api/', include(router.urls)),
)

urlpatterns += patterns('django.contrib.auth.views',
    url(r'^login/$', 'login', {'template_name': 'accounts/login.html'}, name='login'),
    url(r'^logout/$', 'logout_then_login', name='logout'),
)

urlpatterns += staticfiles_urlpatterns()

if settings.DEBUG:
    urlpatterns += patterns('',
        url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {
            'document_root': settings.MEDIA_ROOT,
            }))
