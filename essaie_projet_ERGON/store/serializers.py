from .models import *
from rest_framework import serializers
from django.shortcuts import get_object_or_404

    
class ParticulierImageSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        particulier_id = self.context['particulier_id']
        return ParticulierImage.objects.create(particulier_id=particulier_id, **validated_data)
    
class HahitantsoaParticulierImageSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        hahitantsoaParticulier_id = self.context['hahitantsoaParticulier_id']
        return HahitantsoaParticulierImage.objects.create(hahitantsoaParticulier_id=hahitantsoaParticulier_id, **validated_data)
    
    class Meta:
        model = ParticulierImage
        fields = ['id', 'image']

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'nom', 'prenom', 'contact', 'categorie', "date_ajout"]

# class GuestSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Guest
#         fields = ['id', 'nom', 'prenom', 'contact', 'categorie']

class SocieteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Societe
        fields = ['id', 'nom', 'prenom', 'contact',  'categorie', 'nomSociete', 'domiciliation', 'email', 'nif', 'stat', 'client_ptr_id', "date_ajout"]

class ParticulierSerializer(serializers.ModelSerializer):
    images = ParticulierImageSerializer(many=True, read_only=True) #tsy maintsy images l anarany champs
    #manampy champs anasina anle image zany io
    class Meta:
        model = Particulier
        fields = ['id','nom', 'prenom', 'contact',  'categorie', 'date_naissance', 'lieu_naissance',
                  'num_CIN', 'cin_date_delivrance', 'certificat_residence', 'lieu_residence', 'email', 'images', 'client_ptr_id', "date_ajout"]
        

class RendezVousSerializer(serializers.ModelSerializer):
    categorie = serializers.SerializerMethodField

    def get_categorie(self, rdv:RendezVous):
        return "Guest"

    class Meta:
        model = RendezVous
        fields = ['id', 'nom', 'prenom', 'contact', 'dateRdv', 'motif', 'client_ptr_id']


class EvenementSerializer(serializers.ModelSerializer):
    nomClient=serializers.StringRelatedField(source='commande.panier.client.nom')
    prenomClient=serializers.StringRelatedField(source='commande.panier.client.prenom')

    class Meta:
        model = Evenement
        fields =['id','description', 'date', 'nbPersonne', 'commande', 'nomClient', 'prenomClient']
      
class TypeProduitSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeProduit
        fields = ['id','categorie']

class ProduitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produit
        fields = ['id', 'image', 'nomProduit', 'prix_unitaire', 'nombre', 'dernier_modification'
                  , 'type_produit', 'description']
        
# class ProduitDansPanierSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Produit
#         fields = ['nomProduit', 'prix_unitaire']

# class ArticlePanierSerializer(serializers.ModelSerializer):
#     produit = ProduitDansPanierSerializer()
#     prix_total = serializers.SerializerMethodField()

#     def get_prix_total(self, article:ArticlePanier):
#         return (article.quantite * article.produit.prix_unitaire)

#     class Meta:
#         model = ArticlePanier
#         fields = ['id', 'produit','quantite', 'prix_total']

class PanierSerializer(serializers.ModelSerializer):
    # articles = ArticlePanierSerializer(many=True)
    # montant_total = serializers.SerializerMethodField()
    montant_total = serializers.SerializerMethodField()
    nomClient = serializers.SerializerMethodField()
    categorieClient = serializers.SerializerMethodField()

    def get_montant_total(self, articles_panier: Panier):
        return sum([article.quantite *  article.produit.prix_unitaire for article in articles_panier.articles.all()])

    def get_nomClient(self, panier: Panier):
        return panier.client.nom
    
    def get_categorieClient(self, panier: Panier):
        return panier.client.categorie

    class Meta:
        model = Panier
        fields = ['id', 'client', 'nomClient', 'categorieClient', 'montant_total', 'date_creation']

