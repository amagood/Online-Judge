# path
url: QuestionLibrary/p1
(get 'QuestionLibrary/p00001/p00001.html')
```
./templates/QuestionData/"QuestionID"/"QuestionID".html
                                      "QuestionID"exampleCode.c
                                      "QuestionID"exampleCode.cpp
                                      "QuestionID"exampleCode.py
 /static/QuestionData/css
       	             /js
                     /image
```

# API

## question library button
request:
```
{
    "action" : "questionLib",
    "questionNum" : "20",//there are twenty question in one page. 
    "questionPage" : ex"1",//1 means select the top 20 question
    "sequence" :"id"|| "tag"||"degree"||"percentagePassing"||"respondent"||"inputTime",
    "sortDesc":"false"||"true",//false:升序,true:降序
    "tag" : "tag"||"loop"||"array"||"string"||"function"||"pointer",//tag:沒有過濾的資料
    "degree" : "degree"||"easy"||"medium"||"hard",//degree:沒有過濾的資料
    "userName" : ex"amagood",
    "Class" : ex"CSIE110",
    "hash" : "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
}
```
response:
```
{
    "questionLib":[
      {"id":"a001","title":"title01","target":"loop","degree":"easy","percentagePassing":"50","respondent":"100","inputTime":"20190101","link":"/problem/a001.html"},
      {"id":"a002","title":"title01","target":"loop","degree":"easy","percentagePassing":"50","respondent":"100","inputTime":"20190101","link":"/problem/a002.html"},
      ...
      {"id":"a020","title":"title01","target":"loop","degree":"easy","percentagePassing":"50","respondent":"100","inputTime":"20190101","link":"/problem/a020.html"}
    ],
    "userName" : ex"amagood",
    "Class" : ex"CSIE110",
    "hash" : "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
}
```

## submit question button
request:
```
{
    "action" : "createQ",
    "questionName" : ex"Fibonacci Sequence",
    "PDF" : ex"base64_string(question.pdf)", 
    "questionContent" : ex"Please print ...",
    "language" : "c || cpp || python",
    "sampleProgram" : ex"code_string(Fib.cpp)"
    "exampleInput" : ex"10",
    "exampleOutput" : ex"0 1 1 2 3 5 8 13 21 34",
    "input" : ex"string(FibInput.txt)",
    "output" : ex"string(FibOutput.txt)",
    "tag" : ex"loop array binaryTree dp",
    "difficulty" : ex"5", //1~10整數
    "userName" : ex"amagood",
    "Class" : ex"CSIE110",
    "hash" : "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
}
```
response:
```
{
    "submitStats" : "success || error",
    "userName" : ex"amagood",
    "Class" : ex"CSIE110",
    "hash" : "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
}
```
verify sample program and test data button
request:

```
{
    "action" : "verify_td",
    "language" : "cpp"||"c"||"python",
    "sampleProgram" : ex"code_string(code.cpp)",
    "tdInput" : ex"string(input.txt)",
    "tdOutput" : ex"string(output.txt)",
    "userName" : ex"amagood",
    "Class" : ex"CSIE110",
    "hash" : "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
}

```
response:

```
{
    "stats" : "verified"||"wrong",
    "userName" : ex"amagood",
    "Class" : ex"CSIE110",
    "hash" : "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
}
```

# Version
  * v1.0 2019/11/12
    * folder path
    * create HTML
  * v1.1 2019/12/01
    * GetQuestion
  * v1.2 2019/12/05
    * change API question library button
    * request remove userIdentity
    * response questionLib add id
  * v1.3 2019/12/15
    * get question list: filter & ordering
  * v1.4 2019/12/16
    * new: create question
  * v1.5 2019/12/17
    * newAPI
    * getQ:sortDesc
    * ceaQ:tag&difficulty
    * fix:json-decodeBUG
  * v1.6 2019/12/19
    * update readme.md
  * v1.7 2019/12/24
    * folder path change
    * add html urls
    * css&js link error
  * v1.8 2019/12/25
    * fix css&js link error
    * integration front-end
  * v1.9 2019/12/25
    * action : verify_td
  * v1.10 2019/12/25
    * fix problem navbar href error
    * update API
  * v1.11 2020/01/03
    * question library button response: add "link"
    * integration front-end
    * bug: problem.html err
    * bug: navbar link err
    * bug: create difficulty & get question difficulty
    * bug: problem pdf err
