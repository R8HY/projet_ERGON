from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategorieAccountViewSet, AccountViewSet, FluxCashViewSet

router = DefaultRouter()
router.register(r'CategorieAccount', CategorieAccountViewSet)
router.register(r'Account', AccountViewSet)
router.register(r'Fluxcash', FluxCashViewSet)

urlpatterns = [
    path('', include(router.urls)),  # Inclure les URL générées par le router
    # Vous pouvez ajouter d'autres URL personnalisées ici si nécessaire
]