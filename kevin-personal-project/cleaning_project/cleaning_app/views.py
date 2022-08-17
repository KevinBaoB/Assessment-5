from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from .models import *
from .forms import *
import requests
import pprint
from django.core import serializers
from django.contrib.auth import authenticate, logout
from django.contrib.auth import login as auth_login
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from rest_framework.response import Response
import json
import urllib.parse as urlparse
import os
from urllib import parse
from urllib import request as url_request
from dotenv import load_dotenv

load_dotenv()


# @login_required
def index(request):

    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)

@csrf_exempt
def registerUser(request):
    data = json.loads(request.body)
    
    form = RegisterForm()
    if request.method == 'POST':
        form = RegisterForm(data={
            'username': data['username'],
            'email': data['email'],
            'password1': data['password1'],
            'password2': data['password2'],
        })
        if form.is_valid():
            print('form')
            form.save()
            user = form.cleaned_data.get('username')
            return HttpResponse('SUCCESS')
        else:
            return HttpResponse('NONE')
    
@csrf_exempt
def loginUser(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username=data["username"]
        password=data["password"]

        user = authenticate(request, username=username, password=password)
        if user is not None:
            auth_login(request, user)
            return HttpResponse("Success")

        else:
            return HttpResponse('Failure')

def logoutUser(request):

    logout(request)
    return HttpResponse('Logout')

@api_view(['GET'])
def get_user(request):
    current_user = request.user
    return HttpResponse(current_user.username)
    

@login_required
def lists(request):
    cleaning = Cleaning.objects.all()

    data = serializers.serialize("json", cleaning, fields=['surface', 'items', 'routine_care', 'special_instructions'])

    return HttpResponse(data)

@login_required
def surface_list(request):
    surface = Surface.objects.all()
    surfaceName = serializers.serialize("json", surface, fields=["name"])
    return HttpResponse(surfaceName)

@api_view(['POST'])
@login_required
def get_surface_by_id(request):
    body = request.data
    surface_id = body["surfaceID"]
    print(id)
    surface = Surface.objects.all().get(pk=surface_id)
    surface_convert = serializers.serialize("json", [surface], ensure_ascii=False)
    surface_result = surface_convert[1:-1]
    return HttpResponse(surface_result)

@api_view()
@login_required
def get_products(request, product_q):

    params = {
    "key": os.environ["apikey"],
    "cx": "22ce47a45225e4ddb",
    "q": f"{product_q} cleaner solution",
    "start": 0
    }

    gcse_base_url = "https://www.googleapis.com/customsearch/v1"

    url_parts = list(urlparse.urlparse(gcse_base_url))
    url_parts[4] = urlparse.urlencode(params)

    gcse_url = urlparse.urlunparse(url_parts)
    data = requests.get(gcse_url).json()
    products = data["items"]

    return Response(products)

@api_view(['POST'])
@login_required
def add_surface(request):
    if request.method == 'POST':
        body = request.data
        newSurface = Surface(name=body['name'])
        newSurface.save()
        return HttpResponse('New SurfaceMade')
    else:
        return HttpResponse('Surface Creation FAILURE!')

@api_view(['POST'])
@login_required
def delete_surface(request):
    body = request.data
    surface = get_object_or_404(Surface, id = body['surfaceID'])
    if request.method == 'POST':
        surface.delete()
        return HttpResponse('SUCCESS!')
    else:
        return HttpResponse('Surface Deletion FAILURE!')


@api_view(['POST'])
@login_required
def edit_surface(request):
    print(request.data)
    if request.method == 'POST':
        body = request.data
        surface = Surface.objects.all().get(id = body['surfaceID']) 
        surface.name = body["name"]
        surface.save()
        return HttpResponse('SUCCESS!')
    else:
        return HttpResponse('Surface Edit FAILURE!')

@api_view(['POST'])
@login_required
def add_cleaning_tip(request):
    if request.method == 'POST':
        body = request.data
        surface = Surface.objects.all().get(id = body['surface'])
        newCleaning = Cleaning(surface= surface , items=body['items'], routine_care=body['routine_care'], special_instructions= body['special_instructions'])
        newCleaning.save()
        return HttpResponse('New Tip Made')
    else:
        return HttpResponse('Tip Creation FAILURE!')

@api_view(['POST'])
@login_required
def delete_cleaning_tip(request):
    body = request.data
    cleaning_tip = get_object_or_404(Cleaning, id = body['cleaning_tipID'])
    if request.method == 'POST':
        cleaning_tip.delete()
        return HttpResponse('SUCCESS!')
    else:
        return HttpResponse('Cleaning Deletion FAILURE!')
        
  
@api_view(['POST'])
@login_required
def edit_cleaning_tip(request):
   
    if request.method == 'POST':
        body = request.data
        newCleaning = Cleaning.objects.all().get(id= body['cleaningID'])
        newCleaning.items = body['items']
        newCleaning.routine_care = body['routine_care']
        newCleaning.special_instructions = body['special_instructions']
        newCleaning.save() 
        print('Hello')
        return HttpResponse('Edit Tip Made')
    else:
        return HttpResponse('Edit Tip Creation FAILURE!')

@api_view(['POST'])
@login_required
def get_cleaning_by_id(request):
    body = request.data
    cleaning_id = body["cleaningID"]
    cleaning = Cleaning.objects.all().get(id=cleaning_id)
    cleaning_convert = serializers.serialize("json", [cleaning], ensure_ascii=False)
    cleaning_result = cleaning_convert[1:-1]
    return HttpResponse(cleaning_result)

@api_view(['GET'])
@login_required
def get_giphy(request, query):

    params =  parse.urlencode({
    "api_key": os.environ["giphykey"],
    "q": f"{query}",
    "limit": "15"
    })

    base_url = "http://api.giphy.com/v1/gifs/search"

    with url_request.urlopen("".join((base_url, "?", params))) as response:
        data = json.loads(response.read())

    # result = json.dumps(data, sort_keys=True, indent=4)

    return Response(data)