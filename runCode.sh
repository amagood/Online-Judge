#!/bin/bash

id=$1
language=$2
maxTime=10

if [ "${language}" == "c" ]; then
	error=$(gcc -o ./${id}/a.out ./${id}/code.c 2>&1)
	if [ "$?" == "1" ]; then
		printf "CE\n" > ./${id}/output.txt
		printf "${error}" >> ./${id}/output.txt
		exit 0
	fi
	output=$((time timeout ${maxTime} ./${id}/a.out < ./${id}/input.txt) 2>./${id}/output.txt)
	if [ "$?" == "124" ]; then
		printf "TLE\n" > ./${id}/output.txt
		printf "Timeout" >> ./${id}/output.txt
		exit 0
	fi
	printf "${output}" >> ./${id}/output.txt
	exit 0
	
elif [ "${language}" == "c++" ]; then
	error=$(g++ -o ./${id}/a.out ./${id}/code.cpp 2>&1)
	if [ "$?" == "1" ]; then
		printf "CE\n" > ./${id}/output.txt
		printf "${error}" >> ./${id}/output.txt
		exit 0
	fi
	output=$((time timeout ${maxTime} ./${id}/a.out < ./${id}/input.txt) 2>./${id}/output.txt)
	if [ "$?" == "124" ]; then
		printf "TLE\n" > ./${id}/output.txt
		printf "Timeout" >> ./${id}/output.txt
		exit 0
	fi
	printf "${output}" >> ./${id}/output.txt
	exit 0
	
elif [ "${language}" == "python" ]; then
	output=$((time timeout ${maxTime} python3 ./${id}/code.py < ./${id}/input.txt 2>&1) 2>./${id}/output.txt)
	status=$?
	if [ "${status}" == "1" ]; then
		printf "CE\n" > ./${id}/output.txt
		printf "${output}" >> ./${id}/output.txt
		exit 0
	elif [ "${status}" == "124" ]; then
		printf "TLE\n" > ./${id}/output.txt
		printf "Timeout" >> ./${id}/output.txt
		exit 0
	fi
	printf "${output}" >> ./${id}/output.txt
	exit 0
fi

exit 0