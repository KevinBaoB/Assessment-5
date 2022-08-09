
from django.db import models

# Create your models here.


class Surface(models.Model):
    name = models.CharField(max_length=255)

class Cleaning(models.Model):
    surface = models.ForeignKey(Surface, on_delete= models.CASCADE, default = 1)
    items = models.CharField(max_length=255)
    routine_care = models.TextField(blank=True)
    special_instructions = models.TextField(blank=True)
    
