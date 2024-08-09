from django.db import models
from store.validators import validate_file_size
from django.core.validators import MaxValueValidator
from django.conf import settings
# from django.utils import formats

# Create your models here
class Client(models.Model):
    CAT_SOCIETE = "Société"
    CAT_PARTICULIER = "Particulier"
    CAT_GUEST = "Guest"
    CHOIX_CATEGORIE= [
        (CAT_SOCIETE , 'Société'),
        (CAT_PARTICULIER, 'Particulier'),
        (CAT_GUEST, 'Guest')
    ]
    nom = models.CharField(max_length=255)
    prenom = models.CharField(max_length=255)
    contact = models.CharField(max_length=255)
    categorie = models.CharField( max_length=50, choices=CHOIX_CATEGORIE, null=True)
    rdv = models.DateTimeField(null=True, blank=True, default=None)
    date_ajout = models.DateField(auto_now_add=True, null=True)

    def __str__(self) -> str:
        return self.nom

class Societe(Client):
    nomSociete = models.CharField(max_length=255)
    domiciliation = models.CharField(max_length=255)
    email = models.EmailField()
    nif = models.CharField(max_length=255)
    stat = models.CharField(max_length=255)
    categorie = "Société"

    def __str__(self) -> str:
        return self.nomSociete

class Particulier(Client):
    date_naissance = models.DateField()
    lieu_naissance = models.CharField(max_length=255)
    num_CIN = models.PositiveIntegerField()
    cin_date_delivrance = models.DateField()
    cin_recto = models.ImageField(upload_to="client/CIN-recto/", default="client/CIN-recto/defaultImage.png")
    cin_verso = models.ImageField(upload_to="client/CIN-verso/", default="client/CIN-verso/defaultImage.png")
    certificat_residence = models.CharField(max_length=255)
    lieu_residence = models.CharField(max_length=255)
    email = models.EmailField()
    categorie = "Particulier"

class RendezVous(Client):
    dateRdv = models.DateTimeField()
    categorie = "Guest"
    motif=models.TextField(blank=True)

    class Meta:
        ordering=["dateRdv"]

class ParticulierImage(models.Model):
    particulier = models.ForeignKey(Particulier, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='store/images', validators=[validate_file_size])

class TypeProduit(models.Model):
    categorie = models.CharField(max_length=255)

    def __str__(self) -> str:
        return self.categorie

    class Meta:
        ordering = ['categorie']
    
class Produit(models.Model):
    nomProduit = models.CharField(max_length=255)
    image = models.ImageField(upload_to="products/", default="products/defaultImage.png")
    prix_unitaire = models.PositiveIntegerField()
    nombre = models.IntegerField()
    reste = models.IntegerField(null=True)
    description = models.TextField(blank=True)
    dernier_modification = models.DateTimeField(auto_now=True)
    type_produit = models.ForeignKey(
        TypeProduit, on_delete=models.PROTECT, related_name='produit')
    description = models.TextField(max_length=255, null=True)

    def __str__(self) -> str:
        return self.nomProduit

    class Meta:
        ordering = ['nomProduit']
        
class Panier(models.Model):
    date_creation = models.DateTimeField(auto_now_add=True)
    description = models.TextField(blank=True)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name="panier", null=True)

    def __str__(self) -> str:
        return "Panier de "+self.client.nom

class CustomizationOption(models.Model):
    nom = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    prix_additionnel = models.PositiveIntegerField()

    def __str__(self):
        return self.nom

