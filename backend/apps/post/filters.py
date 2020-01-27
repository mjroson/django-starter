from django_filters import FilterSet
from .models import Post


class PostFilterSet(FilterSet):
    
    class Meta:
        model = Post
        fields = ['id', 'title']
