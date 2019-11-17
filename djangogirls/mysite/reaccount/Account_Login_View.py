from reaccount.models import  Group
from reaccount.models import  User
import reaccount.Account_Login      #reaccount要改成資料夾的名稱 也就是app的名稱
import hashlib
import time
import json


def responseLoginStatus(account,password):
    check=reaccount.Account_Login.account(account,password) #初始化class中的資料
    who,userName,stats,hash=check.checkLoginData()                        #接收回傳
    returndata = {
        "who" : who,
        "userName" : userName,
        "stats" : stats,
        "hash" : hash,
    }
    data=json.dumps(returndata)
    return data
