from django.shortcuts import render

# Create your views here.

'''
#TEST VIEW
from datetime import datetime
from django.shortcuts import render
def problem(request):
    return render(request, 'problem.html', {
        'current_time': str(datetime.now()),
    })
#END TEST VIEW
'''

from django.http import HttpResponse
from DataBase.models import Question
import QuestionLibrary.GetQuestion
import hashlib
import time
import json

def responseGetQuestion(request):
    if request.method == "POST":
        req=json.loads(request.body.decode('utf-8'))
        qLib=QuestionLibrary.GetQuestion.responseGetQuestion(req['questionNum'],req['questionPage'],req['questionSequence'],req['questionTarget'],req['questionDegree'],req['selectClass'])
        data={
            "questionLib" : qLib,
            "userName" : req['userName'],
            "Class" : req['selectClass'],
            "hash" : req['hash'],
        }
        return HttpResponse(json.dumps(data))
    return render(request,'problem.html',{})
