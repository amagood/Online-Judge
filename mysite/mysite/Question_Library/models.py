from django.db import models

'''
Before using new version of models.py is better to flush the original database data (if you have any) to decrease the problem you might meet
   
   Version Note:
    Current Version: V1.2
   
        V1.0 inital release for V.1 judge demo with no group functionality
        V1.1 adding Rank for ranking in question
             adding Group class but no real funtionality
             change Summary's and Summit's Question to one way relation
        V1.2 create Chat class for Group
    
    If you encounter any problem you can't solve or want to change anything please contact me
    
    Dennys Lee
    Email:leefamily.dennys@gmail.com
    '''

class Group(models.Model):
    Group_Name = models.CharField(max_length = 40) # no name longer than 40
    # Group_User_List with relation of 'User' <- not yet finish
    # Group_Question_List with relation of 'Question' <- not yet finish
    # Group_Chat_History with relation of 'Chat'
    Group_Chat_Maximum = models.PositiveIntegerField(default = 100)
    def __str__(self):
        return self.Group_Name

class User(models.Model):
    User_Name = models.CharField(max_length = 40) # no name longer than 40
    User_ID = models.PositiveIntegerField(default = 0) # range 0 to 2147483647
    User_Email = models.EmailField(max_length = 254, default = '') # will check if the email is vaild
    User_Password = models.CharField(max_length = 40) # no password longer than 40
    User_School = models.CharField(blank = True, max_length = 40) # no name longer than 40
    User_Identification = models.CharField(default = 'student', max_length = 8) # only store student or teacher
    User_Access = models.CharField(default = '0000000000',max_length = 10)
    # User_Summit_History with a relation of 'Summit'
    # User_Summary_History with a relation of 'Summary'
    def __str__(self):
        return self.User_Name

class Question(models.Model):
    Question_Name = models.CharField(max_length = 40) # no name longer than 40
    # Question_type = models.CharField(max_length = 20 ,default = 'code') # no name longer than 20  <- not yet finish
    Question_difficulty = models.CharField(max_length = 10 ,default = 'normal') # no name longer than 10
    # Question_Category = <- not yet finish
    # Question_Answer = <- not yet finish
    Question_AC_Count = models.PositiveIntegerField(default = 0)
    Question_Summit_Time = models.PositiveIntegerField(default = 0)
    Question_Create_Time = models.DateTimeField(auto_now_add=True)
    Question_Html_Filename = models.CharField(blank=True, max_length = 100)
    Question_Js_Filename = models.CharField(blank=True, max_length = 100)
    # Question_Ranking_List with relation of 'Rank'
    def __str__(self):
        return self.Question_Name

# subclass for Group

class Chat(models.Model):
    Chat_Group = models.ForeignKey(Group, related_name='Chat', blank=True, null=True, on_delete=models.CASCADE) # two way relation with Group
    Chat_Message = models.CharField(blank=True, max_length = 255) # might be changing
    Chat_User = models.ForeignKey(User, related_name='+', blank=True, null=True, on_delete=models.CASCADE) # one way relation with User
    Chat_Time = models.DateTimeField(auto_now_add=True) # time on create
    def __str__(self):
        return self.Chat_Message # for debug ,can be change for your own purpose

# subclass for User

class Summit(models.Model):
    Summit_User = models.ForeignKey(User, related_name='Summit', blank=True, null=True, on_delete=models.CASCADE) # two way relation with User
    Summit_Question = models.ForeignKey(Question, related_name='+', blank=True, null=True, on_delete=models.CASCADE) # one way relation with Question
    Summit_Time = models.DateTimeField(auto_now_add=True) # will be it's creation time
    Summit_Output = models.CharField(default = 'WA',max_length = 10) # no output longer than 10
    def __str__(self):
        return self.Summit_Question # for debug ,can be change for your own purpose

class Summary(models.Model):
    Summary_User = models.ForeignKey(User, related_name='Summary', blank=True, null=True, on_delete=models.CASCADE) # two way relation with User
    Summary_Question = models.ForeignKey(Question, related_name='+', blank=True, null=True, on_delete=models.CASCADE) # one way relation with Question
    Summary_Count = models.PositiveIntegerField(default = 0)
    Summary_AC_Count = models.PositiveIntegerField(default = 0) # Summary Count >= Summary AC Count
    def __str__(self):
        return self.Summary_Question # for debug ,can be change for your own purpose

# subclass for Question

class Rank(models.Model):
    Rank_Question = models.ForeignKey(Question, related_name='Rank', blank=True, null=True, on_delete=models.CASCADE)
    Rank_User = models.ForeignKey(User, related_name='Rank', blank=True, null=True, on_delete=models.CASCADE)
    Rank_Order = models.PositiveIntegerField(default = 0) # should be in range 1~100
    # Rank_Summary_Count it should be able to access User relation 'Summary' to  get the data
    # Rank_AC_count it should be able to access User relation 'Summary' to  get the data
    def __str__(self):
        return self.Rank_User.User_Name # for debug ,can be change for your own purpose