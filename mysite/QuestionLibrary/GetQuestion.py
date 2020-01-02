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
    if questionSequence=='id':
        if sortDesc=='true':
            questionList=questionList.order_by('-id')
        else:
            questionList=questionList.order_by('id')
    elif questionSequence=='tag':
        if sortDesc=='true':
            questionList=questionList.order_by('-tag')
        else:
            questionList=questionList.order_by('tag')
    elif questionSequence=='degree':
        if sortDesc=='true':
            questionList=questionList.order_by('-degree')
        else:
            questionList=questionList.order_by('degree')
    elif questionSequence=='percentagePassing':
        if sortDesc=='true':
            questionList=questionList.order_by('-percentagePassing')
        else:
            questionList=questionList.order_by('percentagePassing')
    elif questionSequence=='respondent':
        if sortDesc=='true':
            questionList=questionList.order_by('-respondent')
        else:
            questionList=questionList.order_by('respondent')
    elif questionSequence=='inputTime':
        if sortDesc=='true':
            questionList=questionList.order_by('-inputTime')
        else:
            questionList=questionList.order_by('inputTime')
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
            "link":'/QuestionLibrary/{}.html'.format(eachQues.Question_ID),
        }
        retQuesData.append(Qdata)
    return retQuesData
