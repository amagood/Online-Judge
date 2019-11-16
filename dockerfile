FROM ubuntu
COPY run.sh /home
RUN apt-get update
RUN apt-get -y install gcc
RUN apt-get -y install g++
RUN apt-get -y install python3
