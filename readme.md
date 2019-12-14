# class Question_Lirbrary
 * __init__(self,QuestionID)
     * QuestionID:str(ex: 'p00001')
 * addQuestion(self,...)
     * Title:str
     * Tags:list [str,...]
     * Description:str
     * SampleInput:str
     * SampleOut:str
     * SampleCode:str
     * FileNameExtention:str('c' or 'cpp' or 'py')
 * deleteQuestion(self,QuestionID)
     * QuestionID:str
## folder path
```
./QuestionData/"QuestionID"/"QuestionID".html
                            "QuestionID"exampleCode.c
                            "QuestionID"exampleCode.cpp
                            "QuestionID"exampleCode.py
              /css
              /js
              /image
```
v1.0 2019/11/12

# GetQuestion
```
request:
{
    "action" : "getQuestion",
    "questionNum" : "20",//一頁20題
    "questionPage" : ex"1",//目前頁數
    "userIdentity" : "teacher"||"student",
    //題目排序方式
    "questionSequence" : "target"||"degree"||"percentagePassing"||"respondent"||"inputTime",
    //題目過濾方式
    "questionTarget" : "loop"||"array"||"string"||"function"||"pointer",
    "questionDegree" : "easy"||"medium"||"hard",
    "selectClass" : ex"class A",//顯示該班級的題目集(似乎是之後的功能)
    "userName" : ex"amagood",
    "hash" : "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
}

response:
{
    "questionLib":
    [
      {
        tltle:"a001",  target:"loop",  degree:"easy",  percentagePassing:"50%",   respondent:"100",  inputTime:"20191111",
      },
      {
        tltle:"a002",  target:"loop",  degree:"easy",  percentagePassing:"50%",   respondent:"100",  inputTime:"20191111",
      },
      ...
      {
        tltle:"a020",  target:"loop",  degree:"easy",  percentagePassing:"50%",   respondent:"100",  inputTime:"20191111",
      },
    ]
    "userName" : ex"amagood",
    "hash" : "A7FCFC6B5269BDCCE571798D618EA219A68B96CB87A0E21080C2E758D23E4CE9"
}
```
v1.1 2019/12/01

new API
request remove userIdentity
response questionLib add id

v1.2 2019/12/05

get question list: filter & ordering

v1.3 2019/12/15

new: create question

v1.4 2019/12/16
