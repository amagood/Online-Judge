#!/bin/bash

id=$1
language=$2

if [ "${language}" == "c" ]; then
	error=$(gcc -o ./${id}/a.out ./${id}/code.c 2>&1)
	if [ "$?" == "1" ]; then
		printf "CE\n" > ./${id}/output.txt
		printf "${error}" >> ./${id}/output.txt
		exit 0
	fi
	printf "\n" > ./${id}/output.txt
	./${id}/a.out < ./${id}/input.txt >> ./${id}/output.txt
	exit 0
	
elif [ "${language}" == "c++" ]; then
	error=$(g++ -o ./${id}/a.out ./${id}/code.cpp 2>&1)
	if [ "$?" == "1" ]; then
		printf "CE\n" > ./${id}/output.txt
		printf "${error}" >> ./${id}/output.txt
		exit 0
	fi
	printf "\n" > ./${id}/output.txt
	./${id}/a.out < ./${id}/input.txt >> ./${id}/output.txt
	exit 0
	
elif [ "${language}" == "python" ]; then
	error=$(python3 ./${id}/code.py < ./${id}/input.txt 2>&1)
	if [ "$?" == "1" ]; then
		printf "CE\n" > ./${id}/output.txt
		printf "${error}" >> ./${id}/output.txt
		exit 0
	fi
	printf "\n" > ./${id}/output.txt
	python3 ./${id}/code.py < ./${id}/input.txt >> ./${id}/output.txt
	exit 0
fi

exit 0