class AjouterPanierSerializer(serializers.ModelSerializer):
    # articles = ArticlePanierSerializer(many=True)
    # montant_total = serializers.SerializerMethodField()
    class Meta:
        model = Panier
        fields = ['client']

class ArticlePanierSerializer(serializers.ModelSerializer):
    prix_total = serializers.SerializerMethodField()
    nomP = serializers.SerializerMethodField()
    prix_unitaireP = serializers.SerializerMethodField()
    def get_prix_total(self, article:ArticlePanier):
        return (article.quantite * article.produit.prix_unitaire)
    
    def get_nomP(self, article:ArticlePanier):
        return article.produit.nomProduit
    
    def get_prix_unitaireP(self, article:ArticlePanier):
        return article.produit.prix_unitaire

    class Meta:
        model = ArticlePanier
        fields = ['id','panier', 'produit', 'nomP', 'prix_unitaireP', 'quantite', 'prix_total']

# class PanierSerializer(serializers.ModelSerializer):
#     produit = serializers.StringRelatedField(source='article.produit.nomProduit')
#     quantite = serializers.IntegerField(source='article.quantite')
#     class Meta:
#         model = Panier
#         fields = ['id', 'date_creation', 'produit', 'quantite']

        
class AjoutArticlePanierSerializer(serializers.ModelSerializer):
    # //produit_nom = serializers.CharField()

    def validate_produit_id(self, value):
        if not Produit.objects.filter(pk=value).exists():
            raise serializers.ValidationError('No product with the id')
        return value
    
    def save(self, **kwargs):
        panier_id = self.context['panier_id']
        produit_id = self.validated_data['produit']
        quantite = self.validated_data['quantite']

        try:
            article_panier = ArticlePanier.objects.get(panier_id=panier_id, produit_id=produit_id)
            article_panier.quantite += quantite
            article_panier.save()
            commande = get_object_or_404(Commande, panier_id=panier_id)
            commande.produitsSetted = True
            commande.commande_passee = True
            commande.save()
            self.instance = article_panier

        except ArticlePanier.DoesNotExist:
            commande = get_object_or_404(Commande, panier_id=panier_id)
            commande.produitsSetted = True
            commande.commande_passee = True
            commande.save()
            self.instance = ArticlePanier.objects.create(panier_id=panier_id, **self.validated_data)
            
    class Meta:
        model = ArticlePanier
        fields = ['id', 'panier_id','produit','quantite']

class CommandeSerializer(serializers.ModelSerializer):
    nomClient = serializers.SerializerMethodField()

    def get_nomClient(self, commande:Commande):
        name=""
        if commande.panier.client.categorie=="Particulier":
            client = commande.panier.client.id
            name = get_object_or_404(Particulier, id=client).nom+" "+get_object_or_404(Particulier, id=client).prenom
        else:
            client = commande.panier.client.id
            name = get_object_or_404(Societe, id=client).nomSociete
        return name

    class Meta:
        model = Commande
        fields = ['id', 'panier', 'date_commande', 'date_debutLoc', 'date_finLoc', 'etat_paiement', 'montant_payee', 'nomClient',
            'locationSalle', 'locationProduit', 'locationDecoration','salleSetted','produitsSetted', 'commande_passee','decorationsSetted', 'retour_checked', 'payement_casse', 'organised']

class AjouterCommandeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commande
        fields = ['panier','date_commande','date_debutLoc', 'date_finLoc', 'etat_paiement','locationSalle',
         'locationProduit', 'locationDecoration']

class SortieSerializer(serializers.ModelSerializer):
    dateSortie = serializers.SerializerMethodField()
    quantiteLouee = serializers.SerializerMethodField()
    motif = "Sortie de matériels"
    description = serializers.SerializerMethodField()

    def get_dateSortie(self, sortie:Sortie):
        return sortie.commande.dateSortie
    
    def get_quantiteLouee(self, sortie:Sortie):
        id_panier = sortie.commande.panier.id
        produit_id = sortie.produit.id

        # Récupérer la quantité correspondante dans l'ArticlePanier
        article = ArticlePanier.objects.filter(panier=id_panier, produit=produit_id).first()
        
        return article.quantite if article else None
    
    def get_description(self, sortie:Sortie):
        return sortie.commande.description

    class Meta:
        model = Sortie
        fields = ['dateSortie', 'produit', 'quantiteLouee', 'motif', 'description']

