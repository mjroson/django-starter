from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

from apps.auth.urls import urlpatterns as auth_urls
from apps.user.urls import urlpatterns as user_urls
from apps.post.api_urls import urlpatterns as api_post_urls

api_urlpatterns = [
    path('auth/', include(auth_urls)),
    path('users/', include(user_urls)),
    path('post/', include(api_post_urls))
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(api_urlpatterns)),
    path('', TemplateView.as_view(template_name='home.html')),
]
