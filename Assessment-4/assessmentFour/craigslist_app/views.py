from cmd import PROMPT
from unicodedata import category
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import get_object_or_404, render
from .models import Category, Post
from django.views.decorators.csrf import csrf_exempt
import json
from django.urls import reverse

# Create your views here.
def home(request) :
    categories = Category.objects.all()
    data = {"categories": categories}

    return render(request, 'craigslist_app/home.html', data)

@csrf_exempt
def add_category(request):
    if request.method == "POST":
        body = json.loads(request.body)
        newCategory = Category(name = body['name'])
        newCategory.save()
        return JsonResponse({})
    return render(request, "craigslist_app/add_category.html")

@csrf_exempt
def edit_category(request, category_id):
    if request.method == "POST":
        body = json.loads(request.body)
        category = Category.objects.all().get(id = category_id)

        category.name = body["name"]

        category.save()
        return JsonResponse({})
    data = {'category': Category.objects.all().get(id = category_id)}
    return render(request, "craigslist_app/edit_category.html", data)

@csrf_exempt
def delete_category(request, category_id):
    category = get_object_or_404(Category, id = category_id)
    if request.method == "POST":
        category.delete()
        return HttpResponseRedirect(reverse("home"))
    
    return render(request, 'craigslist_app/delete_category.html')

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
def delete_post(request, category_id, post_id):
    post = get_object_or_404(Post, id = post_id)
    if request.method == "POST":
        post.delete()
        return HttpResponseRedirect(reverse("home"))
    
    return render(request, 'craigslist_app/delete_post.html')
    
@csrf_exempt
def add_post(request, category_id):
    if request.method == "POST":
        body = json.loads(request.body)
        newPost = Post(title = body["title"], user= body["user"], description= body["description"], category_id= category_id)
        newPost.save()
        return JsonResponse({})
    return render(request, "craigslist_app/add_post.html")

@csrf_exempt
def edit_post(request, category_id, post_id):
    if request.method == "POST":
        body = json.loads(request.body)
        post = Post.objects.all().get(id = post_id)

        post.title = body['title']
        post.user = body['user']
        post.description = body['description']

        post.save()
        return JsonResponse({})
    data = {'post': Post.objects.all().get(id = post_id)}
    return render(request, "craigslist_app/edit_post.html", data)