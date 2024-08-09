from django.db import models

# Create your models here.
#ACCOUNT
class CategorieAccount(models.Model):
    titre = models.CharField(max_length=255)

    def __str__ (self):
        return self.titre

class Account(models.Model):
    nom = models.CharField(max_length=255)
    numero = models.CharField(max_length=255)
    solde = models.PositiveIntegerField(default=0)
    categorie = models.ForeignKey(CategorieAccount, on_delete=models.CASCADE)

    def __str__ (self):
        return self.nom
    
class FluxCash(models.Model):
    CHOIX_FLUX= [
        ("", 'Aucun'),
        ("E", 'Entrée'),
        ("S", 'Sortie'),
    ]
    crediteur = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="credits", null=True) #mandray
    debiteur = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="debits", null=True) #manome
    motif = models.TextField(blank=True)
    montant = models.PositiveIntegerField(default=0)
    date = models.DateTimeField()
    description = models.CharField( max_length=50, choices=CHOIX_FLUX, default=(''))

    def __str__ (self):
        return self.motif