class Commande(models.Model):
    PAIEMENT_COMPLET = 'C'
    PAIEMENT_AVANCE = 'A'
    CHOIX_PAIEMENT= [
        (PAIEMENT_COMPLET , 'Complete'),
        (PAIEMENT_AVANCE, 'Avance')
    ]
    panier = models.ForeignKey(Panier,on_delete=models.CASCADE, null=True)
    date_commande = models.DateTimeField(auto_now_add=True)
    # description = models.TextField(blank=True)
    date_debutLoc = models.DateTimeField(null=True)
    date_finLoc = models.DateTimeField(null=True)
    locationSalle = models.BooleanField()
    locationProduit = models.BooleanField()
    locationDecoration = models.BooleanField()
    salleSetted = models.BooleanField()
    produitsSetted = models.BooleanField()
    decorationsSetted = models.BooleanField()
    montant_payee = models.IntegerField(default=0)
    
    commande_passee = models.BooleanField(default=False)
    etat_paiement = models.CharField(
        max_length=1, choices=CHOIX_PAIEMENT, default=PAIEMENT_AVANCE)
    organised = models.BooleanField(default=False)
    retour_checked = models.BooleanField(default=False)
    payement_casse = models.BooleanField(default=False)

    class Meta:
        ordering = ['date_debutLoc']

    def __str__(self):
        return f"Commande de {self.panier.client.nom}"

class ArticlePanier(models.Model):
    panier = models.ForeignKey(
        Panier, on_delete=models.CASCADE, related_name='articles')
    produit = models.ForeignKey(Produit, on_delete=models.CASCADE)
    quantite = models.PositiveSmallIntegerField()

    def __str__(self):
        return self.produit.nomProduit

class PayementPanier(models.Model):
    panier = models.ForeignKey(
        Panier, on_delete=models.CASCADE, related_name='payements')
    montant = models.PositiveIntegerField()
    date = models.DateField(auto_now_add=True, null=True)

class FraisSuppPanier(models.Model):
    panier = models.ForeignKey(
        Panier, on_delete=models.CASCADE, related_name='frais_additionnels')
    montant = models.PositiveIntegerField()
    motif = models.TextField()

#salle et deco 
class Salle(models.Model):
    nom = models.CharField(max_length=255)
    etat = models.CharField(max_length=255,blank=True,null=True)
    description = models.TextField(blank=True)
    prix = models.PositiveIntegerField()
    image = models.ImageField(upload_to="salles/", default="salles/defaultImage.png")
    disponible = models.BooleanField(default=True)
    def __str__(self):
        return self.nom

class TypeDeco(models.Model):
    titre = models.CharField(max_length=255)
    descritpion = models.TextField(blank=True)

    def __str__(self) -> str:
        return self.titre

    class Meta:
        ordering = ['titre']

class Decoration(models.Model):
    nom = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    nombre = models.IntegerField(null=True)
    reste = models.IntegerField(null=True)
    prix_unitaire = models.PositiveIntegerField()
    image = models.ImageField(upload_to="decorations/", default="decoration/defaultImage.png")
    categorie = models.ForeignKey(TypeDeco, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.nom

class DecorationPanier(models.Model):
    panier = models.ForeignKey(
        Panier, on_delete=models.CASCADE, related_name='decorations')
    decoration = models.ForeignKey(Decoration, on_delete=models.CASCADE)
    quantite = models.PositiveSmallIntegerField()

    def __str__(self):
        return self.decoration.nom

class SallePanier(models.Model):
    panier = models.ForeignKey(
        Panier, on_delete=models.CASCADE, related_name='salle')
    salle = models.ForeignKey(Salle, on_delete=models.CASCADE)

    def __str__(self):
        return self.salle.nom

class CasseArticlePanier(models.Model):
    panier = models.ForeignKey(
        Panier, on_delete=models.CASCADE, related_name='casse_article')
    article = models.ForeignKey(ArticlePanier, on_delete=models.CASCADE)
    quantiteCasse = models.PositiveSmallIntegerField(default=0)

class CasseDecorationPanier(models.Model):
    panier = models.ForeignKey(
        Panier, on_delete=models.CASCADE, related_name='casse_deco')
    decoration = models.ForeignKey(DecorationPanier, on_delete=models.CASCADE)
    quantiteCasse = models.PositiveSmallIntegerField(default=0)

class CasseSallePanier(models.Model):
    panier = models.ForeignKey(
        Panier, on_delete=models.CASCADE, related_name='casse_salle')
    salle = models.ForeignKey(SallePanier, on_delete=models.CASCADE)
    montant = models.PositiveIntegerField()
    motif = models.TextField()

class PayementCassePanier(models.Model):
    panier = models.ForeignKey(
        Panier, on_delete=models.CASCADE, related_name='casse_payements')
    montant = models.PositiveIntegerField()
    date = models.DateField(auto_now_add=True, null=True)

class FraisSuppCassePanier(models.Model):
    panier = models.ForeignKey(
        Panier, on_delete=models.CASCADE, related_name='frais_casse_additionnels')
    montant = models.PositiveIntegerField()
    motif = models.TextField()

#package

class Package(models.Model):
    nom = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    prix = models.PositiveIntegerField()
    salle = models.ForeignKey(Salle, on_delete = models.CASCADE)

    def __str__(self):
        return self.nom

class ImagePackage(models.Model):
    package = models.ForeignKey(Package, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to="package_images/")

class ProduitPackage(models.Model):
    package = models.ForeignKey(Package, on_delete=models.CASCADE, related_name='produits')
    produit = models.ForeignKey(Produit, on_delete=models.CASCADE)
    quantite = models.PositiveSmallIntegerField()

class DecorationPackage(models.Model):
    package = models.ForeignKey(Package, on_delete=models.CASCADE, related_name='decorations')
    decoration = models.ForeignKey(Decoration, on_delete=models.CASCADE)
    quantite = models.PositiveSmallIntegerField(null=True)
    
class CustomizedPackage(Package):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, blank = True, null = True)
    customization_options = models.ForeignKey(CustomizationOption, on_delete=models.CASCADE, blank=True, null = True,
     related_name='package_option')

