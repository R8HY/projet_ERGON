from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.decorators import action
from rest_framework import viewsets
from rest_framework.mixins import CreateModelMixin, RetrieveModelMixin, DestroyModelMixin
from .models import Client, Societe, ParticulierImage
from .serializers import *
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db import IntegrityError
from rest_framework import permissions
from django.http import HttpResponse
from rest_framework.permissions import IsAuthenticated
# from django.utils import formats

# Create your views here.
class ClientViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny]  # Autoriser l'accès non authentifié
    http_method_names = ['get','post','patch', 'delete', 'head', 'options']

    queryset = Client.objects.all()
    serializer_class = ClientSerializer
 

    def create(self, request, *args, **kwargs):
        try:
            # Récupérez les données du formulaire React depuis la requête POST
            nom = request.data.get('nom')
            prenom = request.data.get('prenom')
            contact = request.data.get('contact')
            categorie = request.data.get("categorie")

            # Créez une nouvelle instance de ClientGuest avec les données
            client = Client(nom=nom, prenom=prenom, contact=contact, categorie=categorie)

            # Enregistrez l'instance dans la base de données
            client.save()

            # Répondez avec une confirmation de succès
            serializer = ClientSerializer(client)  # Vous pouvez utiliser un sérialiseur pour représenter l'objet dans la réponse
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
        except IntegrityError as e:
            # Gérez l'erreur d'intégrité
            return Response({'detail': 'Erreur d\'intégrité: ' + str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
        
class SocieteViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    http_method_names = ['get', 'post','patch', 'delete', 'head', 'options']
    queryset = Societe.objects.all()
    serializer_class = SocieteSerializer

    def create(self, request, *args, **kwargs):
        try:
            #recuperation des donnees du BD, alaina koa nen'ny parent
            nom = request.data.get('nom')
            prenom = request.data.get('prenom')
            contact = request.data.get('contact')
            nomSociete = request.data.get("nomSociete")
            domiciliation = request.data.get("domiciliation")
            email = request.data.get("email")
            nif = request.data.get("nif")
            stat = request.data.get("stat")
            
            clientSociete = Societe(nom=nom, prenom=prenom, contact=contact,nomSociete=nomSociete, domiciliation=domiciliation,
                                    email=email, nif=nif, stat=stat, categorie="Société")
            
            clientSociete.save() #antsoina amle instance-ny l izy fa tsy am l classe direct
            # client = Client(nom=nom, prenom=prenom, contact=contact, categorie="Societe")
            # client.save()
            serializer = SocieteSerializer(clientSociete)  # Vous pouvez utiliser un sérialiseur pour représenter l'objet dans la réponse
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
        except IntegrityError as e:
            # Gérez l'erreur d'intégrité
            return Response({'detail': 'Erreur d\'intégrité: ' + str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, *args, **kwargs):
        id = request.data.get('id')

        client_instance = Client.get_object_or_404(pk=id)
        particulier_instance = Paticulier.get_object_or_404(pk=id)

        client_instance.delete()
        particulier_instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ParticulierViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    http_method_names = ['get', 'post','patch', 'delete', 'head', 'options']
    queryset = Particulier.objects.all()
    serializer_class = ParticulierSerializer

    def create(self, request, *args, **kwargs):
        try:
            #recuperation des donnees du BD, alaina koa nen'ny parent
            nom = request.data.get('nom')
            prenom = request.data.get('prenom')
            contact = request.data.get('contact')
            dateNaiss = request.data.get("date_naissance")
            lieuNaiss = request.data.get("lieu_naissance")
            numCin = request.data.get("num_CIN")
            cinDelivrance = request.data.get("cin_date_delivrance")
            certificatResidence = request.data.get("certificat_residence")
            lieuResidence = request.data.get("lieu_residence")
            emailParticulier = request.data.get("email")

            clientParticulier = Particulier(nom=nom, prenom=prenom, contact=contact, date_naissance=dateNaiss, lieu_naissance=lieuNaiss,
                                        num_CIN=numCin, cin_date_delivrance=cinDelivrance, certificat_residence=certificatResidence, lieu_residence=lieuResidence,
                                        email=emailParticulier, categorie = "Particulier")
            
            clientParticulier.save() #antsoina amle instance-ny l izy fa tsy am l classe direct
            # client = Client(nom=nom, prenom=prenom, contact=contact, categorie="Particulier")
            # client.save()
            serializer = ParticulierSerializer(clientParticulier)  # Vous pouvez utiliser un sérialiseur pour représenter l'objet dans la réponse
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
        except IntegrityError as e:
            # Gérez l'erreur d'intégrité
            return Response({'detail': 'Erreur d\'intégrité: ' + str(e)}, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, *args, **kwargs):
        id = request.data.get('id')

        client_instance = Client.get_object_or_404(pk=id)
        particulier_instance = Paticulier.get_object_or_404(pk=id)

        client_instance.delete()
        particulier_instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
        
class RendezVousViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    http_method_names = ['get','post','patch', 'delete', 'head', 'options']

    queryset = RendezVous.objects.all()
    serializer_class = RendezVousSerializer
 

    def create(self, request, *args, **kwargs):
        try:
            # Récupérez les données du formulaire React depuis la requête POST
            nom = request.data.get('nom')
            prenom = request.data.get('prenom')
            contact = request.data.get('contact')
            dateRdv = request.data.get('dateRdv')
            motif = request.data.get('motif')

            # Créez une nouvelle instance de ClientGuest avec les données
            rdv = RendezVous(nom=nom, prenom=prenom, contact=contact, dateRdv=dateRdv, categorie="Guest", motif=motif)

            # Enregistrez l'instance dans la base de données
            rdv.save()

            # Répondez avec une confirmation de succès
            serializer = RendezVousSerializer(rdv)  # Vous pouvez utiliser un sérialiseur pour représenter l'objet dans la réponse
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    
        except IntegrityError as e:
            # Gérez l'erreur d'intégrité
            return Response({'detail': 'Erreur d\'intégrité: ' + str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        id = request.data.get('id')

        client_instance = Client.get_object_or_404(pk=id)
        rendezVous_instance = RendezVous.get_object_or_404(pk=id)

        client_instance.delete()
        rendezVous_instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class ParticulierImageViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    serializer_class = ParticulierImageSerializer

    def get_serializer_context(self):
        return {'particulier_id':self.kwargs['particulier_pk']}
    
    def get_queryset(self):
        return ParticulierImage.objects.filter(particulier_id=self.kwargs['particulier_pk']) #l ID ny Particulier am URL 
        #particulier_id: anarana omena azy      particulier_pk: l anaran'ny am URL


class EvenementViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    queryset = Evenement.objects.all()
    serializer_class = EvenementSerializer

class TypeProduitViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    queryset = TypeProduit.objects.all()
    serializer_class = TypeProduitSerializer

class ProduitViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    queryset = Produit.objects.all()
    serializer_class = ProduitSerializer

class CommandeViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    queryset = Commande.objects.all()
    
    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AjouterCommandeSerializer
        return CommandeSerializer

    def create(self, request, *args, **kwargs):
        panier_id = self.request.data['panier']
        date_debutLoc = self.request.data['date_debutLoc']
        date_finLoc= self.request.data['date_finLoc']
        etat_paiement = self.request.data['etat_paiement']
        locationSalle = self.request.data['locationSalle']
        locationDecoration = self.request.data['locationDecoration']
        locationProduit = self.request.data['locationProduit']
        # dateEntree = self.request.data['dateEntree']
        # dateSortie = self.request.data['dateSortie']
        # description = self.request.data['description']

        panier_instance = get_object_or_404(Panier, id=panier_id)
        commande = Commande(panier=panier_instance, 
                             date_debutLoc=date_debutLoc, 
                             date_finLoc=date_finLoc, 
                             etat_paiement=etat_paiement,
                             locationSalle=(locationSalle),
                             locationDecoration=(locationDecoration),
                             locationProduit=(locationProduit),
                             salleSetted=(False),
                             decorationsSetted=(False),
                             produitsSetted=(False),
                            #  dateEntree=dateEntree, 
                            #  dateSortie=dateSortie,
                            #  motif="Sortie de matériels",
                            #  description=description,
            )
        commande.save()

        articles = ArticlePanier.objects.filter(panier=panier_id)
        for article in articles:
            sortie = Sortie(commande=commande, produit=article.produit, articlePanier=article)
            sortie.save()

        response_data = {"id": commande.id, 'panier':panier_id}  # Incluez l'ID du panier dans la réponse

        return Response(response_data, status=status.HTTP_201_CREATED)

class PanierViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    queryset = Panier.objects.all()

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AjouterPanierSerializer
        return PanierSerializer

    def create(self, request, *args, **kwargs):
        client_id = self.request.data['client']
        client_instance = get_object_or_404(Client, id=client_id)
        panier = Panier(client=client_instance)
        panier.save()
        response_data = {"id": panier.id, 'client':client_id}  # Incluez l'ID du panier dans la réponse
        return Response(response_data, status=status.HTTP_201_CREATED)

class ArticlePanierViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AjoutArticlePanierSerializer
        return ArticlePanierSerializer
    
    def get_serializer_context(self):
        return {'panier_id':self.kwargs['panier_pk']}

    # def get_queryset(self):
    #     return ArticlePanier.objects\
    #         .filter(panier_id=self.kwargs['panier_pk'])\
    #         .select_related('produit')

    def get_queryset(self):
        panier_id = self.kwargs['panier_pk']
        return ArticlePanier.objects.filter(panier_id=panier_id).select_related('produit')

class CasseArticlePanierViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AjoutCasseArticlePanierSerializer
        return CasseArticlePanierSerializer
    
    def get_serializer_context(self):
        return {'panier_id':self.kwargs['panier_pk']}

    def get_queryset(self):
        panier_id = self.kwargs['panier_pk']
        return CasseArticlePanier.objects.filter(panier_id=panier_id).select_related('article')

class CasseSallePanierViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AjoutCasseSallePanierSerializer
        return CasseSallePanierSerializer
    
    def get_serializer_context(self):
        return {'panier_id':self.kwargs['panier_pk']}

    def get_queryset(self):
        panier_id = self.kwargs['panier_pk']
        return CasseSallePanier.objects.filter(panier_id=panier_id).select_related('salle')

class CasseDecorationPanierViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AjoutCasseDecorationPanierSerializer
        return CasseDecorationPanierSerializer
    
    def get_serializer_context(self):
        return {'panier_id':self.kwargs['panier_pk']}

    def get_queryset(self):
        panier_id = self.kwargs['panier_pk']
        return CasseDecorationPanier.objects.filter(panier_id=panier_id).select_related('decoration')

class ListeArticlePanierViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    queryset = ArticlePanier.objects.all()
    serializer_class = ListeArticlePanierSerializer

class ListeDecorationPanierViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    queryset = DecorationPanier.objects.all()
    serializer_class = ListeDecorationPanierSerializer

class ListeSallePanierViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    queryset = SallePanier.objects.all()
    serializer_class = ListeSallePanierSerializer

class PayementViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    queryset = PayementPanier.objects.all()
    serializer_class = PayementSerializer

class SortieViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    queryset = Sortie.objects.all()
    serializer_class = SortieSerializer

class HistoriqueViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    queryset = Historique.objects.all()
    serializer_class = HistoriqueSerializer

class NotificationViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

class DetailCasseViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    queryset = DetailCasse.objects.all()
    serializer_class = DetailCasseSerializer

#packages
class SalleViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    queryset = Salle.objects.all()
    serializer_class = SalleSerializer

class DecorationViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    queryset = Decoration.objects.all()
    serializer_class = DecorationSerializer


class TypeDecoViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    queryset = TypeDeco.objects.all()
    serializer_class = TypeDecoSerializer

class PackageViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    queryset = Package.objects.all()
    serializer_class = PackageSerializer

class ProduitPackageViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AjoutProduitPackageSerializer
        return ProduitPackageSerializer
    
    def get_serializer_context(self):
        return {'package_id':self.kwargs['package_pk']}

    # def get_queryset(self):
    #     return ArticlePanier.objects\
    #         .filter(panier_id=self.kwargs['panier_pk'])\
    #         .select_related('produit')

    def get_queryset(self):
        package_id = self.kwargs['package_pk']
        return ProduitPackage.objects.filter(package_id=package_id).select_related('produit')

class DecorationPanierViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AjoutDecorationPanierSerializer
        return DecorationPanierSerializer
    
    def get_serializer_context(self):
        return {'panier_id':self.kwargs['panier_pk']}
        
    def get_queryset(self):
        panier_id = self.kwargs['panier_pk']
        return DecorationPanier.objects.filter(panier_id=panier_id).select_related('decoration')

class ListDecorationPanierViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    queryset = DecorationPanier.objects.all()
    serializer_class = DecorationPanierSerializer

class ListProduitPackageViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    queryset = ProduitPackage.objects.all()
    serializer_class = ProduitPackageSerializer

class ListImagePackageViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    queryset = ImagePackage.objects.all()
    serializer_class = ImagePackageSerializer

class ImagePackageViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    queryset = ImagePackage.objects.all()
    serializer_class = ImagePackageSerializer

class CustomizedPackageViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    queryset = CustomizedPackage.objects.all()
    serializer_class = CustomizedPackageSerializer

class CommandePackageViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    queryset = CommandePackage.objects.all()
    serializer_class = CommandePackageSerializer
    
class SallePanierViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AjoutSallePanierSerializer
        return SallePanierSerializer

    def get_serializer_context(self):
        return {'panier_id':self.kwargs['panier_pk']}

    def get_queryset(self):
        panier_id = self.kwargs['panier_pk']
        return SallePanier.objects.filter(panier_id=panier_id).select_related('salle')

class PayementPanierViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AjoutPayementPanierSerializer
        return PayementPanierSerializer

    def get_serializer_context(self):
        return {'panier_id':self.kwargs['panier_pk']}

    def get_queryset(self):
        panier_id = self.kwargs['panier_pk']
        return PayementPanier.objects.filter(panier_id=panier_id)

    def create(self, request, *args, **kwargs):
        panier_id = self.kwargs['panier_pk']
        montant = self.request.data['montant']
        salle_instance = SallePanier.objects.filter(panier_id=panier_id)
        article_instance = ArticlePanier.objects.filter(panier_id=panier_id)
        deco_instance = DecorationPanier.objects.filter(panier_id=panier_id)
        frais_instance = FraisSuppPanier.objects.filter(panier_id=panier_id)
        panier_instance = get_object_or_404(Panier, id=panier_id)
        commande_instance =  get_object_or_404(Commande, panier_id=panier_id)
        total = 0
        for item in salle_instance:
            total+=int(item.salle.prix)
        for item in article_instance:
            total+=int(item.produit.prix_unitaire)*int(item.quantite)
        for item in deco_instance:
            total+=int(item.decoration.prix_unitaire)*int(item.quantite)
        for item in frais_instance:
            total+=int(item.montant)
            
        commande_instance.etat_paiement='C'
        commande_instance.save()
        

        if commande_instance.etat_paiement=='A' and  int(montant)+int(commande_instance.montant_payee) <= total:
            paymenent_instance =  PayementPanier(panier=panier_instance, montant=montant)
            paymenent_instance.save() 
            commande_instance.montant_payee+=int(montant)
            if int(commande_instance.montant_payee)==total:
                commande_instance.etat_paiement='C'
                commande_instance.save()
            else:
                commande_instance.save()

            response_data = {"montant": montant, 'panier':panier_id}  
            return Response(response_data, status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)

class PayementCassePanierViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AjoutPayementCassePanierSerializer
        return PayementCassePanierSerializer

    def get_serializer_context(self):
        return {'panier_id':self.kwargs['panier_pk']}

    def get_queryset(self):
        panier_id = self.kwargs['panier_pk']
        return PayementCassePanier.objects.filter(panier_id=panier_id)

    def create(self, request, *args, **kwargs):
        panier_id = self.kwargs['panier_pk']
        montant = self.request.data['montant']
        salle_instance = CasseSallePanier.objects.filter(panier_id=panier_id)
        article_instance = CasseArticlePanier.objects.filter(panier_id=panier_id)
        deco_instance = CasseDecorationPanier.objects.filter(panier_id=panier_id)
        frais_instance = FraisSuppCassePanier.objects.filter(panier_id=panier_id)
        payement_instance = PayementCassePanier.objects.filter(panier_id=panier_id)
        panier_instance = get_object_or_404(Panier, id=panier_id)
        commande_instance =  get_object_or_404(Commande, panier_id=panier_id)
        total = 0
        totalPayee = 0
        for item in salle_instance:
            total+=int(item.montant)
        for item in article_instance:
            total+=int(item.article.produit.prix_unitaire)*int(item.quantiteCasse)
        for item in deco_instance:
            total+=int(item.decoration.decoration.prix_unitaire)*int(item.quantiteCasse)
        for item in frais_instance:
            total+=int(item.montant)
        
        for item in payement_instance:
            totalPayee+=item(item.montant)
        

        if commande_instance.retour_checked==False and  int(montant)+totalPayee <= total:
            paymenent_instance = PayementCassePanier(panier=panier_instance, montant=montant)
            paymenent_instance.save() 
            if int(montant)+totalPayee==total:
                commande_instance.retour_checked=True
                commande_instance.save()
            else:
                commande_instance.save()

            response_data = {"montant": montant, 'panier':panier_id, date:'date'}  
            return Response(response_data, status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)
        

class FraisSuppPanierViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AjoutFraisSuppPanierSerializer
        return FraisSuppPanierSerializer

    def get_serializer_context(self):
        return {'panier_id':self.kwargs['panier_pk']}

    def get_queryset(self):
        panier_id = self.kwargs['panier_pk']
        return FraisSuppPanier.objects.filter(panier_id=panier_id)

class FraisSuppCassePanierViewSet(ModelViewSet):
    authentication_classes = []  # Désactiver l'authentification
    permission_classes = [permissions.AllowAny] 
    http_method_names = ['get', 'post', 'patch', 'delete']

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return AjoutFraisSuppCassePanierSerializer
        return FraisSuppCassePanierSerializer

    def get_serializer_context(self):
        return {'panier_id':self.kwargs['panier_pk']}

    def get_queryset(self):
        panier_id = self.kwargs['panier_pk']
        return FraisSuppCassePanier.objects.filter(panier_id=panier_id)

# class EmployerViewSet(ModelViewSet):
#     queryset = Employer.objects.all()
#     serializer_class = EmployerSerializer


# class LogoutView(ModelViewSet):
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         try:
#             # Vous pouvez nettoyer des données de session ou supprimer des tokens côté serveur si nécessaire
#             # Exemple: Si vous stockez des tokens côté serveur
#             request.user.auth_token.delete() # Supprimez le token associé à l'utilisateur

#             # Réponse pour indiquer la déconnexion réussie
#             return Response({"message": "Déconnexion réussie"}, status=status.HTTP_200_OK)
#         except Exception as e:
#             return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)