class DetailCasseSerializer(serializers.ModelSerializer):
    quantiteLouee = serializers.SerializerMethodField()
    dateEntree = serializers.SerializerMethodField()

    def get_dateSortie(self, casse:DetailCasse):
        return casse.commande.dateEntree

    def get_quantiteLouee(self, casse:DetailCasse):
        id_panier = casse.commande.panier.id
        produit_id = casse.produit.id

        # Récupérer la quantité correspondante dans l'ArticlePanier
        article = ArticlePanier.objects.filter(panier=id_panier, produit=produit_id).first()
        
        return article.quantite if article else None
    
    class Meta:
        model = DetailCasse
        fields = ['dateEntree','quantiteLouee']

#####Packages######

class SalleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salle
        fields = '__all__'

class PayementSerializer(serializers.ModelSerializer):
    nomClient = serializers.StringRelatedField(source='panier.client.nom')
    prenomClient = serializers.StringRelatedField(source='panier.client.prenom')

    class Meta:
        model = PayementPanier
        fields = ['id', 'date', 'montant', 'panier', 'nomClient', 'prenomClient']

class ListeArticlePanierSerializer(serializers.ModelSerializer):
    dateEvent = serializers.SerializerMethodField()
    nomEvent = serializers.SerializerMethodField()
    ressource = serializers.SerializerMethodField()
    client = serializers.SerializerMethodField()

    def get_client(self, art:SallePanier):
        commande = get_object_or_404(Commande, panier_id=art.panier)
        client = commande.panier.client
        return client.nom+" "+client.prenom
    
    def get_ressource(self, art:ArticlePanier):
        return art.produit.id

    def get_dateEvent(self, art:ArticlePanier):
        commande = get_object_or_404(Commande, panier_id=art.panier)
        event = get_object_or_404(Evenement, commande_id=commande.id)
        return event.date

    def get_nomEvent(self, art:ArticlePanier):
        commande = get_object_or_404(Commande, panier_id=art.panier)
        event = get_object_or_404(Evenement, commande_id=commande.id)
        return event.description

    class Meta:
        model = ArticlePanier
        fields = ['id', 'quantite', 'dateEvent', 'nomEvent', 'ressource', 'client']

class ListeDecorationPanierSerializer(serializers.ModelSerializer):
    dateEvent = serializers.SerializerMethodField()
    nomEvent = serializers.SerializerMethodField()
    ressource = serializers.SerializerMethodField()
    client = serializers.SerializerMethodField()

    def get_client(self, art:SallePanier):
        commande = get_object_or_404(Commande, panier_id=art.panier)
        client = commande.panier.client
        return client.nom+" "+client.prenom
    
    def get_ressource(self, art:DecorationPanier):
        return art.decoration.id

    def get_dateEvent(self, art:DecorationPanier):
        commande = get_object_or_404(Commande, panier_id=art.panier)
        event = get_object_or_404(Evenement, commande_id=commande.id)
        return event.date

    def get_nomEvent(self, art:DecorationPanier):
        commande = get_object_or_404(Commande, panier_id=art.panier)
        event = get_object_or_404(Evenement, commande_id=commande.id)
        return event.description

    class Meta:
        model = DecorationPanier
        fields = ['id', 'quantite', 'dateEvent', 'nomEvent', 'ressource', 'client']