class CommandePackage(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    package = models.ForeignKey(Package, on_delete=models.CASCADE)
    prix_total = models.PositiveIntegerField()
    date_commande = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return f"{self.client.nom}'s Offer"

def __str__(self):
    return 'Panier de '+self.client.nom

#HISTORIQUE
class Historique(models.Model):
    acteurClass = models.CharField(max_length=255)
    acteurID = models.PositiveIntegerField()
    cibleClass = models.CharField(max_length=255, blank=True)
    cibleID = models.PositiveIntegerField(null=True)
    action = models.CharField(max_length=255)
    description = models.TextField(default="")
    
class Sortie(models.Model):
    commande = models.ForeignKey(Commande, on_delete=models.CASCADE)
    produit = models.ForeignKey(Produit, on_delete=models.CASCADE)
    articlePanier = models.ForeignKey(ArticlePanier, on_delete=models.CASCADE)
    motif = "Sortie de matériels"
    date = models.DateTimeField(null=True)

class DetailCasse(models.Model):
    commande = models.ForeignKey(Commande, on_delete=models.CASCADE, null=True)
    articlePanier = models.ForeignKey(ArticlePanier, on_delete=models.CASCADE)

class Evenement(models.Model):
    description = models.TextField(blank=True)
    date = models.DateTimeField()
    nbPersonne = models.PositiveIntegerField()
    commande = models.OneToOneField(Commande, on_delete=models.CASCADE, null=True)
   
    class Meta:
            ordering = ['date']

class Notification(models.Model):
    evenement = models.ForeignKey(Evenement, on_delete=models.CASCADE) 
    date = models.DateTimeField(null=True, auto_now_add="true")
    lue = models.BooleanField(default=False)


   #DIAMS
# class Employer(models.Model):
#     username = models.CharField(max_length=255, null=True)
#     email = models.CharField(max_length=255, null=True)
#     first_name = models.CharField(max_length=255, null=True)
#     last_name = models.CharField(max_length=255, null=True)
#     telephone = models.CharField(max_length=50)
#     cin = models.CharField(max_length=15)
#     salaire = models.PositiveIntegerField()
#     user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

#     def __str__(self):
#         return f'{self.user.first_name} {self.user.last_name}'
    
#     def first_name(self):
#         return self.user.first_name
    
#     def last_name(self):
#         return self.user.last_name
    
#     def username(self):
#         return self.user.username
    
#     def email(self):
#         return self.user.email

#     class Meta:
#         ordering=['user__first_name']
