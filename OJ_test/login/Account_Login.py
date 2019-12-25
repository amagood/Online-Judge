
from DataBase.models import  User #reaccount要改成資料夾的名稱 也就是app的名稱 models是db名稱
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
        hash.update(self.account.encode(encoding='UTF-8',errors='strict'))  #將名字放入hash
        hash.update(str(time.time()).encode(encoding='UTF-8',errors='strict'))  #將時間放入hash
        userName=self.account
        try:
            loginData=User.objects.get(User_Name=self.account) #讀取資料庫符合的資料
            if loginData.User_Password==self.password: #比對密碼
                who=loginData.User_Identification
                stats='success'
            else:
                who='error'
                stats='fail'
        except:
            who='error'
            stats='fail'
        return who,userName,stats,hash.hexdigest()


    
