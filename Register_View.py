import json

from django.shortcuts import render
from django.http import JsonResponse,HttpResponse

from . import Register
# Create your views here.

#the html page file route; default route templates/register/register.html
page_route = 'register/register.html'

def ResponseRegisterStatus(request):#request for register#
	if request.method == 'POST':
		try:
			jsonPost = json.loads(request.body)
		except:
			jsonPost = {}
		if Register.AddAccount(jsonPost):
			retDict = {
				'stats':'success',
				'err_msg':''
			}
		else:
			retDict = {
				'stats':'error',
				'err_msg':Register.ERR_MASSAGE()
			}
		return JsonResponse(retDict)
	else:
		return render(request,page_route,{})
