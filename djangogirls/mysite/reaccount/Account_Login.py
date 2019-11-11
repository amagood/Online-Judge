from reaccount.models import  Group
from reaccount.models import  User
import hashlib
import time

class account:
    #初始化資料
    def __init__(self, account, password):
        self.account=account
        self.password=password
    #比對密碼是否一至
    def checkLoginData(self):
        hash=hashlib.sha3_512()
        hash.update(self.account.encode(encoding='UTF-8',errors='strict'))
        hash.update(str(time.time()).encode(encoding='UTF-8',errors='strict'))
        userName=self.account
        try:
            loginData=User.objects.get(name=self.account) #讀取資料庫符合的資料
        except:
            who='error'
            stats='fail'
            return who,userName,stats,hash.hexdigest()
        if loginData.password==self.password:
            who=loginData.identification
            stats='success'
        else:
            who='error'
            stats='fail'
        return who,userName,stats,hash.hexdigest()


    
