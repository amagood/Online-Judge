from django.urls import path

from . import views

from django.http import HttpResponse

from django.http import HttpRequest

from .models import Question




def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    output = ', '.join([q.question_text for q in latest_question_list])
    return HttpResponse(output)

app_name = 'login'
urlpatterns = [
    #
    path('problem/p000/', views.get_code_string, name='p000'),
    #
    path('problem/p000/submit/', views.submit_status, name='submit')
]
