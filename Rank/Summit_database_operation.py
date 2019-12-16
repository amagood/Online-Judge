from DataBase.models import User, Question, Summit, Summary, Rank
''' --- will require model version 2.0 (check your model.py) --- '''

def DataBase_Operation(Summited_Question_ID, Summited_User_Name, Summited_Output)
{
    Current_Question = Question.objects.filter(Question_ID = Summited_Question_ID)
    Current_User = User.objects.filter(User_Name = Summited_User_Name)
    
    ''' ---adding Summit History to DB--- '''
    Summit(Summit_User = Current_User, Summit_Question = Current_Question, Summit_Output = Summited_Output).save()
    
    ''' ---updating Summary in DB--- '''
    Current_Summary = Summary.objects.filter(Summary_User__User_Name = Summited_User_Name, Summary_Question__Question_ID = Question_ID)
    if len(Current_Summary) == 0:   # if is the first time Summit this Question
        Summary(Summary_User = Current_User, Summary_Question = Current_Question, Summary_AC_Count = 1 if Summited_Output == 'AC' else 0).save()
    else:
        Current_Count = Current_Summary[0].Summary_Count
        Current_AC_Count = Current_Summary[0].Summary_AC_Count
        Current_Summary.update(Summary_Count = Current_Count + 1, Summary_AC_Count = Current_AC_Count + 1)
    
    ''' ---Checking Rank Order--- '''
    Rank.objects.filter(Rank_Question__Question_ID = Summited_Question_ID).delete()
    New_Rank = Summary.objects.filter(Summary_Question__Question_ID = Summited_Question_ID, Summary_Attend = True).order_by('Summary_AC_Count').reverse()[:100:]
    for i in len(New_Rank):
        Rank(Rank_Question = New_Rank[i].Summary_Question, Rank_User = New_Rank[i].Summary_User, Rank_Order = i).save()

    print('--- finish updating DataBase ---')
}
