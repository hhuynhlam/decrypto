"""
Django Settings

For more information on this file, see
https://docs.djangoproject.com/en/3.0/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.0/ref/settings/
"""

from os import environ, getenv, path
from dotenv import load_dotenv


"""
Environment
"""
BASE_DIR = path.dirname(path.dirname(path.dirname(path.abspath(__file__))))

load_dotenv(dotenv_path=path.join(path.dirname(BASE_DIR), '.env'), override=True)
load_dotenv(dotenv_path=path.join(path.dirname(BASE_DIR), '.env.local'), override=True)

DEBUG = bool(getenv('DJANGO_DEBUG', default=None))
SECRET_KEY = getenv('SECRET_KEY', default='1982wt6BXAhi6dN4ktE48xnTYkQmLzVOEj6tZ9etGIH2nwSE7l')


"""
Application
"""

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.humanize',
    'django.contrib.messages',
    'django.contrib.sessions',
    'django.contrib.staticfiles',

    'django_extensions',
    'rest_framework',
    'waffle',

    'api.apps.ApiConfig',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'waffle.middleware.WaffleMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            path.join(BASE_DIR, 'templates'),
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

ALLOWED_HOSTS = [
    '0.0.0.0',
    '127.0.0.1',
    'localhost',

    'api',          # docker-compose hostname alias
]


"""
Password Validation
https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators
"""

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


"""
Internationalization
https://docs.djangoproject.com/en/3.0/topics/i18n/
"""

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True


"""
Static files (CSS, JavaScript, Images)
https://docs.djangoproject.com/en/3.0/howto/static-files/
"""

STATICFILES_DIRS = [
    path.join(BASE_DIR, 'public')
]
STATIC_ROOT = path.join(BASE_DIR, 'static')
STATIC_URL = '/static/'


"""
Logging
"""

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'INFO',
        },
        'django.db.backends': {
            'handlers': ['console'],
            'level': 'DEBUG',
            'propagate': False,
        },
    },
}


"""
Database
https://docs.djangoproject.com/en/3.0/ref/settings/#databases
"""

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'HOST': environ['DB_HOST'],
        'NAME': environ['DB_NAME'],
        'PASSWORD': environ['DB_PASSWORD'],
        'PORT': environ['DB_PORT'],
        'USER': environ['DB_USER'],
    }
}
