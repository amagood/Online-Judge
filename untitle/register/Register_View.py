from . import Register

def ResponseRegisterStatus(jsonPost):
	retDict = {'stats':'error'}
	if Register.AddAccount(jsonPost):
		retDict['stats'] = 'success'
	return retDict