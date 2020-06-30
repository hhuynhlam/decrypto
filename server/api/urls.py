from django.urls import include, path
from rest_framework import routers
from . import views


app_name = 'api'

ROUTER = routers.DefaultRouter()

ROUTER.register('health', views.HealthViewSet, basename='health')

urlpatterns = [
    path('', include(ROUTER.urls)),
]
