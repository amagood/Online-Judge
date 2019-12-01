from django.shortcuts import render

# Create your views here.
from datetime import datetime
def hello_world(request):
    return render(request, 'hello_world.html', {
        'current_time': str(datetime.now()),
    })

from django.http import HttpResponse
from Question_Library.models import  Question
import Question_Library.GetQuestion
import hashlib
import time
import json

def responseGetQuestion(request):
    if request.method == "POST":
        req=json.loads(request.body)
        data=Question_Library.GetQuestion.responseGetQuestion(req['questionNum'],req['questionPage'],req['userIdentity'],req['questionSequence'],req['questionTarget'],req['questionDegree'],req['selectClass'])
    return HttpResponse(data)
