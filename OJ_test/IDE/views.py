from django.shortcuts import render
from django.http import JsonResponse
import os.path
import json
from Rank.Summit_database_operation import DataBase_Operation




def get_code_string(request):
    return render(request, 'IDE/problem/p000.html', {})



def RunCode(id, language):
    if(language == "cpp"):
        language = "c++"
    os.system("sudo docker run -dit --rm -v /home/steven/" + id + ":/" + id + " --name " + "CodeRunner" + " makefile_test")
    os.system("sudo docker exec " + "CodeRunner" + " chmod +x run.sh")
    os.system("sudo docker exec " + "CodeRunner" + " ./run.sh " + id + " " + language)
    os.system("sudo docker stop " + "CodeRunner" )




def submit_status(request):

    write_file_from_request(request)

    code_json = request.body
    code_json = str(code_json, encoding="utf-8")
    test_json = json.loads(request.body)

    #mkfile
    """
    if(test_json['fileAmount'] == 2 and test_json['language'] != "python"):
        make_file_fp = open("/home/steven/CodeRunner/01/makefile", "w")
        mk2fp = open("/home/steven/CodeRunner/01/mk2", "r")
        tmpstr = str(mk2fp.read())
        if(test_json['language'] == "cpp"):
            tmpstr=tmpstr.replace(".c",".cpp")
            tmpstr = tmpstr.replace("gcc", "g++")
        print(tmpstr,file=make_file_fp)
        make_file_fp.close()
        mk2fp.close()
    elif (test_json['fileAmount'] == 3 and test_json['language'] != "python"):
        make_file_fp = open("/home/steven/CodeRunner/01/makefile", "w")
        mk3fp = open("/home/steven/CodeRunner/01/mk3", "r")
        tmpstr = str(mk3fp.read())
        if (test_json['language'] == "cpp"):
            tmpstr=tmpstr.replace(".c", ".cpp")
            tmpstr = tmpstr.replace("gcc", "g++")
        print(tmpstr, file=make_file_fp)
        make_file_fp.close()
        mk3fp.close()
    elif (test_json['fileAmount'] == 1 and test_json['language'] != "python"):
        make_file_fp = open("/home/steven/CodeRunner/01/makefile", "w")
        mk1fp = open("/home/steven/CodeRunner/01/mk1", "r")
        tmpstr = str(mk1fp.read())
        if (test_json['language'] == "cpp"):
            tmpstr=tmpstr.replace(".c", ".cpp")
            tmpstr = tmpstr.replace("gcc", "g++")
        print(tmpstr, file=make_file_fp)
        make_file_fp.close()
        mk1fp.close()
    #mkfile
    """
    if(test_json['language'] != "python"):
        make_file_fp = open("/home/steven/CodeRunner/01/makefile", "w")
        make_file_fp.write("a.out: ")
        if (test_json['language'] == "cpp"):
            compiler = "g++"
            subname = "cpp"
        elif (test_json['language'] == "c"):
            compiler = "gcc"
            subname = "c"
        for i in range(test_json['fileAmount']):
            if(i == 0):
                make_file_fp.write("code.o ")
            else:
                make_file_fp.write("code{}.o ".format(i+1))
            if(i == test_json['fileAmount'] - 1 ):
                make_file_fp.write("\n\t")
        for i in range(test_json['fileAmount']):
            if (i == 0):
                make_file_fp.write("{} -o a.out code.o ".format(compiler))
            else:
                make_file_fp.write("code{}.o ".format(i+1))
            if (i == test_json['fileAmount'] - 1):
                make_file_fp.write("\n")
        for i in range(test_json['fileAmount'],0,-1):
            if(i == 1):
                make_file_fp.write("code.o: ")
                for k in range(test_json['fileAmount']):
                    if(k == 0):
                        make_file_fp.write("code.{} ".format(subname))
                    else:
                        make_file_fp.write("code{}.o ".format(k+1))
                make_file_fp.write("\n\t{compiler} -c code.{subname} -O2".format(compiler=compiler, subname=subname))
            else:
                make_file_fp.write("code{0}.o: code{1}.{2} code{3}.h\n\t{4} -c code{5}.{6} -O2\n".format(str(i), str(i), subname, str(i), compiler, str(i), subname))
        make_file_fp.close()





    RunCode("CodeRunner/01", str(test_json['language']))
    print(str(test_json['language']))
    save_path = "/home/steven/CodeRunner/01"
    file_name = "output.txt"
    real_file_name = os.path.join(save_path, file_name)

    fp = open(real_file_name,"r")
    output_message = fp.read()
    code_stats = ""
    exe_time = "0ms"
    fp.close()

    answer = open("/home/steven/CodeRunner/01/answer.txt", "r")
    answer_str = answer.read()
    answer.close()
    mem_used = 0

    state_fp = open("/home/steven/CodeRunner/01/mem_output.txt", "r")
    state_str = state_fp.read()
    state_fp.close()



    if(state_str[0] == 'T' and state_str[1] == 'L' and state_str[2] == 'E'):
        code_stats = "TLE"
        mem_fp = open("/home/steven/CodeRunner/01/mem_output.txt", "r")
        mem_fp.readline()
        exe_time = mem_fp.readline()
        mem_fp.close()
    elif(state_str[0] == 'M' and state_str[1] == 'L' and state_str[2] == 'E'):
        code_stats = "MLE"
        mem_fp = open("/home/steven/CodeRunner/01/mem_output.txt", "r")
        mem_fp.readline()
        mem_used = mem_fp.readline()
        mem_fp.close()
    elif(len(output_message) == 0):
        code_stats = "WA"
        exe_time = 0
    elif(output_message[0] == '@' and output_message[1] == '@' and output_message[2] == 'C' and output_message[3] == 'E' and output_message[4] == '@' and output_message[5] == '@'):
        code_stats = "CE"
        output_message = output_message.replace("@@CE@@", "" , 1)
        output_message = output_message.replace("File \"./CodeRunner/01/code.py\", ", "", 1)
    elif(answer_str == output_message):
        code_stats = "AC"
        mem_fp = open("/home/steven/CodeRunner/01/mem_output.txt", "r")
        exe_time = mem_fp.readline()
        tmp_time = exe_time.replace("runtime: ","")
        tmp_time = tmp_time.replace("ms\n", "")
        if(float(tmp_time) > 10000):
            code_stats = "TLE"
        mem_used = mem_fp.readline()
        tmp_mem = mem_used.replace("memory used: ","")
        tmp_mem = tmp_mem.replace("kB\n", "")
        print(int(tmp_mem))
        if(float(tmp_mem) > 10000000):
            code_stats = "MLE"
        mem_fp.close()
    else:
        code_stats = "WA"
        exe_time = 0


    data = {
        "codeState":code_stats,
        "errorMessage":output_message,
        "exeTime":exe_time,
        "memoryUsage":mem_used,
        "errorOutputCompare":"size",
        "wrongOutput":output_message,
        "expectedOutput":str(answer_str),
        "hash":"A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
    }
    if(exe_time != 0):
        exe_time = exe_time.replace("runtime: ","")
        exe_time = exe_time.replace(" ms\n","")
    DataBase_Operation("p000", str(test_json['userName']) , code_stats , int(exe_time))
    return JsonResponse(data)



