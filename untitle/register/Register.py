import json
import re

def AddAccount(jsonPack):
	if CheckAccountData(jsonPack):
		if Record_Into_Database(jsonPack):
			return True

	return False

def CheckAccountData(jsonPack):
	if Is_Legal_Data(jsonPack)['status']:
		if not Is_account_collision(jsonPack):
			return True

	return False

def RsponseRegisterStatus(jsonPack):
	retPack = {'stats':'error'}
	if AddAccount(jsonPack):
		retPack['stats'] = 'success'
	
	return json.dumps(retPack)

def Is_Legal_Data(jsonPack):
	retDict = {
		'status':True,
		'errMsg':''
	}
	try:
		jsonDict = json.loads(jsonPack)
		if not re.search('^[a-zA-Z0-9]{8,20}$',jsonDict['account']):#check account #8~20 without spacial char
			retDict['status'] = False
			retDict['errMsg'] = 'Account error input'
		if not re.search('^[a-zA-Z0-9]{8,20}$',jsonDict['password']):#check password #8~20 without spacial char
			retDict['status'] = False
			retDict['errMsg'] = 'Password error input'
		if not re.search('^teacher$|^student$',jsonDict['who']):#check identify content
			retDict['status'] = False
			retDict['errMsg'] = 'Identity error'
		if not re.search('^[a-zA-Z0-9]{1,20}@[.a-zA-Z0-9]{1,20}$',jsonDict['email']):#check email format
			retDict['status'] = False
			retDict['errMsg'] = 'Email error input'
	except:
		retDict['status'] = False
		retDict['errMsg'] = 'Json pack fromat error'
	return retDict

def Is_account_collision(jsonPack):
	return False

def Record_Into_Database(jsonPack):
	return True