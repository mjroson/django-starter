from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings

from .urls_api import urlpatterns as api_urlpatterns


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include((api_urlpatterns, 'api'))),
    path('', TemplateView.as_view(template_name='home.html')),
]

if settings.ENVIRONMENT == "dev":
    urlpatterns = [
        path('api/drf/auth/', include('rest_framework.urls', namespace='rest_framework')),
    ] + urlpatterns

# Add debug toolbar
if settings.DEBUG and "debug_toolbar" in settings.INSTALLED_APPS:
    import debug_toolbar

    urlpatterns = [
        path("__debug__/", include(debug_toolbar.urls)),
    ] + urlpatterns