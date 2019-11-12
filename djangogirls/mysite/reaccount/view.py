from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from reaccount.models import  Group
from reaccount.models import  User
import reaccount.Account_Login_View
import hashlib
import time
import json


def responseLoginStatus(request):
    if request.method == "POST":
        req=json.loads(request.body)
        data=reaccount.Account_Login_View.responseLoginStatus(req['account'],req['password'])
        return HttpResponse(data)
    return HttpResponse('WTF')    
