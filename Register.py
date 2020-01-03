import re
from DataBase.models import User

ERR_MSG = ''
def ERR_MASSAGE():
	global ERR_MSG
	return ERR_MSG

def AddAccount(jsonPost):
	if CheckAccountData(jsonPost):
		if _Record_Into_Database(jsonPost):
			return True
	return False

def CheckAccountData(jsonPost):
	return _Is_Legal_Data(jsonPost)
	
def _Change_Err_Msg(msg):
	global ERR_MSG
	ERR_MSG=msg
def _Is_Legal_Data(jsonDict):
	global ERR_MSG
	if _Is_Register_Action(jsonDict):
		if _Is_Account_Legal(jsonDict):
			if _Is_Password_Legal(jsonDict):
				if _Is_Identity_Legal(jsonDict):
					if _Is_Email_Legal(jsonDict):
						if not _Is_Account_Collision(jsonDict):
							if not _Is_Email_Collision(jsonDict):
								return True
	return False

def _Is_Register_Action(jsonDict):
	try:
		if jsonDict['action'] != 'register':
			_Change_Err_Msg('NOT REGISTER ACTION')
			return False
		return True
	except:
		_Change_Err_Msg('POST PACKET ERROR')
		return False

def _Is_Account_Legal(jsonDict):
	try:
		if not re.search('^[a-zA-Z0-9]{1,40}$',jsonDict['account']):
			_Change_Err_Msg('ACCOUNT IS NOT LEGAL')
			return False
		return True
	except:
		_Change_Err_Msg('POST PACKET ERROR')
		return False

def _Is_Password_Legal(jsonDict):
	try:
		if not re.search('^[a-zA-Z0-9]{8,40}$',jsonDict['password']):
			_Change_Err_Msg('PASSWORD IS NOT LEGAL')
			return False
		return True
	except:
		_Change_Err_Msg('POST PACKET ERROR')
		return False

def _Is_Identity_Legal(jsonDict):
	try:
		if not re.search('^teacher$|^student$',jsonDict['who']):
			_Change_Err_Msg('IDENTITY IS NOT EXIST')
			return False
		return True
	except:
		_Change_Err_Msg('POST PACKET ERROR')
		return False

def _Is_Email_Legal(jsonDict):
	try:
		if not re.search('^[a-zA-Z0-9]{1,20}@[\.a-zA-Z0-9]{1,20}$',jsonDict['email']):
			_Change_Err_Msg('EMAIL IS NOT LEGAL')
			return False
		return True
	except:
		_Change_Err_Msg('POST PACKET ERROR')
		return False

def _Is_Account_Collision(jsonDict):
	try:
		a=jsonDict['account']
		if User.objects.filter(User_Name=a):
			_Change_Err_Msg('ACCOUNT NAME HAS BEEN USED')
			return True
		return False
	except:
		_Change_Err_Msg('POST PACKET ERROR')
		return True

def _Is_Email_Collision(jsonDict):
	try:
		m=jsonDict['email']
		if User.objects.filter(User_Email=m):
			_Change_Err_Msg('EMAIL HAS BEEN USED')
			return True
		return False
	except:
		_Change_Err_Msg('POST PACKET ERROR')
		return True

def _Record_Into_Database(jsonDict):
	a=jsonDict['account']
	p=jsonDict['password']
	m=jsonDict['email']
	i=jsonDict['who']
	User.objects.create(User_Name=a,User_Password=p,User_Identification=i,User_Email=m)
	
	if User.objects.filter(User_Name=a,User_Password=p,User_Identification=i,User_Email=m):
		return True
	_Change_Err_Msg('SERVER DATABASE ERROR')
	return False