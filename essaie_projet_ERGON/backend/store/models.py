from django.db import models

# Create your models here
class ClientGuest(models.Model):
    nom = models.CharField(max_length=255)
    prenom = models.CharField(max_length=255)
    contact = models.PositiveIntegerField()
    rdv = models.DateTimeField(null=True, blank=True, default=None)

    def __str__(self) -> str:
        return self.title
    