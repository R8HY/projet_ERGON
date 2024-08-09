from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('ClientGuest', views.ClientGuestViewSet, basename='Client')

urlpatterns = router.urls