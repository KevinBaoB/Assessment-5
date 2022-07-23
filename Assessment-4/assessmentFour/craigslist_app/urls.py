from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, ),
    path('<int:category_id>/', views.list_posts, name = "list_posts"),
    path('<int:category_id>/posts/<int:post_id>/', views.post_info, name='post_info'),
    path('<int:category_id>/posts/new',views.add_post, name='add_post'),
]