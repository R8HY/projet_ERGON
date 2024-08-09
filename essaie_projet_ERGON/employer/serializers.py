# from rest_framework import serializers
# from django.contrib.auth import get_user_model, authenticate
# from django.core.exceptions import ValidationError
# from .models import *
# from .serializers import *

# UserModel = get_user_model()

# class UserRegisterSerializer(serializers.ModelSerializer):
# 	first_name = serializers.CharField(required=False)
# 	last_name = serializers.CharField(required=False)

# 	class Meta:
# 		model = UserModel
# 		fields = '__all__'
# 	# def create(self, clean_data):
# 	# 	user_obj = UserModel.objects.create_user(email=clean_data['email'], password=clean_data['password'])
# 	# 	user_obj.username = clean_data['username']
# 	# 	user_obj.save()
# 	# 	return user_obj

# 	# def create(self, validated_data):
#     #  	user_obj = UserModel.objects.create_user(
# 	# 		email=validated_data['email'],
# 	# 		password=validated_data['password'],
# 	# 		username=validated_data['username'],
# 	# 		first_name=validated_data.get('first_name', ''),
# 	# 		last_name=validated_data.get('last_name', ''),
# 	# 	)
#     #  	return user_obj

# 	def create(self, validated_data):
# 		user_obj = UserModel.objects.create_user(
# 			email=validated_data['email'],
# 			password=validated_data['password'],
# 			username=validated_data['username'],
# 			first_name=validated_data.get('first_name'),
# 			last_name=validated_data.get('last_name'),
# 		)
# 		return user_obj

# class UserLoginSerializer(serializers.Serializer):
# 	email = serializers.EmailField()
# 	password = serializers.CharField()
# 	##
# 	def check_user(self, clean_data):
# 		user = authenticate(username=clean_data['email'], password=clean_data['password'])
# 		if not user:
# 			raise ValidationError('user not found')
# 		return user

# class UserSerializer(serializers.ModelSerializer):
# 	class Meta:
# 		model = UserModel
# 		fields = ('email', 'username')

# class UserProfileSerializer(serializers.ModelSerializer):
# 	class Meta:
# 		model = AppUser
# 		fields = ('email', 'username', 'first_name', 'last_name')

# from djoser.serializers import UserSerializer as BaseUserSerializer, UserCreateSerializer as BaseUserCreateSerializer

# class UserCreateSerializer( BaseUserCreateSerializer):
#     class Meta(BaseUserCreateSerializer.Meta):
#         fields = ['id', 'password', 'username', 'email', 'first_name', 'last_name']

# class UserSerializer(BaseUserSerializer):
#     class Meta(BaseUserSerializer.Meta):
#         fields = ['id', 'username', 'email', 'first_name', 'last_name']
from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'status']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
        