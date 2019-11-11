from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from account.models import  Group
from account.models import  User
import account.Account_Login
import hashlib
import time
import json


def responseLoginStatuss(request):
    if request.method == "POST":
        p=json.loads(request.body)
        return HttpResponse(p['action'])
    return HttpResponse('bbb')
    
