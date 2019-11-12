from django.shortcuts import render
from django.http import JsonResponse

from . import Register
# Create your views here.

def index(request):
	if request.method == 'POST':
		j = request.body
		return RsponseRegisterStatus(j)
	elif request.method == 'GET':
		return render(request, 'register/index.html',{})