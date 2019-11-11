from django.db import models

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField(blank=True)
    photo = models.URLField(blank=True)
    location = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.title

class Group(models.Model):
   GroupName = models.TextField
class User(Group):
    name = models.TextField
    ID = models.TextField
    email = models.TextField
    password = models.TextField
    school = models.TextField(blank=True)
    identification = models.TextField
    access = models.TextField
    def __str__(self):
        return self.name
    
