import json

from django.test import TestCase

from . import Register_View
# Create your tests here.

class TestRegister(TestCase):
	
	def test_ResponseRegisterStaus(self):
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
		
		true = {'stats':'success'}
		false = {'stats':'error'}
		#happy case
		self.assertEqual(Register_View.ResponseRegisterStatus(pass_data_a), true)
		self.assertEqual(Register_View.ResponseRegisterStatus(pass_data_b), true)
		self.assertEqual(Register_View.ResponseRegisterStatus(pass_data_c), true)
		#sad case
		self.assertEqual(Register_View.ResponseRegisterStatus(special_chr_data_a), false)
		self.assertEqual(Register_View.ResponseRegisterStatus(special_chr_data_b), false)
		self.assertEqual(Register_View.ResponseRegisterStatus(special_chr_data_c), false)
		self.assertEqual(Register_View.ResponseRegisterStatus(idtf_does_not_exsist_data), false)
		self.assertEqual(Register_View.ResponseRegisterStatus(mail_err_data), false)
		#bad case
		self.assertEqual(Register_View.ResponseRegisterStatus(post_action_err), false)
		self.assertEqual(Register_View.ResponseRegisterStatus(err_data_a), false)
		self.assertEqual(Register_View.ResponseRegisterStatus(err_data_b), false)
		self.assertEqual(Register_View.ResponseRegisterStatus(err_data_c), false)
