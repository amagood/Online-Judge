from django.shortcuts import render
from django.http import HttpResponse
from DataBase.models import Question,Category
import QuestionLibrary.GetQuestion
import QuestionLibrary.CreateQuestion
import hashlib
import time
import json

def responseGetQuestion(request):
    if request.method == "POST":
        req=json.loads(request.body.decode('utf-8'))
        action=req['action']
        if action=='questionLib':
            qLib=QuestionLibrary.GetQuestion.responseGetQuestion(req['questionNum'],req['questionPage'],req['sequence'],req['target'],req['degree'],req['Class'],req['sortDesc'])
            data={
                "questionLib" : qLib,
                "userName" : req['userName'],
                "Class" : req['Class'],
                "hash" : req['hash'],
            }
            return HttpResponse(json.dumps(data))
        elif action=='getTagList':
            qLib=[]
            CList=Category.objects.all()
            counteachi=1
            for eachC in CList:
                if eachC.Category_Name!='null':
                    strkey='tag'
                    adict={strkey: eachC.Category_Name}
                    counteachi+=1
                    qLib.append(adict)
            data={
                "tagList" : qLib,
                "userName" : req['userName'],
                "Class" : req['Class'],
                "hash" : req['hash'],
            }
            return HttpResponse(json.dumps(data))
        else:
            data={
                "status" : "parse_error",
            }
            return HttpResponse(json.dumps(data))
    return render(request,'QuestionData/studentProblem.html',{})

def responseCreateQuestion(request):
    if request.method == "POST":
        req=json.loads(request.body.decode('utf-8'))
        action=req['action']
        if action=='createQ':
            submitStats=QuestionLibrary.CreateQuestion.responseCreateQuestion(req['questionName'],req['PDF'],req['questionContent'],req['language'],req['sampleMain'],req['sampleFile'],req['sampleHeader'],req['sampleFillIn'],req['exampleInput'],req['exampleOutput'],req['input'],req['output'],req['tag'],req['difficulty'])
            data={
                "submitStats" : submitStats,
                "userName" : req['userName'],
                "Class" : req['Class'],
                "hash" : req['hash'],
            }
            return HttpResponse(json.dumps(data))
        elif action=='verify_td':
            verifyStats=QuestionLibrary.CreateQuestion.responseVerifyStats(req['language'],req['sampleMain'],req['sampleFile'],req['sampleHeader'],req['sampleFillIn'],req['tdInput'],req['tdOutput'])
            data={
                "stats" : verifyStats,
                "userName" : req['userName'],
                "Class" : req['Class'],
                "hash" : req['hash'],
            }
            return HttpResponse(json.dumps(data))
        else:
            data={
                "status" : "parse_error",
            }
            return HttpResponse(json.dumps(data))
    return render(request,'QuestionData/createQuestion.html',{})

def problemDetail(request,num=1):
    purl='QuestionData/p{:05d}/p{:05d}.html'.format(num,num)
    return render(request,purl,{})

def pdfDetail(request,num=1):
    purl='QuestionData/p{:05d}/p{:05d}pdf.pdf'.format(num,num)
    return render(request,purl,{})

def teacherProblem(request):
    return render(request,'QuestionData/teacherProblem.html',{})

'''
def studentProblem(request):
    return render(request,'QuestionData/studentProblem.html',{})
'''
