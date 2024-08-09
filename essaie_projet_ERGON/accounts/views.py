from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework.viewsets import ModelViewSet
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from django.db import IntegrityError

# Create your views here.
class CategorieAccountViewSet(ModelViewSet):
    queryset = CategorieAccount.objects.all()
    serializer_class = CategorieAccountSerializer

class AccountViewSet(ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

class FluxCashViewSet(ModelViewSet):
    queryset = FluxCash.objects.all()
    serializer_class = FluxCashSerializer

    def create(self, request, *args, **kwargs):
        try:
            motif = request.data.get('motif')
            montant = int(request.data.get('montant'))
            date = request.data.get('date')
            description = request.data.get("description")
            crediteur_id = request.data.get("crediteur")
            debiteur_id = request.data.get("debiteur")
            
            crediteur = None
            debiteur = None
            possible = False

            if debiteur_id:
                debiteur = get_object_or_404(Account, id=debiteur_id)
                if debiteur.solde >= montant:
                    debiteur.solde -= montant
                    debiteur.save()
                    possible = True
            
            if crediteur_id:
                if debiteur is None or possible:
                    crediteur = get_object_or_404(Account, id=crediteur_id)
                    crediteur.solde += montant
                    crediteur.save()
            
            if debiteur is None or possible:
                flux = FluxCash(motif=motif, montant=montant, date=date, description=description,
                    crediteur=crediteur, debiteur=debiteur)
                flux.save()

            serializer = FluxCashSerializer(flux)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
        except IntegrityError as e:
            # Gérez l'erreur d'intégrité
            return Response({'detail': 'Erreur d\'intégrité: ' + str(e)}, status=status.HTTP_400_BAD_REQUEST)