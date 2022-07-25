from django.contrib import admin
from django.urls import path, include
from . import views
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('', views.home, name='home'),

    path('<int:category_id>/', views.list_posts, name = "list_posts"),

    path('add_category/', views.add_category, name='add_category'),

    path('<int:category_id>/edit_category/', views.edit_category, name='edit_category'),

    path('<int:category_id>/delete_category', views.delete_category, name='delete_category'),

    path('<int:category_id>/posts/<int:post_id>/', views.post_info, name='post_info'),

    path('<int:category_id>/posts/new',views.add_post, name='add_post'),

    path('<int:category_id>/posts/<int:post_id>/edit', views.edit_post, name = 'edit_post'),

    path('<int:category_id>/posts/<int:post_id>/delete', views.delete_post, name='delete_post')
]

if settings.DEBUG:
     import debug_toolbar
     urlpatterns += [path('__debug__/', include(debug_toolbar.urls))]
     urlpatterns += static(settings.MEDIA_URL,
                      document_root=settings.MEDIA_ROOT)