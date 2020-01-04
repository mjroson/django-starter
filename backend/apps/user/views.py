from django.contrib.auth import get_user_model
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from .serializers import UserModelSerializer


class UserModelViewSet(ModelViewSet):
    queryset = get_user_model().objects.filter(is_superuser=False)
    serializer_class = UserModelSerializer
    search_fields = ['username', 'email']
    filterset_fields = '__all__'
    ordering_fields = '__all__'
