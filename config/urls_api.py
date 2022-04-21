from django.urls import path, include

from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

from rest_framework.routers import DefaultRouter

from apps.auth.urls import urlpatterns as auth_urls

from apps.user.views import UserModelViewSet


router = DefaultRouter()
router.register("users", UserModelViewSet, basename="user")

urlpatterns = [
    path('auth/', include((auth_urls, "auth"))),

    # YOUR PATTERNS
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    # Optional UI:
    path('schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='api:schema'), name='swagger-ui'),
    path('schema/redoc/', SpectacularRedocView.as_view(url_name='api:schema'), name='redoc'),


    path("", include((router.urls, 'api'), namespace="api"))
]