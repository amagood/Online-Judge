from django.shortcuts import render
# Create your views here.

def index(request):
	if request.method == 'POST':
		print(request.POST)
		d=request.POST
		print(d['account'])
	context = {}
	return render(request, 'register/index.html',context)
	
