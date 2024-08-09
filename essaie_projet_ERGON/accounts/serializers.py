from .models import *
from rest_framework import serializers
#ACCOUNT
class CategorieAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategorieAccount
        fields = '__all__'

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'

class FluxCashSerializer(serializers.ModelSerializer):
    class Meta:
        model = FluxCash
        fields = '__all__'