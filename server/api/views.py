from rest_framework import status, viewsets
from rest_framework.response import Response

class HealthViewSet(viewsets.ViewSet):
    def list(self, request):
        return Response('OK', status=status.HTTP_200_OK)
