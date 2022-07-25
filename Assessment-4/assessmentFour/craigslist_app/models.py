from unicodedata import category
from django.db import models
from django.forms import ImageField

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length = 255)

class Post(models.Model):
    title = models.CharField(max_length=255)
    user = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    date_created = models.DateTimeField(auto_now_add=True, null=True)
    image = models.ImageField(null=True, blank=True, upload_to='images/')
    category = models.ForeignKey(Category, on_delete= models.CASCADE, default = 1)