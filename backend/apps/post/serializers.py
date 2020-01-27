
from rest_framework.serializers import ModelSerializer
from .models import Post


class PostModelSerializer(ModelSerializer):

    class Meta:
        model = Post
        fields = ('id', 'title')
