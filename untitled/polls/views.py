from django.http import Http404
from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from .models import Question
from django.http import JsonResponse
import os.path



def results(request, question_id):
    response = "You're looking at the results of question %s."
    return HttpResponse(response % question_id)

def vote(request, question_id):
    return HttpResponse("You're voting on question %s." % question_id)


def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    context = {'latest_question_list': latest_question_list}
    return render(request, 'polls/index.html', context)

def detail(request, question_id):
    try:
        question = Question.objects.get(pk=question_id)
    except Question.DoesNotExist:
        raise Http404("Question does not exist")
    return render(request, 'polls/detail.html', {'question': question})

def get_code_string(request):
    return render(request, 'polls/problem/p000.html', {})




def submit_status(request):

    write_file_from_request(request)

    data = {
        "codeStats":"CE",
        "errorMessage":"HelloHelloHelloHelloHelloHelloHelloHello",
        "exeTime":"99999ms",
        "errorOutputCompare":"size",
        "wrongOutput":"your output",
        "hash":"A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
    }
    return JsonResponse(data)



def write_file_from_request(request):
    if request.method == "POST":
        code_json = request.body

        code_json = str(code_json , encoding = "utf-8")
        for i in range (len(code_json)):

            if(code_json[i] == "f" and code_json[i+1] == "i" and code_json[i+2] == "l" and code_json[i+3] == "e"):

                for file_num in range(10):

                    for k in range(20):

                        if(code_json[i+k] == "f" and code_json[i+k+1] == "i" and code_json[i+k+2] == "l" and code_json[i+k+3] == "e" and code_json[i+k+4] == str(file_num)):
                            #print("this is file num"+str(file_num))
                            count = 0
                            file_continue = False
                            save_path = "/home/steven/CodeRunner/"
                            file_name = "file" + str(file_num) + ".cpp"
                            real_file_name = os.path.join(save_path , file_name)
                            fp = open(real_file_name, "w")
                            while True:
                                code_num = i+k+8
                                #print(code_json[i+k+8+count])

                                if(code_json[i+k+8+count] == "\\" and code_json[i+k+9+count] == "n"):
                                    fp.write("\n")
                                    count += 1
                                elif(code_json[i + k + 8 + count] == "\\" and code_json[i + k + 9 + count] == "\""):
                                    fp.write("\"")
                                    count += 1
                                else:
                                    fp.write(code_json[i+k+8+count])


                                count += 1
                                if(code_json[i+k+8+count] == "\"" and code_json[i+k+9+count] == ","
                                        and code_json[i+k+10+count] == "\"" and code_json[i+k+11+count] == "f"
                                        and code_json[i+k+12+count] == "i" and code_json[i+k+13+count] == "l"
                                        and code_json[i+k+14+count] == "e" and code_json[i+k+15+count] == str(file_num+1)):
                                    file_continue = True
                                    break
                                if (code_json[i + k + 8 + count] == "\"" and code_json[i + k + 9 + count] == "}"
                                        and code_json[i + k + 10 + count] == "," and code_json[i + k + 11 + count] == "\""
                                        and code_json[i + k + 12 + count] == "h" and code_json[i + k + 13 + count] == "a"
                                        and code_json[i + k + 14 + count] == "s" and code_json[i + k + 15 + count] == "h"
                                        and code_json[i + k + 16 + count] == "\""):
                                    fp.close()
                                    break


                            #if(file_continue)
                break


# Create your views here.
