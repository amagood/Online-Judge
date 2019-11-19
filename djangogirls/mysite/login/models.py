from django.db import models

# Create your models here.

class User(models.Model):
    User_Name = models.CharField(max_length = 40) # no name longer than 40
    User_ID = models.PositiveIntegerField() # range 0 to 2147483647
    User_Email = models.EmailField(max_length = 254, default = '') # will check if the email is vaild
    User_Password = models.CharField(max_length = 40) # no password longer than 40
    User_School = models.CharField(blank = True, max_length = 40) # no name longer than 40
    User_Identification = models.CharField(default = 'student', max_length = 8) # only store student or teacher
    User_Access = models.CharField(default = '0000000000',max_length = 10)
    def __str__(self):
        return self.User_Name

class Question(models.Model):
    Question_Name = models.CharField(max_length = 40) # no name longer than 40
    #Question_type = models.CharField(max_length = 20 ,default = 'code') # no name longer than 20
    Question_difficulty = models.CharField(max_length = 10 ,default = 'normal') # no name longer than 10
    #Question_Category =
    #Question_Storage_Type =
    #Question_Description_PDF_Filename =
    #Question_Answer =
    Question_AC_Count = models.PositiveIntegerField(default = 0)
    Question_Summit_Time = models.PositiveIntegerField(default = 0)
    Question_Create_Time = models.DateTimeField(auto_now_add=True)
    Question_Html_Filename = models.CharField(blank = True, max_length = 100)
    Question_Js_Filename = models.CharField(blank = True, max_length = 100)
    #Question_Ranking_List =
    def __str__(self):
        return self.Question_Name

# subclass for User

class Summit(models.Model):
    Summit_User = models.ForeignKey(User, related_name='Summit', blank=True, null=True, on_delete=models.SET_NULL)
    Summit_Question = models.CharField(max_length = 40) # no name longer than 40
    Summit_Time = models.DateTimeField(auto_now_add=True)
    Summit_Output = models.CharField(default = 'WA',max_length = 10)
    def __str__(self):
        return self.Summit_Question

class Summary(models.Model):
    Summary_User = models.ForeignKey(User, related_name='Summary', blank=True, null=True, on_delete=models.SET_NULL)
    Summary_Question = models.CharField(max_length = 40) # no name longer than 40
    Summary_Count = models.PositiveIntegerField(default = 0)
    Summary_AC_Count = models.PositiveIntegerField(default = 0) # Summary Count >= Summary AC Count
    def __str__(self):
        return self.Summary_Question

# subclass for Question
'''
class Rank(models.Model):
    Rank_Question = models.ForeignKey(Question, related_name='Summit', blank=True, null=True, on_delete=models.SET_NULL)
    RanK_User = models.ForeignKey(User, related_name='Summary', blank=True, null=True, on_delete=models.SET_NULL)
    #Rank_Summary_Count
    #Rank_AC_count
    def __str__(self):
        return self.Summary_Question'''

