This is a Django app for the DataBase.
Add this into your Django project file
And please remember to change your setting.py in your project

change here:
    INSTALLED_APPS = [  '...' , <- remember this little guy ',' it is important
                            add this -> 'DataBase' ]

    After that use      manage.py makemigrations
                        manage.py migrate
    o make sure everything is right
    if encounter some error with the DataBase.models you might want to try 
                        manage.py flush 
                            and see if the problem is solve
    if not the models have problems them you might want to check the step above

    And you should be good

    by the way if you don't know you can manage the database by 
                        manage.py runserver
    after you use 
                        manage.py createsuperuser
    this should be easier to debug the data in your database

    if you want to get the data in database for your python file
    use -> from DataBase.models import ... <- the class you want to use

If you encounter any question feel free to ask me in person, send email, or other ways to contact me

Dennys lee 
Email: leefamily.dennys@gmail.com

Lase edit: 11/29/2019

database version:

Before using new version of models.py is better to flush the original database data (if you have any) to decrease the problem you might meet

Version Note:
Current Version: V2.3

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

If you encounter any problem you can't solve or want to change anything please contact me

Dennys Lee
Email:leefamily.dennys@gmail.com


