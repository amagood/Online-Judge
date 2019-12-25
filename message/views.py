from django.shortcuts import render
import json
from django.http import JsonResponse
from DataBase.models import Chat

def send_mes(request):
    mes_json = json.loads(request.body.decode('utf-8'))
    if mes_json["content"] == "" :
        return 0
    send_json = {
        "userName": "Ian",  #mes_json["userName"]
        "Class": "CSIE110", #mes_json["Class"]
        "date": mes_json["date"],
        "time": mes_json["time"],
        "content": mes_json["content"],
        "hash": mes_json["hash"]
    }
    mes=Chat(Chat_Message=mes_json["content"])
    mes.save()
    return send_json

def show_mes(request):
    mes_json = json.loads(request.body.decode('utf-8'))
    send_json = {
        "message": [
        ],
        "hash": mes_json["hash"]
    }
    for chat in Chat.objects.all() :
        send_json["message"].append({"userName": "Ian", "date": "20191015", "time": "1159", "content": chat.Chat_Message})
    return send_json

def select_cl(request):
    mes_json = json.loads(request.body.decode('utf-8'))
    send_json = {
        "userName": mes_json["userName"],
        "Classes":
            [
                {"Class": "CSIE110"},
                {"Class": "CSIE111"},
                {"Class": "LOL201"},
            ],
        "hash": mes_json["hash"]
    }
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
