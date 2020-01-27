from django.urls import path, include

from rest_framework.routers import DefaultRouter
from .api import PostModelViewSet


app_name = "post"

router = DefaultRouter()
router.register("", PostModelViewSet, basename="post")

# Routers
urlpatterns = [
    path("", include(router.urls))
]
