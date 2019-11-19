from django.contrib import admin
from .models import Group
from .models import User
from .models import Question
from .models import Summit
from .models import Summary
from .models import Rank

# Register your models here.

admin.site.register(Group)
admin.site.register(User)
admin.site.register(Question)
admin.site.register(Summit)
admin.site.register(Summary)
admin.site.register(Rank)
