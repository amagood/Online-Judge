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