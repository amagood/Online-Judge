import json

from django.shortcuts import render
from django.http import JsonResponse,HttpResponse

from . import Register_View
# Create your views here.

def index(request):
	if request.method == 'POST':
		try:
			j = json.loads(request.body)
		except:
			j = {}
		return JsonResponse(Register_View.ResponseRegisterStatus(j))
	elif request.method == 'GET':
		return render(request, 'register/index.html',{})