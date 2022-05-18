import names

from django.core.management.base import BaseCommand, CommandError
from django.db.utils import IntegrityError
from django.contrib.auth import get_user_model


class Command(BaseCommand):
    help = """
    Create random users.
    
    For run this command need to have to "names" python dependency.
    Intall it with "pip install names".
    """

    def add_arguments(self, parser):
        parser.add_argument('quantity', type=int, default=10)

    def handle(self, *args, **options):
        User = get_user_model()
        for i in range(options['quantity']):
            try:
                first_name, last_name = names.get_full_name().split(" ")
            except ModuleNotFoundError:
                print("Install names library with 'pip install names' before to run this command. ")

            try:
                User.objects.create(
                    first_name=first_name,
                    last_name=last_name,
                    username=f"{first_name[0]}{last_name.lower()}",
                    email=f"{first_name.lower()}_{last_name.lower()}@mail.com"
                )
            except IntegrityError:
                pass
