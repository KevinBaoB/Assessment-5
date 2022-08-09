from django import forms
from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User


from .models import *

class SurfaceForm(forms.ModelForm):

    class Meta:
        model = Surface
        fields = '__all__'

class CleaningForm(forms.ModelForm):

    class Meta:
        model = Cleaning
        fields = '__all__'

class RegisterForm(UserCreationForm):

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']