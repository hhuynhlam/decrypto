from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

class HealthTests(APITestCase):
    def test_list(self):
        url = reverse('api:health-list')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
