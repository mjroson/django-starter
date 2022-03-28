from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.conf import settings

from apps.auth.urls import urlpatterns as auth_urls
from apps.user.urls import urlpatterns as user_urls

api_urlpatterns = [
    path('auth/', include(auth_urls)),
    path('users/', include(user_urls)),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(api_urlpatterns)),
    path('', TemplateView.as_view(template_name='home.html')),
    
]

if settings.ENVIRONMENT == "dev":
    from rest_framework.authtoken import views
    urlpatterns += [
        path('api-token-auth/', views.obtain_auth_token)
    ]

# Add debug toolbar
if settings.DEBUG and "debug_toolbar" in settings.INSTALLED_APPS:
    import debug_toolbar

    urlpatterns = [
        path("__debug__/", include(debug_toolbar.urls)),
    ] + urlpatterns