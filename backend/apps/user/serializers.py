
from rest_framework.serializers import ModelSerializer
from django.contrib.auth import get_user_model


class UserModelSerializer(ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ('id', 'last_login', 'username', 'first_name', 'last_name',
                  'email', 'is_staff', 'is_active', 'date_joined')
