from django.shortcuts import render
from django.http import HttpResponse
from DataBase.models import Question, User
from DataBase.models import Summary, Rank
import hashlib
import json

''' for rank list '''

def Single_Rank(Current_Rank):
    Current_User = Current_Rank.Rank_User.User_Name
    Current_Rank_No = Current_Rank.Rank_Order
    Current_Question = Current_Rank.Rank_Question.Question_Name
    Current_Summary = Summary.objects.get(Summary_Question__Question_Name = Current_Question, Summary_User__User_Name = Current_User)
    Current_AcTime = Current_Summary.Summary_AC_Count
    Current_CommitTime = Current_Summary.Summary_Count
    Rank_Single_Json = {
            "name" : Current_User,
            "ACTimes" : Current_AcTime,
            "CommitTimes" : Current_CommitTime,
            "rank" : Current_Rank_No
        }
    return Rank_Single_Json

def Rank_json(Request_Question, UserName, UserHash):
    search_Question = Question.objects.get(Question_ID = Request_Question)
    Question_Rank = search_Question.Rank.order_by('Rank_Order').all()
    Return_Data = {}
    tmp = []
    
    for i in range(100 if len(Question_Rank) > 100 else len(Question_Rank)):
        tmp.append(Single_Rank(Question_Rank[i]))
    '''for i in range(100 if len()):
        tmp.append(Single_Rank(i))'''
    Return_Data['userData'] = tmp
    Return_Data['userName'] = UserName
    Return_Data['hash'] = UserHash
    #data = json.dumps(Return_data)
    return Return_Data

''' for rank attent '''

def Rank_Attend_json(Request_Question, if_attend, UserName, UserHash):
    User_Summary = Summary.objects.filter(Summary_Question__Question_ID = Request_Question, Summary_User__User_Name = UserName)
    Return_Data = {}
    Return_Data['userName'] = UserName
    Return_Data['hash'] = UserHash
    if len(User_Summary) != 0:
        if if_attend == 'attend':
            User_Summary.update(Summary_Attend = True)
        else:
            User_Summary.update(Summary_Attend = False)
        Rank.objects.filter(Rank_Question__Question_ID = Request_Question).delete()
        New_Rank = Summary.objects.filter(Summary_Question__Question_ID = Request_Question, Summary_Attend = True).order_by('Summary_AC_Count').reverse()[:100:]
        print(New_Rank)
        for i in range(len(New_Rank)):
            Rank(Rank_Question = New_Rank[i].Summary_Question, Rank_User = New_Rank[i].Summary_User, Rank_Order = i).save()
        Return_Data['status'] = 'success'
        return Return_Data
    Return_Data['status'] = 'fail'
    return Return_Data

def RankRequest(request):
    if request.method == "POST":
        req = json.loads(request.body.decode('utf-8'))
        print(req)
        if req['action'] == 'rank':
            data = Rank_json(req['questionNum'], req['userName'], req['hash'])
        elif req['action'] == 'attend_rank':
            data = Rank_Attend_json(req['questionNum'], req['attendStatus'], req['userName'], req['hash'])
        print(data)
        
        data = json.dumps(data)
    #return render(data,'ranking.html',{})
        return HttpResponse(data)
    return render(request,'ranking.html',{})
# return HttpResponse()