class ListeSallePanierSerializer(serializers.ModelSerializer):
    dateEvent = serializers.SerializerMethodField()
    nomEvent = serializers.SerializerMethodField()
    ressource = serializers.SerializerMethodField()
    client = serializers.SerializerMethodField()

    def get_client(self, art:SallePanier):
        commande = get_object_or_404(Commande, panier_id=art.panier)
        client = commande.panier.client
        return client.nom+" "+client.prenom

    def get_ressource(self, art:SallePanier):
        return art.salle.id

    def get_dateEvent(self, art:SallePanier):
        commande = get_object_or_404(Commande, panier_id=art.panier)
        event = get_object_or_404(Evenement, commande_id=commande.id)
        return event.date

    def get_nomEvent(self, art:SallePanier):
        commande = get_object_or_404(Commande, panier_id=art.panier)
        event = get_object_or_404(Evenement, commande_id=commande.id)
        return event.description

    class Meta:
        model = SallePanier
        fields = ['dateEvent', 'nomEvent', 'ressource', 'client']

class HistoriqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Historique
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

class ImagePackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImagePackage
        fields = '__all__'

class DecorationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Decoration
        fields = '__all__'

class TypeDecoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeDeco
        fields = '__all__'

class PackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = '__all__'

class ProduitPackageSerializer(serializers.ModelSerializer):
    nomProduit = serializers.StringRelatedField(source='produit.nomProduit')
    image = serializers.CharField(source='produit.image')

    class Meta:
        model = ProduitPackage
        fields = ['package', 'produit', 'nomProduit', 'image']

class SallePanierSerializer(serializers.ModelSerializer):
    nomSalle = serializers.StringRelatedField(source='salle.nom')
    descSalle = serializers.StringRelatedField(source='salle.description')
    image = serializers.CharField(source='salle.image')
    prixSalle = serializers.IntegerField(source='salle.prix')

    class Meta:
        model = SallePanier
        fields = ['id', 'panier', 'salle', 'nomSalle', 'descSalle', 'prixSalle', 'image']

class AjoutSallePanierSerializer(serializers.ModelSerializer):
    # //produit_nom = serializers.CharField()

    def validate_salle_id(self, value):
        if not Salle.objects.filter(pk=value).exists():
            raise serializers.ValidationError('No product with the id')
        return value
    
    def save(self, **kwargs):
        panier_id = self.context['panier_id']
        salle_id = self.validated_data['salle']

        try:
            article_panier = SallePanier.objects.get(panier_id=panier_id, salle_id=salle_id)
            commande = get_object_or_404(Commande, panier_id=panier_id)
            commande.salleSetted = True
            commande.commande_passee = True
            commande.save()
            self.instance = article_panier

        except:
            commande = get_object_or_404(Commande, panier_id=panier_id)
            commande.salleSetted = True
            commande.commande_passee = True
            commande.save()
            self.instance = SallePanier.objects.create(panier_id=panier_id, **self.validated_data)
            
    class Meta:
        model = SallePanier
        fields = ['panier_id','salle']

class CasseArticlePanierSerializer(serializers.ModelSerializer):
    nomP = serializers.StringRelatedField(source='article.produit.nomProduit')
    prixP = serializers.StringRelatedField(source='article.produit.prix_unitaire')

    class Meta:
        model = CasseArticlePanier
        fields = ['id','panier', 'nomP', 'article', 'quantiteCasse', 'prixP']


class AjoutCasseArticlePanierSerializer(serializers.ModelSerializer):
    # //produit_nom = serializers.CharField()

    def validate_article_id(self, value):
        if not ArticlePanier.objects.filter(pk=value).exists():
            raise serializers.ValidationError('No product with the id')
        return value
    
    def save(self, **kwargs):
        panier_id = self.context['panier_id']
        article_id = self.validated_data['article']
        quantiteCasse = self.validated_data['quantiteCasse']

        try:
            casse_panier = CasseArticlePanier.objects.get(panier_id=panier_id, produit_id=article_id)
            casse_panier.quantiteCasse+=quantiteCasse
            casse_panier.save()
            self.instance = casse_panier

        except:
            self.instance = CasseArticlePanier.objects.create(panier_id=panier_id, **self.validated_data)
            
    class Meta:
        model = CasseArticlePanier
        fields = ['panier_id', 'article', 'quantiteCasse']

