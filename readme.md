README

Function Description

Register.py:
	AddAccount:
		check data and add account
	CheckAccountData:
		check Post data
			->if register action
			->if account is legal input
			->if password is legal input
			->if identify is correct enum input
			->if email is correct format
			->if data has been regist
Register_View.py:
	ResponseRegisterStatus:
		POST request:
			return the status of regist request
		other request:
			return the html page
			->Remember to change 'page_route' in Register_View.py, if you want to render web page.