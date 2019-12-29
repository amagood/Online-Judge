from django.urls import path
from . import Register_View

app_name='register'
urlpatterns=[
	path('',Register_View.ResponseRegisterStatus,name='index'),
]