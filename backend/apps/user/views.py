from django.contrib.auth import get_user_model
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from .serializers import UserModelSerializer
from .filters import UserFilterSet


class UserModelViewSet(ModelViewSet):
    queryset = get_user_model().objects.filter(is_superuser=False)
    serializer_class = UserModelSerializer
    search_fields = ['username', 'email']
    #filterset_fields = '__all__'
    filter_class = UserFilterSet
    ordering_fields = '__all__'
