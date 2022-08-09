from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('register/', views.registerUser, name='register'),
    path('login/', views.loginUser, name='login'),
    path('logout/', views.logoutUser, name='logout'),

    path('lists/', views.lists, name='list'),
    path('surface/', views.get_surface_by_id, name='surface'),
    path('surface_list/', views.surface_list, name="surface_list"),
    path('add_surface/', views.add_surface, name='add_surface'),
    path('delete_surface/', views.delete_surface, name='delete_surface'),
    path('edit_surface/', views.edit_surface, name='edit_surface'),

    path('add_cleaning_tip/', views.add_cleaning_tip, name='add_cleaning_tip'),
    path('delete_cleaning_tip/', views.delete_cleaning_tip, name='delete_cleaning_tip'),
    path('edit_cleaning_tip/', views.edit_cleaning_tip, name='edit_cleaning_tip'),
    path('cleaning/', views.get_cleaning_by_id, name='cleaning'),

    path('get_user/', views.get_user, name='get_user'),

    path('get_products/<str:product_q>/', views.get_products, name='products'),
]