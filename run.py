import os

def RunCode(id, language):
    os.system("docker run -dit --rm -v /home/barry/" + id + ":/" + id + " --name " + id + " green2")
    os.system("docker exec " + id + " bash home/run.sh " + id + " " + language)
    os.system("docker stop " + id )
    return 0
