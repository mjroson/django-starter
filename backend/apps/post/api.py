from rest_framework.viewsets import ModelViewSet

from .models import Post
from .serializers import PostModelSerializer
from .filters import PostFilterSet


class PostModelViewSet(ModelViewSet):
    queryset = Post.objects.filter()
    serializer_class = PostModelSerializer
    search_fields = ['title']
    #filterset_fields = '__all__'
    filter_class = PostFilterSet
    ordering_fields = '__all__'
