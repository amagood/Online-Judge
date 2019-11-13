#!/bin/bash

id=$1
language=$2
code=${id}"_code"
input=${id}"_input"
output=${id}"_output"

if [ "${language}" == "c" ]; then
	error=$(gcc -o ${id}.out ${code}.c 2>&1)
	if [ "$?" == "1" ]; then
		printf "CE\n" > ${output}
		printf "${error}" >> ${output}
		exit 0
	fi
	printf "\n" > ${output}
	./${id}.out < ${input} >> ${output}
	exit 0
elif [ "${language}" == "c++" ]; then
	error=$(g++ -o ${id}.out ${code}.cpp 2>&1)
	if [ "$?" == "1" ]; then
		printf "CE\n" > ${output}
		printf "${error}" >> ${output}
		exit 0
	fi
	printf "\n" > ${output}
	./${id}.out < ${input} >> ${output}
	exit 0
elif [ "${language}" == "python" ]; then
	error=$(python3 ${code}.py < ${input} 2>&1)
	if [ "$?" == "1" ]; then
		printf "CE\n" > ${output}
		printf "${error}" >> ${output}
		exit 0
	fi
	printf "\n" > ${output}
	python3 ${code}.py < ${input} >> ${output}
	exit 0
fi
exit 0