from django.conf.urls import patterns, include, url

urlpatterns = patterns('src.history.views',
    url(r'^$', 'index', name = 'index'),
	url(r'^update_timeline/$', 'update_timeline', name = 'update_timeline'),
	url(r'^information/$', 'information', name = 'information'),
	url(r'^add_to_list/$', 'add_to_list', name = 'add_to_list'),
	url(r'^previous_settings/$', 'previous_settings', name = 'previous_settings'),
	url(r'^prices/$', 'prices', name = 'prices'),
	url(r'^old/$', 'old', name = 'old'),
	url(r'^work_with_map/$', 'work_with_map', name = 'work_with_map'),


)

