from django.shortcuts import render
import CodeRunner as cd
import os

# Create your views here.

def submit(request):
    x = ''
    id = "xd"
    if request.POST:
        language = request.POST['language']
        code = request.POST['code']
        input = request.POST['input']
        try:
            os.mkdir(id)
            print("Directory " , id,  " Created ") 
        except FileExistsError:
            print("Directory " , id,  " already exists")
        if language == "c":
            wptr = open("./" + id + "/code.c", "w")
            wptr.write(code)
            wptr.close()
        elif language == "c++":
            wptr = open("./" + id + "/code.cpp", "w")
            wptr.write(code)
            wptr.close()
        elif language == "python":
            wptr = open("./" + id + "/code.py", "w")
            wptr.write(code)
            wptr.close()
        wptr = open("./" + id + "/input.txt", "w")
        wptr.write(input)
        wptr.close()
        cd.RunCode(id, language)
        rptr = open("./" + id + "/output.txt", "r")
        x = rptr.read()
        rptr.close()
    return render(request, "judge.html", {'x': x})