README
 
How to use
1. add 'register' into INSTALLED_APPS which in settings.py
2. put html file in template/register/
3. put static files(js,css...) in static/
4. change page_route which in Register_View.py to link with html file


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