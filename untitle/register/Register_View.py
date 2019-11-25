import json

from django.shortcuts import render
from django.http import JsonResponse,HttpResponse

from . import Register
# Create your views here.	
def ResponseRegisterStatus(request):
	if request.method == 'POST':
		try:
			jsonPost = json.loads(request.body)
		except:
			jsonPost = {}	
		if Register.AddAccount(jsonPost):
			retDict = {'stats':'success'}
		else:
			retDict = {'stats':'error'}
		return JsonResponse(retDict)
