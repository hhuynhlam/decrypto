"""
WSGI Config

For more information on this file, see
https://docs.djangoproject.com/en/3.0/howto/deployment/wsgi/
"""

import os
from django.core.wsgi import get_wsgi_application
from whitenoise import WhiteNoise

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.base')

application = WhiteNoise(get_wsgi_application(), root=os.path.join(BASE_DIR, 'public'))
