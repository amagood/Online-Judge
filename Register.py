import re
from DataBase.models import User
def AddAccount(jsonPost):
	if CheckAccountData(jsonPost):
		if _Record_Into_Database(jsonPost):
			return True
	return False

def CheckAccountData(jsonPost):
	return _Is_Legal_Data(jsonPost)

def _Is_Legal_Data(jsonDict):
	if _Is_Register_Action(jsonDict):
		if _Is_Account_Legal(jsonDict):
			if _Is_Password_Legal(jsonDict):
				if _Is_Identity_Legal(jsonDict):
					if _Is_Email_Legal(jsonDict):
						if not _Is_Account_Collision(jsonDict):
							return True
	return False

def _Is_Register_Action(jsonDict):
	try:
		if jsonDict['action'] != 'register':
			return False
		return True
	except:
		return False

def _Is_Account_Legal(jsonDict):
	try:
		if not re.search('^[a-zA-Z0-9]{1,40}$',jsonDict['account']):
			return False
		return True
	except:
		return False

def _Is_Password_Legal(jsonDict):
	try:
		if not re.search('^[a-zA-Z0-9]{8,40}$',jsonDict['password']):
			return False
		return True
	except:
		return False

def _Is_Identity_Legal(jsonDict):
	try:
		if not re.search('^teacher$|^student$',jsonDict['who']):
			return False
		return True
	except:
		return False

def _Is_Email_Legal(jsonDict):
	try:
		if not re.search('^[a-zA-Z0-9]{1,20}@[\.a-zA-Z0-9]{1,20}$',jsonDict['email']):
			return False
		return True
	except:
		return False

def _Is_Account_Collision(jsonDict):
	try:
		a=jsonDict['account']
		m=jsonDict['email']
		if User.objects.filter(User_Name=a) or User.objects.filter(User_Email=m):
			return True
		return False
	except:
		return True

def _Record_Into_Database(jsonDict):
	a=jsonDict['account']
	p=jsonDict['password']
	m=jsonDict['email']
	i=jsonDict['who']
	User.objects.create(User_Name=a,User_Password=p,User_Identification=i,User_Email=m)
	
	if User.objects.filter(User_Name=a,User_Password=p,User_Identification=i,User_Email=m):
		return True
	return False