class CasseDecorationPanierSerializer(serializers.ModelSerializer):
    nomDecoration = serializers.StringRelatedField(source='decoration.decoration.nom')
    prixDecoration = serializers.StringRelatedField(source='decoration.decoration.prix_unitaire')

    class Meta:
        model = CasseDecorationPanier
        fields = ['id','panier', 'decoration', 'nomDecoration', 'quantiteCasse', 'prixDecoration']


class AjoutCasseDecorationPanierSerializer(serializers.ModelSerializer):
    # //produit_nom = serializers.CharField()

    def validate_decoration_id(self, value):
        if not DecorationPanier.objects.filter(pk=value).exists():
            raise serializers.ValidationError('No product with the id')
        return value
    
    def save(self, **kwargs):
        panier_id = self.context['panier_id']
        article_id = self.validated_data['decoration']
        quantiteCasse = self.validated_data['quantiteCasse']

        try:
            casse_panier = CasseDecorationPanier.objects.get(panier_id=panier_id, decoration_id=article_id)
            casse_panier.quantiteCasse+=quantiteCasse
            casse_panier.save()
            self.instance = casse_panier

        except:
            self.instance = CasseDecorationPanier.objects.create(panier_id=panier_id, **self.validated_data)
            
    class Meta:
        model = CasseDecorationPanier
        fields = ['panier_id', 'decoration', 'quantiteCasse']

class CasseSallePanierSerializer(serializers.ModelSerializer):
    nomSalle = serializers.StringRelatedField(source='salle.salle.nom')

    class Meta:
        model = CasseSallePanier
        fields = ['panier', 'salle', 'nomSalle', 'montant', 'motif']


class AjoutCasseSallePanierSerializer(serializers.ModelSerializer):
    # //produit_nom = serializers.CharField()

    def validate_salle_id(self, value):
        if not SallePanier.objects.filter(pk=value).exists():
            raise serializers.ValidationError('No product with the id')
        return value
    
    def save(self, **kwargs):
        panier_id = self.context['panier_id']
        salle_id = self.validated_data['salle']
        montant = self.validated_data['montant']
        motif = self.validated_data['motif']

        try:
            casse_panier = CasseSallePanier.objects.get(panier_id=panier_id, salle_id=salle_id)
            casse_panier.save()
            self.instance = casse_panier

        except:
            self.instance = CasseSallePanier.objects.create(panier_id=panier_id, **self.validated_data)
            
    class Meta:
        model = CasseSallePanier
        fields = ['panier_id', 'salle', 'montant', 'motif']

class PayementPanierSerializer(serializers.ModelSerializer):
    class Meta:
        model = PayementPanier
        fields = ['id','panier', 'montant', 'date']

class AjoutPayementPanierSerializer(serializers.ModelSerializer):
    def save(self, **kwargs):
        panier_id = self.context['panier_id']
        self.instance = PayementPanier.objects.create(panier_id=panier_id, **self.validated_data)
            
    class Meta:
        model = PayementPanier
        fields = ['id', 'panier_id', 'montant', 'date']

class PayementCassePanierSerializer(serializers.ModelSerializer):
    class Meta:
        model = PayementCassePanier
        fields = ['id', 'panier', 'montant', 'date']

class AjoutPayementCassePanierSerializer(serializers.ModelSerializer):
    def save(self, **kwargs):
        panier_id = self.context['panier_id']
        self.instance = PayementCassePanier.objects.create(panier_id=panier_id, **self.validated_data)
            
    class Meta:
        model = PayementCassePanier
        fields = ['panier_id', 'montant', 'date']

class FraisSuppPanierSerializer(serializers.ModelSerializer):
    class Meta:
        model = FraisSuppPanier
        fields = ['id','panier', 'montant', 'motif']