def write_file_from_request(request):
    if request.method == "POST":
        code_json = request.body
        code_json = str(code_json , encoding = "utf-8")


        test_json = json.loads(request.body)
        for i in range(test_json['fileAmount']):
            print(test_json['language'])
            print(test_json['file']['file'+ str(i+1)])

            save_path = "/home/steven/CodeRunner/01" #+ str(i+1)

            if(str(test_json['language']) == 'python'):
                tmp_file_name = 'py'
            else:
                tmp_file_name = str(test_json['language'])

            if(i == 0):
                file_name = "code." + tmp_file_name
            else:
                file_name = "code" + str(i+1) + "." + tmp_file_name

            real_file_name = os.path.join(save_path, file_name)
            fp = open(real_file_name, "w")
            print(test_json['file']['file'+ str(i+1)], file=fp)
            fp.close()

        for i in range(test_json['headerFileAmount']):
            print(test_json['language'])
            print(test_json['headerFile']['file'+ str(i+1)])

            save_path = "/home/steven/CodeRunner/01" #+ str(i+1)


            tmp_file_name = "h"

            if(i == 0):
                file_name = "code2." + tmp_file_name
            else:
                file_name = "code" + str(i+2) + "." + tmp_file_name

            real_file_name = os.path.join(save_path, file_name)
            fp = open(real_file_name, "w")
            print(test_json['headerFile']['file'+ str(i+1)], file=fp)
            fp.close()




# Create your views here.
