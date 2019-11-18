from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from login.models import  Group
from login.models import  User
import login.Account_Login_View
import hashlib
import time
import json


def responseLoginStatus(request):
    if request.method == "POST":
        req=json.loads(request.body)
        data=login.Account_Login_View.responseLoginStatus(req['account'],req['password'])
        return HttpResponse(data)
    return render(request,'login/login.html',{})    
