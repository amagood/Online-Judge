
from Question_Library.models import  Question
import hashlib
import time
import json


def responseGetQuestion(questionNum,questionPage,userIdentity,questionSequence,questionTarget,questionDegree,selectClass):
    questionList=Question.objects.all()
    retQuesData=[]
    for eachQues in questionList:
        Qdata = {
            "tltle":eachQues.Question_Name,  
            "target":"loop",
            "degree":"easy",
            "percentagePassing":"50%",
            "respondent":"100",
            "inputTime":"20191111",
        }
        retQuesData.append(json.dumps(Qdata))
    data={
        "questionLib" : retQuesData,
        "userName" : "amagood",
        "hash" : "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9",
    }
    return json.dumps(data)
