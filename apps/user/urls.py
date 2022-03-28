from django.urls import path, include

from rest_framework.routers import DefaultRouter
from .views import UserModelViewSet


app_name = "user"

router = DefaultRouter()
router.register("", UserModelViewSet, basename="user")

# Routers
urlpatterns = [
    path("", include(router.urls))
]
