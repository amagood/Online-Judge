from django.shortcuts import render

from django.http import HttpResponse
from DataBase.models import Question
import QuestionLibrary.GetQuestion
import QuestionLibrary.CreateQuestion
import hashlib
import time
import json

def responseGetQuestion(request):
    if request.method == "POST":
        req=json.loads(request.body.decode('utf-8'))
        qLib=QuestionLibrary.GetQuestion.responseGetQuestion(req['questionNum'],req['questionPage'],req['questionSequence'],req['questionTarget'],req['questionDegree'],req['selectClass'],req['sortDesc'])
        data={
            "questionLib" : qLib,
            "userName" : req['userName'],
            "Class" : req['selectClass'],
            "hash" : req['hash'],
        }
        return HttpResponse(json.dumps(data))
    return render(request,'QuestionData/studentProblem.html',{})

def responseCreateQuestion(request):
    if request.method == "POST":
        req=json.loads(request.body.decode('utf-8'))
        submitStats=QuestionLibrary.CreateQuestion.responseCreateQuestion(req['questionName'],req['PDF'],req['questionContent'],req['language'],req['sampleProgram'],req['exampleInput'],req['exampleOutput'],req['input'],req['output'],req['tag'],req['difficulty'])
        data={
            "submitStats" : submitStats,
            "userName" : req['userName'],
            "Class" : req['Class'],
            "hash" : req['hash'],
        }
        return HttpResponse(json.dumps(data))
    return render(request,'QuestionData/createQuestion.html',{})

def problemDetail(request,num=1):
    purl='QuestionData/p{:05d}/p{:05d}.html'.format(num,num)
    return render(request,purl,{})

def teacherProblem(request):
    return render(request,'QuestionData/teacherProblem.html',{})

'''
def studentProblem(request):
    return render(request,'QuestionData/studentProblem.html',{})
'''
