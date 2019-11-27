import json
import unittest

from django.test import TestCase

import Register
# Create your tests here.

class Test_on_Register(unittest.TestCase):
	
	def test_CheckAccountData(self):
		pass_data_a = {
			'action':'register',
			'account':'TestCase01',
			'password':'TestPassword01',
			'who':'teacher',
			'email':'Test01@mail.com'
		}
		pass_data_b = {
			'action':'register',
			'account':'12345678',
			'password':'abcdefgh',
			'who':'student',
			'email':'ABC@mail.com'
		}
		pass_data_c = {
			'action':'register',
			'account':'AAAAAAAAAAAAAAAAAAAA',
			'password':'aaaaaaaaaaaaaaaaaaaa',
			'who':'teacher',
			'email':'00000000000000000000@.'
		}
		
		special_chr_data_a = {
			'action':'register',
			'account':'~!@#$%^&*()"\'aA0',
			'password':'TestPassword',
			'who':'teacher',
			'email':'Test@mail.com'
		}
		special_chr_data_b = {
			'action':'register',
			'account':'TestCase',
			'password':'~!@#$%^&*()"\'bB1',
			'who':'teacher',
			'email':'Test@mail.com'
		}
		special_chr_data_c = {
			'action':'register',
			'account':'TestCase',
			'password':'TestPassword',
			'who':'teacher',
			'email':'#$^^!@#~$%^&*()"\'c'
		}
		idtf_does_not_exsist_data = {
			'action':'register',
			'account':'TestCase',
			'password':'TestPassword',
			'who':'father',
			'email':'Test@mail.com'
		}
		mail_err_data = {
			'action':'register',
			'account':'TestCase',
			'password':'TestPassword',
			'who':'teacher',
			'email':'string'
		}
		
		post_action_err = {
			"action" : "login",
			"account" : "amagood",
			"password" : "123456789"

		}
		err_data_a = '123456'
		err_data_b = 1024
		err_data_c = {
			'stupid':'input'
		}
		#happy case
		self.assertIs(Register.CheckAccountData(pass_data_a), True)
		self.assertIs(Register.CheckAccountData(pass_data_b), True)
		self.assertIs(Register.CheckAccountData(pass_data_c), True)
		#sad case
		self.assertIs(Register.CheckAccountData(special_chr_data_a), False)
		self.assertIs(Register.CheckAccountData(special_chr_data_b), False)
		self.assertIs(Register.CheckAccountData(special_chr_data_c), False)
		self.assertIs(Register.CheckAccountData(idtf_does_not_exsist_data), False)
		self.assertIs(Register.CheckAccountData(mail_err_data), False)
		#bad case
		self.assertIs(Register.CheckAccountData(post_action_err), False)
		self.assertIs(Register.CheckAccountData(err_data_a), False)
		self.assertIs(Register.CheckAccountData(err_data_b), False)
		self.assertIs(Register.CheckAccountData(err_data_c), False)

if __name__ == '__main__':
	unittest.main()