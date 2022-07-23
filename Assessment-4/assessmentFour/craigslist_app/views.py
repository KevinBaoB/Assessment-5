from django.http import JsonResponse
from django.shortcuts import render
from .models import Category, Post
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.
def home(request) :
    categories = Category.objects.all()
    data = {"categories": categories}

    return render(request, 'craigslist_app/home.html', data)

def list_posts(request, category_id):
    category_posts = Post.objects.all().filter(category_id = category_id)
    category_name = Category.objects.all().get(id = category_id)
    data = {"posts": category_posts, "category": category_name}
    return render(request, 'craigslist_app/list_posts.html', data)

def post_info(request, category_id, post_id):
    post = Post.objects.all().get(id = post_id)
    data = {"post": post, 'category_id':category_id}
    return render(request, 'craigslist_app/post_info.html', data)
    
@csrf_exempt
def add_post(request, category_id):
    if request.method == "POST":
        body = json.loads(request.body)
        newPost = Post(title = body["title"], user= body["user"], description= body["description"], category_id= category_id)
        newPost.save()
        return JsonResponse({})
    return render(request, "craigslist_app/add_post.html")