class AjoutFraisSuppPanierSerializer(serializers.ModelSerializer):
    def save(self, **kwargs):
        panier_id = self.context['panier_id']
        self.instance = FraisSuppPanier.objects.create(panier_id=panier_id, **self.validated_data)
            
    class Meta:
        model = FraisSuppPanier
        fields = ['panier_id', 'montant', 'motif']

class FraisSuppCassePanierSerializer(serializers.ModelSerializer):
    class Meta:
        model = FraisSuppCassePanier
        fields = ['id','panier', 'montant', 'motif']

class AjoutFraisSuppCassePanierSerializer(serializers.ModelSerializer):
    def save(self, **kwargs):
        panier_id = self.context['panier_id']
        self.instance = FraisSuppCassePanier.objects.create(panier_id=panier_id, **self.validated_data)
            
    class Meta:
        model = FraisSuppPanier
        fields = ['panier_id', 'montant', 'motif']

class DecorationPanierSerializer(serializers.ModelSerializer):
    nomDecoration = serializers.StringRelatedField(source='decoration.nom')
    prixDecoration = serializers.StringRelatedField(source='decoration.prix_unitaire')
    image = serializers.CharField(source='decoration.image')

    class Meta:
        model = DecorationPanier
        fields = ['id','panier', 'decoration', 'nomDecoration', 'prixDecoration', 'image', 'quantite']

class CustomizedPackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomizedPackage
        fields = '__all__'

class CommandePackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommandePackage
        fields = '__all__'

class AjoutDecorationPanierSerializer(serializers.ModelSerializer):
    # //produit_nom = serializers.CharField()

    def validate_decoration_id(self, value):
        if not Decoration.objects.filter(pk=value).exists():
            raise serializers.ValidationError('No decoration with the id')
        return value
    
    def save(self, **kwargs):
        panier_id = self.context['panier_id']
        decoration_id = self.validated_data['decoration']
        quantite = self.validated_data['quantite']

        try:
            decoration_panier = DecorationPanier.objects.get(panier_id=panier_id, decoration_id=decoration_id)
            decoration_panier.quantite += quantite
            decoration_panier.save()
            commande = get_object_or_404(Commande, panier_id=panier_id)
            commande.decorationsSetted = True
            commande.commande_passee = True
            commande.save()
            self.instance = decoration_panier

        except DecorationPanier.DoesNotExist:
            commande = get_object_or_404(Commande, panier_id=panier_id)
            commande.decorationsSetted = True
            commande.commande_passee = True
            commande.save()
            self.instance = DecorationPanier.objects.create(panier_id=panier_id, **self.validated_data)
            
    class Meta:
        model = DecorationPanier
        fields = ['decoration', 'quantite']
        
class AjoutProduitPackageSerializer(serializers.ModelSerializer):
    # //produit_nom = serializers.CharField()

    def validate_produit_id(self, value):
        if not Produit.objects.filter(pk=value).exists():
            raise serializers.ValidationError('No product with the id')
        return value
    
    def save(self, **kwargs):
        package_id = self.context['package_id']
        produit_id = self.validated_data['produit']
        quantite = self.validated_data['quantite']

        try:
            produit_package = ProduitPackage.objects.get(package_id=package_id, produit_id=produit_id)
            produit_package.quantite += quantite
            produit_package.save()
            self.instance = produit_package

        except ProduitPackage.DoesNotExist:
            self.instance = ProduitPackage.objects.create(package_id=package_id, **self.validated_data)
            
    class Meta:
        model = ProduitPackage
        fields = ['produit', 'quantite']
        
# class EmployerSerializer(serializers.ModelSerializer):
#     user_id = serializers.IntegerField()
#     class Meta:
#         model = Employer
#         fields = ['user_id','username', 'email', 'first_name', 'last_name', 'telephone', 'cin', 'salaire']