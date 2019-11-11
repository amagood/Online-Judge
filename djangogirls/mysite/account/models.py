from django.db import models

# Create your models here.
class Group(models.Model):
   groupname = models.TextField(blank=True)
   def __str__(self):
        return self.groupname
class User(Group):
    name = models.TextField(blank=True)
    ID = models.TextField(blank=True)
    email = models.TextField(blank=True)
    password = models.TextField(blank=True)
    school = models.TextField(blank=True)
    identification = models.TextField(blank=True)
    access = models.TextField(blank=True)
    def __str__(self):
        return self.name
