from django.test import TestCase
from django.test.client import Client
# Create your tests here.
import requests,json


c = Client()
response = c.post('/account/', {"action" : "login","account" : "amagood","password" : "123456789"})
response.status_code
200
