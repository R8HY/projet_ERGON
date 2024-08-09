from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from rest_framework import viewsets
from rest_framework.mixins import DestroyModelMixin
from .models import ClientGuest
from .serializers import *
from rest_framework import status
from rest_framework.response import Response
from django.db import IntegrityError
from django.http import HttpResponse

# Create your views here.
class ClientGuestViewSet(ModelViewSet):
    http_method_names = ['get', 'post','patch', 'delete', 'head', 'options']

    queryset = ClientGuest.objects.all()
    serializer_class = ClientGuestSerializer
 

    def create(self, request, *args, **kwargs):
        try:
            # Récupérez les données du formulaire React depuis la requête POST
            nom = request.data.get('nom')
            prenom = request.data.get('prenom')
            contact = request.data.get('contact')
            rdv = request.data.get('rdv')

            # Créez une nouvelle instance de ClientGuest avec les données
            client_guest = ClientGuest(nom=nom, prenom=prenom, contact=contact, rdv=rdv)

            # Enregistrez l'instance dans la base de données
            client_guest.save()

            # Répondez avec une confirmation de succès
            serializer = ClientGuestSerializer(client_guest)  # Vous pouvez utiliser un sérialiseur pour représenter l'objet dans la réponse
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
        except IntegrityError as e:
            # Gérez l'erreur d'intégrité
            return Response({'detail': 'Erreur d\'intégrité: ' + str(e)}, status=status.HTTP_400_BAD_REQUEST)
