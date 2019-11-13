import os
import json

def RunCode(id, language):
    with open("config.json") as file:
        config = json.load(file)
    containerId = config["containerId"]
    code = id + "_code"
    input = id + "_input"
    output = id + "_output"
    if language == "c":
        code += ".c"
    elif language == "c++":
        code += ".cpp"
    elif language == "python":
        code += ".py"
    else:
        return 0
    os.system("docker cp ./" + code + " " + containerId + ":/")
    os.system("docker cp ./" + input + " " + containerId + ":/")
    os.system("docker exec " + containerId + " bash -c \"./runCode.sh " \
    + id + " " + language + "\"")
    os.system("docker cp " + containerId + ":/" + output + " ./")
    return 0