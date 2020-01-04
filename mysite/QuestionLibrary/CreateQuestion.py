from DataBase.models import Question,Category
import hashlib
import time
import json
from QuestionLibrary.QuestionHTML import Question_Library

def responseCreateQuestion(questionName,PDF,questionContent,language,sampleMain,sampleFile,sampleHeader,sampleFillIn,exampleInput,exampleOutput,qinput,qoutput,tag,difficulty):
    try:
        newQuestionID='p{:05d}'.format(Question.objects.all().count()+1)
        newQuestion=Question()#create to db
        newQuestion.Question_ID=newQuestionID
        newQuestion.Question_Name=questionName
        newQuestion.Question_difficulty=difficulty
        tags=tag.split()
        newQuestion.save()
        for eachtag in tags:
            try:
                c=Category.objects.get(Category_Name=eachtag)#please init database first
                newQuestion.Question_Category.add(c)
            except:
                pass
        newHTML=Question_Library(newQuestionID)#create html
        FileNameExtention='c'
        if language=='cpp':
            FileNameExtention='cpp'
        if language=='python':
            FileNameExtention='py'
        newHTML.addQuestion(questionName,tags,questionContent,exampleInput,exampleOutput,sampleMain,sampleFile,sampleHeader,sampleFillIn,FileNameExtention,PDF,qinput,qoutput)
        return 'success'
    except:
        return 'error'

def responseVerifyStats(language,sampleMain,sampleFile,sampleHeader,sampleFillIn,tdInput,tdOutput):
    try:
        return 'verified'
    except:
        return 'wrong'
