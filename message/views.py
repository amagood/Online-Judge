from django.shortcuts import render
import json
from django.http import JsonResponse
from DataBase.models import Chat
from DataBase.models import User
from DataBase.models import Group

def send_mes(request):
    mes_json = json.loads(request.body.decode('utf-8'))
    send_json = {
        "userName": mes_json["userName"],
        "Class": mes_json["Class"],
        "date": mes_json["date"],
        "time": mes_json["time"],
        "content": mes_json["content"],
        "hash": mes_json["hash"]
    }
    grp=Group.objects.filter(Group_Name=mes_json["Class"])[0]
    us=User.objects.filter(User_Name=mes_json["userName"])[0]
    mes=Chat(Chat_Group=grp, Chat_Message=mes_json["content"], Chat_User=us, Chat_Date_Str=mes_json["date"], Chat_Time_Str=mes_json["time"])
    mes.save()
    return send_json

def show_mes(request):
    mes_json = json.loads(request.body.decode('utf-8'))
    send_json = {
        "message": [
        ],
        "hash": mes_json["hash"]
    }
    for chat in Chat.objects.filter(Chat_Group__Group_Name=mes_json["Class"]).all() :
        send_json["message"].append({"userName": chat.Chat_User.User_Name, "date": chat.Chat_Date_Str, "time": chat.Chat_Time_Str, "content": chat.Chat_Message})
    return send_json

def select_cl(request):
    mes_json = json.loads(request.body.decode('utf-8'))
    send_json={
        "userName": mes_json["userName"],
        "Classes": [
        ],
        "hash": mes_json["hash"]
    }
    fuser=User.objects.get(User_Name = mes_json["userName"])
    for group in fuser.Group.all() :
        send_json["Classes"].append({"Class" : group.Group_Name})
    return send_json

def message(request):
    if request.method == "POST":
        mes_json = json.loads(request.body.decode('utf-8'))
        if (mes_json["action"] == "send_message"):
            send_js=send_mes(request)
        if (mes_json["action"] == "show_message"):
            send_js=show_mes(request)
        if(mes_json["action"]=="selectClass"):
            send_js=select_cl(request)

        return JsonResponse(send_js)

    return render(request, 'message/comments.html')
