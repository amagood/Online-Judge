from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from datetime import datetime
from trips.models import Post

def hello_world(request):
    name=Post.objects.get(title='mmmmm')
    return HttpResponse(name)
