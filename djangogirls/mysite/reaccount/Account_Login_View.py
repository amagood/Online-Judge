from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from reaccount.models import  Group
from reaccount.models import  User
import reaccount.Account_Login
import hashlib
import time
import json


def responseLoginStatus(request):
    if request.method == "POST":
        p=json.loads(request.body)
        check=reaccount.Account_Login.account(p['account'],p['password']) #初始化class中的資料
        who,userName,stats,hash=check.checkLoginData()
        data = {
            "who" : who,
            "userName" : userName,
            "stats" : stats,
            "hash" : hash,
        }
        data=json.dumps(data)
    return HttpResponse(data)
