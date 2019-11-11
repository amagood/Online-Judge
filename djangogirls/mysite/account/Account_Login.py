class account:
    #初始化資料
    def __init__(self, account, password):
        self.account=account
        self.password=password
    #比對密碼是否一至
    def checkLoginData(self,loginPassword):
        if self.password==loginPassword:
            return 0
        else:
            return 1


    
