from DataBase.models import Question
import hashlib
import time
import json
from QuestionLibrary.QuestionHTML import Question_Library

def responseCreateQuestion(questionName,PDF,questionContent,language,sampleProgram,exampleInput,exampleOutput,qinput,qoutput):
    try:
        newQuestionID='p{:05d}'.format(Question.objects.all().count()+1)
        newQuestion=Question()#create to db
        newQuestion.Question_ID=newQuestionID
        newQuestion.Question_Name=questionName
        newQuestion.Question_difficulty='easy'#API?
        newQuestion.Question_Category__Category_Name='loop'#API?
        newQuestion.save()
        newHTML=Question_Library(newQuestionID)#create html
        FileNameExtention='c'
        if language=='cpp':
            FileNameExtention='cpp'
        if language=='python':
            FileNameExtention='py'
        #tag API?
        newHTML.addQuestion(questionName,['Tag1','Tag2'],questionContent,exampleInput,exampleOutput,sampleProgram,FileNameExtention)
        return 'success'
    except:
        print('error')
        return 'error'
'''
class Question(models.Model):
    Question_Name = models.CharField(max_length = 40) # no name longer than 40
    Question_ID = models.CharField(max_length = 40) # no name longer than 40
    Question_Current_Count = models.PositiveIntegerField(default = 1)
    Question_difficulty = models.CharField(max_length = 10 ,default = 'normal') # no name longer than 10
    Question_Category = models.ManyToManyField('Category', blank=True, related_name='Category')
    Question_AC_Count = models.PositiveIntegerField(default = 0)
    Question_Summit_Time = models.PositiveIntegerField(default = 0)
    Question_Create_Time = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.Question_Name
'''
