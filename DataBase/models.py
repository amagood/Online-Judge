from django.db import models

'''
    Before using new version of models.py is better to flush the original database data (if you have any) to decrease the problem you might meet
    
    Version Note:
    Current Version: V2.6
    
    Version 1
        V1.0 inital release for V.1 judge demo with no group functionality
        V1.1 adding Rank for ranking in question
             adding Group class but no real funtionality
             change Summary's and Summit's Question to one way relation
        V1.2 create Chat class for Group
        V1.3 adding Question_ID and Question_Current_Count for Question creation
    Version 2
        V2.0 release for V.2 judge for new API requirement and implementation of Group
             finish Group class funtionality by adding relation with User and Question with relation name Group
        V2.1 delete Question Html and Js FileName
             Change Question ID from int to char
             adding class Category and manytomany relation to Question with relation name Category
        V2.2 Change Summary_Count default to 1
             adding Summary_Attend for Attend function default to False -> no auto attend
        V2.3 adding Summit Runtime for future function -> save the runtime for your simmit
             adding Summary Runtime for future function -> save the shortest runtime you have in a Question
        V2.4 adding Chat_Date_str and Data_Time_str with string to match API
        V2.5 Change Summary and Summit Rumtime imto int to encounter negetive number for not AC result
        V2.6 adding Summary Language and Summit Lauguage for fucking stupid reason...
    
    If you encounter any problem you can't solve or want to change anything please contact me
    
    Dennys Lee
    Email:leefamily.dennys@gmail.com
    '''

class Group(models.Model):
    Group_Name = models.CharField(max_length = 40) # no name longer than 40
    Group_User = models.ManyToManyField('User', blank=True, related_name='Group')
    Group_Question = models.ManyToManyField('Question', blank=True, related_name='Group')
    # Group_Chat_History with relation of 'Chat'
    Group_Chat_Maximum = models.PositiveIntegerField(default = 100)
    def __str__(self):
        return self.Group_Name # for debug, can be change for your own purpose

# subclass for Group

class User(models.Model):
    # User_Group with relation of 'Group'
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
        return self.User_Name # for debug, can be change for your own purpose

class Question(models.Model):
    # Question_Group with relation of 'Group'
    Question_Name = models.CharField(max_length = 40) # no name longer than 40
    Question_ID = models.CharField(max_length = 40) # no name longer than 40
    Question_Current_Count = models.PositiveIntegerField(default = 1)
    # Question_type = models.CharField(max_length = 20 ,default = 'code') <- not yet finish
    Question_difficulty = models.CharField(max_length = 10 ,default = 'normal') # no name longer than 10
    Question_Category = models.ManyToManyField('Category', blank=True, related_name='Category')
    # Question_Answer = <- not yet finish
    Question_AC_Count = models.PositiveIntegerField(default = 0)
    Question_Summit_Time = models.PositiveIntegerField(default = 0)
    Question_Create_Time = models.DateTimeField(auto_now_add=True)
    # Question_Ranking_List with relation of 'Rank'
    def __str__(self):
        return self.Question_Name # for debug, can be change for your own purpose

# subclass for Group

class Chat(models.Model):
    Chat_Group = models.ForeignKey(Group, related_name='Chat', blank=True, null=True, on_delete=models.CASCADE) # two way relation with Group
    Chat_Message = models.CharField(blank=True, max_length = 255) # might be changing
    Chat_User = models.ForeignKey(User, related_name='+', blank=True, null=True, on_delete=models.CASCADE) # one way relation with User
    Chat_Time = models.DateTimeField(auto_now_add=True) # will be it's creation time
    Chat_Date_Str = models.CharField(max_length = 40, blank=True)
    Chat_Time_Str = models.CharField(max_length = 40, blank=True)
    def __str__(self):
        return self.Chat_Message # for debug, can be change for your own purpose

# subclass for User

class Summit(models.Model):
    Summit_User = models.ForeignKey(User, related_name='Summit', blank=True, null=True, on_delete=models.CASCADE) # two way relation with User
    Summit_Question = models.ForeignKey(Question, related_name='+', blank=True, null=True, on_delete=models.CASCADE) # one way relation with Question
    # Summit_Question_ID = models.PositiveIntegerField(default = 0)
    Summit_Time = models.DateTimeField(auto_now_add=True) # will be it's creation time
    Summit_Output = models.CharField(default = 'WA', max_length = 10) # no output longer than 10
    Summit_Runtime = models.IntegerField(default = 0) # not yet finish
    Summit_Language = models.CharField(default = 'C', max_length = 10) # no output longer than 10
    def __str__(self):
        return self.Summit_Question.Question_Name # for debug, can be change for your own purpose

class Summary(models.Model):
    Summary_User = models.ForeignKey(User, related_name='Summary', blank=True, null=True, on_delete=models.CASCADE) # two way relation with User
    Summary_Question = models.ForeignKey(Question, related_name='+', blank=True, null=True, on_delete=models.CASCADE) # one way relation with Question
    # Summary_Question_ID = models.PositiveIntegerField(default = 0)
    Summary_Count = models.PositiveIntegerField(default = 1)
    Summary_AC_Count = models.PositiveIntegerField(default = 0) # Summary Count >= Summary AC Count
    Summary_Runtime = models.IntegerField(default = 0) # not yet finish
    Summary_Attend = models.BooleanField(default = False)
    Summary_Language = models.CharField(default = 'C', max_length = 10) # no output longer than 10
    def __str__(self):
        return self.Summary_Question.Question_Name # for debug ,can be change for your own purpose

# subclass for Question

class Rank(models.Model):
    Rank_Question = models.ForeignKey(Question, related_name='Rank', blank=True, null=True, on_delete=models.CASCADE)
    Rank_User = models.ForeignKey(User, related_name='Rank', blank=True, null=True, on_delete=models.CASCADE)
    Rank_Order = models.PositiveIntegerField(default = 0) # should be in range 1~100
    # Rank_Summary_Count it should be able to access User relation 'Summary' to  get the data
    # Rank_AC_count it should be able to access User relation 'Summary' to  get the data
    def __str__(self):
        return self.Rank_User.User_Name # for debug, can be change for your own purpose

class Category(models.Model):
    # Category_Question with relation 'Category'
    Category_Name = models.CharField(max_length = 40) # no name longer than 40
    Category_Description = models.CharField(blank=True, max_length = 255) # might be changing
    def __str__(self):
        return self.Category_Name # for debug, can be change for your own purpose
