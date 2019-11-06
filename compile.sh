#!/bin/bash
if [ "$1" == "c" ]; then
	error=$(gcc input.c 2>&1)
	if [ "$?" == "1" ]; then
		printf "CE\n" > output.txt
		printf "${error}" >> output.txt
		exit 0
	fi
	printf "\n" > output.txt
	./a.out >> output.txt
elif [ "$1" == "c++" ]; then
	error=$(g++ input.cpp 2>&1)
	if [ "$?" == "1" ]; then
		printf "CE\n" > output.txt
		printf "${error}" >> output.txt
		exit 0
	fi
	printf "\n" > output.txt
	./a.out >> output.txt
elif [ "$1" == "python" ]; then
	error=$(python input.py 2>&1)
	if [ "$?" == "1" ]; then
		printf "CE\n" > output.txt
		printf "${error}" >> output.txt
		exit 0
	fi
	printf "\n" > output.txt
	python3 input.py >> output.txt
fi
exit 0