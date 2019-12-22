from django.test import TestCase
import requests
import json

data={
    "questionNum" : "a001",
    "action" : "rank",
    "userName" : "amagood",
    "hash" : "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
}
r = requests.post('http://127.0.0.1:8000/Rank/', data=json.dumps(data))

print(r.text)

# Create your tests here.

