from DataBase.models import Question
import hashlib
import time
import json
import datetime

def responseGetQuestion(questionNum,questionPage,questionSequence,questionTarget,questionDegree,selectClass,sortDesc):
    questionList=Question.objects.all()
    if questionTarget!='tag':
        questionList=questionList.filter(Question_Category__Category_Name=questionTarget)
    if questionDegree!='degree':
        questionList=questionList.filter(Question_difficulty__exact=questionDegree)
    retQuesData=[]
    #print('retQuesData')#Debug
    for eachQues in questionList:
        #print('in for loop')#Debug
        passrate='0.00%'
        if eachQues.Question_Summit_Time!=0:
            passrate='{:.2%}'.format(eachQues.Question_AC_Count/eachQues.Question_Summit_Time)
        targetlist=[str(e) for e in eachQues.Question_Category.all()]
        targets=' '.join(targetlist)
        Qdata = {
            "id":eachQues.Question_ID,
            "title":eachQues.Question_Name,
            "target":targets,
            "degree":eachQues.Question_difficulty,
            "percentagePassing":passrate,
            "respondent":eachQues.Question_Summit_Time,
            "inputTime":eachQues.Question_Create_Time.strftime("%Y%m%d"),
            "link":'/problem/{}.html'.format(eachQues.Question_ID),
        }
        retQuesData.append(Qdata)
    resv=False
    if sortDesc=='true':
        resv=True
    #print(questionSequence)
    if questionSequence=='':
        questionSequence='title'
    retQuesData = sorted(retQuesData, key=lambda k: k[questionSequence], reverse=resv)
    '''qpage=int(questionPage) # return all
    qnum=int(questionNum)
    qlistlen=len(retQuesData)
    if qlistlen<qnum*(qpage-1) or qpage<=0:
        retQuesData=[]
    elif qlistlen<qnum*(qpage):
        retQuesData=retQuesData[qnum*(qpage-1):]
    else:
        retQuesData=retQuesData[qnum*(qpage-1):qnum*(qpage)]'''
    return retQuesData
