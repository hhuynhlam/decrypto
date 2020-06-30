# pylint: disable=unused-wildcard-import,wildcard-import

from os import path
from .base import *


"""
Environment
"""
BASE_DIR = path.dirname(path.dirname(path.dirname(path.abspath(__file__))))


"""
Database
https://docs.djangoproject.com/en/3.0/ref/settings/#databases
"""

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': path.join(BASE_DIR, 'db.sqlite3'),
    }
}
