import os
import json

def RunCode(id, language):
    with open("config.json") as file:
        config = json.load(file)
    containerId = config["containerId"]
    os.system("docker cp ./" + id + " " + containerId + ":/")
    os.system("docker exec " + containerId + " bash ./runCode.sh " + id + " " + language)
    os.system("docker cp " + containerId + ":/" + id + "/output.txt " + "./" + id)
    os.system("docker exec " + containerId + " rm -r ./" + id)
    return 0