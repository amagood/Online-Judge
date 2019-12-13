import requests

while True:
	try:
		pass_data_a = {
			'action':'register',
			'account':'TestCase01',
			'password':'TestPassword01',
			'who':'teacher',
			'email':'Test01@mail.com'
		}
		r = requests.post('http://127.0.0.1:8000/register-test/',json = pass_data_a)

		print(r)
		print(r.json())
		input()
	except:
		print('server error')