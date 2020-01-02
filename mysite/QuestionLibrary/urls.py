"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from QuestionLibrary.views import responseGetQuestion
from QuestionLibrary.views import responseCreateQuestion
from QuestionLibrary.views import problemDetail
from QuestionLibrary.views import pdfDetail
from QuestionLibrary.views import teacherProblem
#from QuestionLibrary.views import studentProblem

urlpatterns = [
    path('studentProblem.html', responseGetQuestion ),
    path('teacherProblem.html', teacherProblem ),
    #path('studentProblem.html', studentProblem ),
    path('createQuestion.html', responseCreateQuestion ),
    path('problem/p<int:num>.html', problemDetail ),
    path('problem/p<int:num>.pdf', pdfDetail ),
]
