"""
Django settings.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

from datetime import timedelta
import sys
import os
from pathlib import Path
import environ
import warnings

env = environ.Env()


ENVIRONMENT = env("ENVIRONMENT")

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Add apps to sys.path
sys.path.insert(0, BASE_DIR.joinpath("apps"))


if not env('SECRET_KEY'):
    warnings.warn((
        "Please define SECRET_KEY before importing {0}, as a fallback "
        "for when the environment variable is not available."
    ).format(__name__))
else:
    SECRET_KEY = env('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env.bool("DJANGO_DEBUG")

ALLOWED_HOSTS = env.list('DJANGO_ALLOWED_HOST', default=["*"])

CSRF_TRUSTED_ORIGINS = ['http://localhost:8000', 'http://127.0.0.1']


###############################################################################
#  Application definition
###############################################################################

INSTALLED_APPS = [
    # Thirds apps
    'django_celery_results',
    'django_celery_beat',

    'django_extensions',

    'rest_framework',
    'django_filters',
    'corsheaders',

    'drf_spectacular', # Swagger 

    # My apps
    'apps.core',
    'apps.auth',
    'apps.user',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

]

###############################################################################
#  MIDDLEWARE
###############################################################################
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# if env("ENVIRONMENT", "dev") == 'dev':
#    MIDDLEWARE.append('apps.core.middleware.dev_cors_middleware')

###############################################################################
#  TEMPLATES CONFIG
###############################################################################

APP_DIRS = True

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            BASE_DIR.joinpath("config/templates"),
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'
ROOT_URLCONF = 'config.urls'


###############################################################################
# DATABASE CONFIG
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases
###############################################################################

# DATABASES = {"default": env.db("DATABASE_URL")}
DATABASES = {
    'default': {
        'ENGINE': env('DB_ENGINE'),
        'NAME': env('DB_NAME'),
        'USER': env('DB_USER'),
        'PASSWORD': env('DB_PASS'),
        'HOST': env('DB_HOST'),
        'PORT': env('DB_PORT'),
    }
}

###############################################################################
#  AUTHENTICATION CONFIG
###############################################################################

# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


###############################################################################
# LOCALES & LANG
###############################################################################

# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


###############################################################################
# STATIC FILES
###############################################################################
# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, "../static")

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "static"),
]

###############################################################################
# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field
###############################################################################

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

###############################################################################
# CONFIG CELERY AND RABBITMQ
###############################################################################

# More info : http://docs.celeryproject.org/en/master/userguide/configuration.html#broker-url
BROKER_URL = "amqp://{user}:{password}@rabbitmq:5672//?heartbeat=30".format(
    user=env('RABBITMQ_DEFAULT_USER'),
    password=env('RABBITMQ_DEFAULT_PASS')
)

broker_url = BROKER_URL
CELERY_BROKER_URL = broker_url


# Define static schedule example:
#
# from celery.schedules import crontab
# from datetime import timedelta
# CELERYBEAT_SCHEDULE = {
#     'cron_task': {
#         'task': 'tasks.prisma_scrapper',
#         #'schedule': crontab(hour=23, minute=5),
#         #'schedule': crontab(minute='*/1'),
#         'schedule': timedelta(minutes=2),
#     },
# }


# Configure celery results backend
# More info: http://docs.celeryproject.org/en/master/django/first-steps-with-django.html#using-celery-with-django
CELERY_RESULT_BACKEND = 'django-db'

CELERY_TIMEZONE = TIME_ZONE
CELERY_ENABLE_UTC = TIME_ZONE == 'UTC'


###############################################################################
# CONFIG DEFAULTS DJANGO REST FRAMEWORK
# https://www.django-rest-framework.org/api-guide/settings/
###############################################################################


DEFAULT_RENDERER_CLASSES = [
    "rest_framework.renderers.JSONRenderer",
]

if ENVIRONMENT != "prod":
    DEFAULT_RENDERER_CLASSES += [
        "rest_framework.renderers.BrowsableAPIRenderer",
    ]


REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        # "oauth2_provider.contrib.rest_framework.OAuth2Authentication",
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ],
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.OrderingFilter',
        'rest_framework.filters.SearchFilter',
    ],
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'DEFAULT_RENDERER_CLASSES': DEFAULT_RENDERER_CLASSES,
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
    'DEFAULT_PAGINATION_CLASS': 'apps.core.pagination.CustomPageNumberPagination',
    'PAGE_SIZE': 10
}


SPECTACULAR_SETTINGS = {
    'TITLE': 'Your Project API',
    'DESCRIPTION': 'Your project description',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
    # OTHER SETTINGS
    'SCHEMA_PATH_PREFIX': '/api'
}



###############################################################################
# CONFIG CORS DOMAIN
# https://github.com/adamchainz/django-cors-headers#configuration
###############################################################################

CORS_ORIGIN_ALLOW_ALL = True


###############################################################################
# CONFIG JSON WEB TOKEN
# https://django-rest-framework-simplejwt.readthedocs.io/en/latest/settings.html
###############################################################################

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,

    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,

    'AUTH_HEADER_TYPES': ('Bearer',),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',

    'JTI_CLAIM': 'jti',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}


###############################################################################
# A list of all the people who get code error notifications
# https://docs.djangoproject.com/en/4.0/ref/settings/#admins
###############################################################################

ADMINS = [("Admin", env("ADMIN_EMAIL"))]