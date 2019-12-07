#!/bin/bash

id=$1
language=$2

# check if executor exist
if ! test -f executor; then

	# check if executor.c exist
	if test -f executor.c; then
		gcc -o executor executor.c
	else
		echo "no executor"
		exit 1
	fi
fi

if [ "${language}" == "c" ]; then
	error=$(gcc -o ./${id}/a.out ./${id}/code.c 2>&1)
	
	# check if compile error
	if [ "$?" == "1" ]; then
		printf "CE\n" > ./${id}/output.txt
		printf "${error}" >> ./${id}/output.txt
		exit 0
	fi
	
	./executor ${id} ${language} > ./${id}/output.txt
	status=$?
	if [ "${status}" == "1" ]; then
		echo "something wrong in executor"
		exit 1
	else 
		cat ./${id}/tempOutput.txt >> ./${id}/output.txt
	fi
	
elif [ "${language}" == "c++" ]; then
	error=$(g++ -o ./${id}/a.out ./${id}/code.cpp 2>&1)
	
	# check if compile error
	if [ "$?" == "1" ]; then
		printf "CE\n" > ./${id}/output.txt
		printf "${error}" >> ./${id}/output.txt
		exit 0
	fi
	
	./executor ${id} ${language} > ./${id}/output.txt
	status=$?
	if [ "${status}" == "1" ]; then
		echo "something wrong in executor"
		exit 1
	else 
		cat ./${id}/tempOutput.txt >> ./${id}/output.txt
	fi
	
elif [ "${language}" == "python" ]; then
	./executor ${id} ${language} > ./${id}/output.txt
	status=$?
	if [ "${status}" == "1" ]; then
		echo "somethine wrong in executor"
		exit 1
	else 
		cat ./${id}/tempOutput.txt >> ./${id}/output.txt
	fi
fi

exit 0