#!/usr/bin/env bash

if [ "$ENVIRONMENT" = "local" ]; then
	echo "[run] make migrations"
	python3 manage.py makemigrations || exit 1
fi

echo "[run] Migrate DB"
python3 manage.py migrate || exit 1

if [ "$ENVIRONMENT" != "local" ]; then
	echo "[run] Collect static files ${ENVIRONMENT}"
	python3 manage.py collectstatic --noinput
	chmod -R 777 ./static
fi


echo "[run] Create superuser"
echo "from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(is_superuser=True).exists():
   user = User()
   user.first_name = 'Admin'
   user.last_name = 'Dev'
   user.is_superuser = True
   user.is_staff = True
   user.set_password('qwerty123')
   user.email = 'matiroson@gmail.com'
   user.username = 'admin'
   user.save()
" | python3 manage.py shell || exit 1


[ "$ENVIRONMENT" = local ] &&
	python3 manage.py runserver 0.0.0.0:8000

[ "$ENVIRONMENT" != local ] &&
	gunicorn config.wsgi:application --bind 0.0.0.0:8000 --log-level=info --timeout=500


