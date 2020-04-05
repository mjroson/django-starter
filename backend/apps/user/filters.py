
from django_filters import FilterSet, DateFromToRangeFilter, DateFilter
from django.contrib.auth import get_user_model


class UserFilterSet(FilterSet):
    date_joined_range = DateFromToRangeFilter(field_name='date_joined')
    date_joined = DateFilter()

    class Meta:
        model = get_user_model()
        fields = ['email', 'last_name', 'first_name',
                  'date_joined', 'date_joined_range']
