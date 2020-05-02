# Boilerplate for start real projects with docker, django, celery, rabbitmq, postgresql, nginx and reactjs.

## Deploy

### Local deploy:

1. Copy docker-compose.local.yml to docker-compose.override.yml
   `cp docker-compose.local.yml docker-compose.overide.yml`
2. Copy the environment file
   `cp .env.local .env`
3. Up project
   `docker-compose up`

### Production deploy

Assume you have server and configure dns.

1. Copy docker-compose.local.yml to docker-compose.override.yml
   `cp docker-compose.prod.yml docker-compose.overide.yml`
2. Copy the environment file
   `cp .env.prod .env`
3. Up project
   `docker-compose up`

## Utils commands

**Generate graph models**
More info: https://django-extensions.readthedocs.io/en/latest/graph_models.html

`docker-compose run --rm backend python manage.py graph_models -a -g -o models.png`

**Shell plus**
More info: https://django-extensions.readthedocs.io/en/latest/shell_plus.html
`docker-compose run --rm backend python manage.py shell_plus`

**Django development server plus**
More info: https://django-extensions.readthedocs.io/en/latest/runserver_plus.html
`docker-compose run --rm --service-port backend python manage.py runserver_plus 0.0.0.0:8000`

## Utils resources

### Infra

Use image cerbot to automatic renovation lentscrypt ssl certificate (https://github.com/wmnnd/nginx-certbot) based to https://medium.com/@pentacent/nginx-and-lets-encrypt-with-docker-in-less-than-5-minutes-b4b8a60d3a71

### Backend

Django extensions ( custom management extensions for the Django Framework )
https://github.com/django-extensions/django-extensions

Django Rest framework
https://www.django-rest-framework.org/

JSON Web Token for django rest framework
https://github.com/davesque/django-rest-framework-simplejwt

Celery with django
https://docs.celeryproject.org/en/latest/django/first-steps-with-django.html

Support to CORS HEADER
https://github.com/adamchainz/django-cors-headers

Celery task results in django admin
http://docs.celeryproject.org/en/latest/django/first-steps-with-django.html#django-celery-results-using-the-django-orm-cache-as-a-result-backend

Celery Periodic Tasks backed by the Django ORM
https://github.com/celery/django-celery-beat

### Frontend

The project is in other repository https://github.com/mjroson/frontend-admin-start
