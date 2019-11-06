import os

def RunCode(language):
    if language == "c":
        os.system("docker cp ./input.c 6b:/")
    elif language == "c++":
        os.system("docker cp ./input.cpp 6b:/")
    elif language == "python":
        os.system("docker cp ./input.py 6b:/")
    os.system("docker exec 6b bash -c \"./compile.sh " + language + "\"")
    os.system("docker cp 6b:/output.txt ./")
    return 0