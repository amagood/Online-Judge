import requests

while True:
	try:
		pass_data_a = {
			'action':'register',
			'account':input('account...>'),
			'password':input('password...>'),
			'who':input('who...>'),
			'email':input('email...>')
		}
		r = requests.post('http://127.0.0.1:8000/register-test/',json = pass_data_a)

		print(r)
		print(r.json())
		input()
	except:
		print('server error')