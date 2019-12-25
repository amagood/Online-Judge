README


chat board
setting.py
	INSTALLED_APPS add 'message.apps'
	STATICFILES_DIRS add "static/message"

urls.py
	urlpatterns add path('message/', include('message.urls')),
