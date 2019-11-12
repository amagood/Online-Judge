import json

from django.test import TestCase

from . import Register
# Create your tests here.

class TestRegister(TestCase):

	def test_Is_Legal_Data(self):
		pass_data_a = {
			'account':'TestCase01',
			'password':'TestPassword01',
			'who':'teacher',
			'email':'Test01@mail.com'
		}
		pass_data_b = {
			'account':'12345678',
			'password':'abcdefgh',
			'who':'student',
			'email':'ABC@mail.com'
		}
		pass_data_c = {
			'account':'AAAAAAAAAAAAAAAAAAAA',
			'password':'aaaaaaaaaaaaaaaaaaaa',
			'who':'teacher',
			'email':'00000000000000000000@.'
		}
		
		special_chr_data_a = {
			'account':'~!@#$%^&*()"\'aA0',
			'password':'TestPassword',
			'who':'teacher',
			'email':'Test@mail.com'
		}
		special_chr_data_b = {
			'account':'TestCase',
			'password':'~!@#$%^&*()"\'bB1',
			'who':'teacher',
			'email':'Test@mail.com'
		}
		special_chr_data_c = {
			'account':'TestCase',
			'password':'TestPassword',
			'who':'teacher',
			'email':'#$^^!@#~$%^&*()"\'c'
		}
		idtf_does_not_exsist_data = {
			'account':'TestCase',
			'password':'TestPassword',
			'who':'father',
			'email':'Test@mail.com'
		}
		mail_err_data = {
			'account':'TestCase',
			'password':'TestPassword',
			'who':'teacher',
			'email':'string'
		}
		
		err_data_a = '123456'
		err_data_b = 1024
		err_data_c = {
			'stupid':'input'
		}
		#happy case
		self.assertIs(Register.Is_Legal_Data(json.dumps(pass_data_a))['status'],True)
		self.assertIs(Register.Is_Legal_Data(json.dumps(pass_data_b))['status'],True)
		self.assertIs(Register.Is_Legal_Data(json.dumps(pass_data_c))['status'],True)
		#sad case
		self.assertIs(Register.Is_Legal_Data(json.dumps(special_chr_data_a))['status'],False)
		self.assertEqual(Register.Is_Legal_Data(json.dumps(special_chr_data_a))['errMsg'],'Account error input')
		
		self.assertIs(Register.Is_Legal_Data(json.dumps(special_chr_data_b))['status'],False)
		self.assertEqual(Register.Is_Legal_Data(json.dumps(special_chr_data_b))['errMsg'],'Password error input')
		
		self.assertIs(Register.Is_Legal_Data(json.dumps(special_chr_data_c))['status'],False)
		self.assertEqual(Register.Is_Legal_Data(json.dumps(special_chr_data_c))['errMsg'],'Email error input')
		
		self.assertIs(Register.Is_Legal_Data(json.dumps(idtf_does_not_exsist_data))['status'],False)
		self.assertEqual(Register.Is_Legal_Data(json.dumps(idtf_does_not_exsist_data))['errMsg'],'Identity error')
		
		self.assertIs(Register.Is_Legal_Data(json.dumps(mail_err_data))['status'],False)
		self.assertEqual(Register.Is_Legal_Data(json.dumps(mail_err_data))['errMsg'],'Email error input')
		#bad case
		self.assertIs(Register.Is_Legal_Data(json.dumps(err_data_a))['status'],False)
		self.assertEqual(Register.Is_Legal_Data(json.dumps(err_data_a))['errMsg'],'Json pack fromat error')
		
		self.assertIs(Register.Is_Legal_Data(json.dumps(err_data_b))['status'],False)
		self.assertEqual(Register.Is_Legal_Data(json.dumps(err_data_b))['errMsg'],'Json pack fromat error')
		
		self.assertIs(Register.Is_Legal_Data(json.dumps(err_data_c))['status'],False)
		self.assertEqual(Register.Is_Legal_Data(json.dumps(err_data_c))['errMsg'],'Json pack fromat error')
	