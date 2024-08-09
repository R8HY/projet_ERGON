from .models import ClientGuest
from rest_framework import serializers

class ClientGuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientGuest
        fields = ['nom', 'prenom', 'contact', 'rdv']

