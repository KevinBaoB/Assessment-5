from unicodedata import category
from django.db import models

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length = 255)

class Post(models.Model):
    title = models.CharField(max_length=255)
    user = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete= models.CASCADE, default = 1)