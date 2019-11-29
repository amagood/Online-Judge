This is a Django app for the DataBase.
Add this into your Django project file
And please remember to change your setting.py in your project

	change here:
		INSTALLED_APPS = [  '...' , <- remember this little guy ',' it is important
			add this -> 'DataBase' ]

After that use 	manage.py makemigrations
	       	manage.py migrate
	to make sure everything is right
	if encounter some error with the DataBase.models you might want to try 
		manage.py flush 
			and see if the problem is solve
	if not the models have problems them you might want to check the step above

And you should be good

	by the way if you don't know you can manage the database by 
		manage.py rumserver
	after you use 
		manage.py createsuperuser
	this should be easier to debug the data in your database

if you want to get the data in database for your python file
	use -> from DataBase.models import ... <- the class you want to use

If you encounter any question feel free to ask me in person, send email, or other ways to contact me

Dennys lee 
Email: leefamily.dennys@gmail.com

Lase edit: 11/29/2019