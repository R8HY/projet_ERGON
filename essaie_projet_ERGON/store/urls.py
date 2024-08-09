# from . import views
# from rest_framework.routers import DefaultRouter
# from rest_framework_nested import routers
# from django.conf import settings
# from django.conf.urls.static import static
# from django.urls import path, include

# router = DefaultRouter()
# router.register('Client', views.ClientViewSet, basename='Client')
# router.register('Societe', views.SocieteViewSet)
# router.register('Particulier', views.ParticulierViewSet)
# router.register('RendezVous', views.RendezVousViewSet)
# router.register('Guest', views.RendezVousViewSet)
# router.register('TypeProduit', views.TypeProduitViewSet)
# router.register('Produit', views.ProduitViewSet)
# router.register('Commande', views.CommandeViewSet)
# router.register('Panier', views.PanierViewSet, basename='panier')
# router.register('Payement', views.PayementViewSet, basename='payement')
# router.register('Evenement', views.EvenementViewSet, basename='evenements')
# router.register('Historique', views.HistoriqueViewSet, basename='historique')
# router.register('Notification', views.NotificationViewSet, basename='notification')
# router.register('ArticlePanier', views.ListeArticlePanierViewSet, basename='notification')
# router.register('DecorationPanier', views.ListeDecorationPanierViewSet, basename='notification')
# router.register('SallePanier', views.ListeSallePanierViewSet, basename='notification')
# # router.register('Employer', views.EmployerViewSet)
# # router.register('Logout', views.LogoutView, basename='logout'),


# particulier_router = routers.NestedDefaultRouter(router, 'Particulier', lookup='particulier')
# particulier_router.register('images', views.ParticulierImageViewSet, basename='particulier-images')

# panier_router = routers.NestedDefaultRouter(router, 'Panier', lookup='panier')
# panier_router.register('article_panier', views.ArticlePanierViewSet, basename='panier-article')
# panier_router.register('decoration_panier', views.DecorationPanierViewSet, basename='panier-decoration')
# panier_router.register('salle_panier', views.SallePanierViewSet, basename='panier-salle')
# panier_router.register('frais_supplementaire_panier', views.FraisSuppPanierViewSet, basename='panier-frais-supp')
# panier_router.register('payement_panier', views.PayementPanierViewSet, basename='panier-payement')
# panier_router.register('casse_article_panier', views.CasseArticlePanierViewSet, basename='panier-casse-prod')
# panier_router.register('casse_decoration_panier', views.CasseDecorationPanierViewSet, basename='panier-casse-deco')
# panier_router.register('casse_salle_panier', views.CasseSallePanierViewSet, basename='panier-casse-salle')
# panier_router.register('frais_supplementaire_casse_panier', views.FraisSuppCassePanierViewSet, basename='panier-frais-supp')
# panier_router.register('payement_casse_panier', views.PayementCassePanierViewSet, basename='panier-payement')

# location_router = DefaultRouter()
# location_router.register('Salle', views.SalleViewSet, basename='location-salles')
# location_router.register('TypeDeco', views.TypeDecoViewSet, basename='location-type-decorations')
# location_router.register('Decoration', views.DecorationViewSet, basename='location-decorations')

# urlpatternsLoc = [
#     path('Location/', include(location_router.urls)),
# ]

# urlpatterns = router.urls + particulier_router.urls + panier_router.urls + urlpatternsLoc
# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

from . import views
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include

router = DefaultRouter()
router.register('Client', views.ClientViewSet, basename='Client')
router.register('Societe', views.SocieteViewSet)
router.register('Particulier', views.ParticulierViewSet)
router.register('RendezVous', views.RendezVousViewSet, basename='rendezvous')
router.register('Guest', views.RendezVousViewSet, basename='guest_rendezvous')
router.register('TypeProduit', views.TypeProduitViewSet)
router.register('Produit', views.ProduitViewSet)
router.register('Commande', views.CommandeViewSet)
router.register('Panier', views.PanierViewSet, basename='panier')
router.register('Payement', views.PayementViewSet, basename='payement')
router.register('Evenement', views.EvenementViewSet, basename='evenements')
router.register('Historique', views.HistoriqueViewSet, basename='historique')
router.register('Notification', views.NotificationViewSet, basename='notification')
router.register('ArticlePanier', views.ListeArticlePanierViewSet, basename='article_panier')
router.register('DecorationPanier', views.ListeDecorationPanierViewSet, basename='decoration_panier')
router.register('SallePanier', views.ListeSallePanierViewSet, basename='salle_panier')

particulier_router = routers.NestedDefaultRouter(router, 'Particulier', lookup='particulier')
particulier_router.register('images', views.ParticulierImageViewSet, basename='particulier-images')

panier_router = routers.NestedDefaultRouter(router, 'Panier', lookup='panier')
panier_router.register('article_panier', views.ArticlePanierViewSet, basename='panier-article')
panier_router.register('decoration_panier', views.DecorationPanierViewSet, basename='panier-decoration')
panier_router.register('salle_panier', views.SallePanierViewSet, basename='panier-salle')
panier_router.register('frais_supplementaire_panier', views.FraisSuppPanierViewSet, basename='panier-frais-supp')
panier_router.register('payement_panier', views.PayementPanierViewSet, basename='panier-payement')
panier_router.register('casse_article_panier', views.CasseArticlePanierViewSet, basename='panier-casse-prod')
panier_router.register('casse_decoration_panier', views.CasseDecorationPanierViewSet, basename='panier-casse-deco')
panier_router.register('casse_salle_panier', views.CasseSallePanierViewSet, basename='panier-casse-salle')
panier_router.register('frais_supplementaire_casse_panier', views.FraisSuppCassePanierViewSet, basename='panier-frais-supp-casse')
panier_router.register('payement_casse_panier', views.PayementCassePanierViewSet, basename='panier-payement-casse')

location_router = DefaultRouter()
location_router.register('Salle', views.SalleViewSet, basename='location-salles')
location_router.register('TypeDeco', views.TypeDecoViewSet, basename='location-type-decorations')
location_router.register('Decoration', views.DecorationViewSet, basename='location-decorations')

urlpatternsLoc = [
    path('Location/', include(location_router.urls)),
]

urlpatterns = router.urls + particulier_router.urls + panier_router.urls + urlpatternsLoc
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
