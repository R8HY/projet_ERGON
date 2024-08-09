# from django.contrib.auth import get_user_model, login, logout
# from rest_framework.authentication import SessionAuthentication
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from .serializers import *
# from rest_framework import permissions, status
# from .validations import custom_validation, validate_email, validate_password


# class UserRegister(APIView):
# 	permission_classes = (permissions.AllowAny,)
# 	def post(self, request):
# 		clean_data = custom_validation(request.data)
# 		serializer = UserRegisterSerializer(data=clean_data)
# 		if serializer.is_valid(raise_exception=True):
# 			user = serializer.create(clean_data)
# 			if user:
# 				return Response(serializer.data, status=status.HTTP_201_CREATED)
# 		return Response(status=status.HTTP_400_BAD_REQUEST)


# class UserLogin(APIView):
# 	permission_classes = (permissions.AllowAny,)
# 	authentication_classes = (SessionAuthentication,)
# 	##
# 	def post(self, request):
# 		data = request.data
# 		assert validate_email(data)
# 		assert validate_password(data)
# 		serializer = UserLoginSerializer(data=data)
# 		if serializer.is_valid(raise_exception=True):
# 			user = serializer.check_user(data)
# 			login(request, user)
# 			return Response(serializer.data, status=status.HTTP_200_OK)


# class UserLogout(APIView):
# 	permission_classes = (permissions.AllowAny,)
# 	authentication_classes = ()
# 	def post(self, request):
# 		logout(request)
# 		return Response(status=status.HTTP_200_OK)


# class UserView(APIView):
# 	# permission_classes = (permissions.IsAuthenticated,)
# 	permission_classes = [permissions.AllowAny]
# 	authentication_classes = (SessionAuthentication,)
# 	##
# 	def get(self, request):
# 		serializer = UserSerializer(request.user)
# 		return Response({'user': serializer.data}, status=status.HTTP_200_OK)
	
# # class UserProfileView(APIView):
# #     permission_classes = (permissions.IsAuthenticated,)
    
# #     def get(self, request):
# #         user = request.user
# #         serializer = UserProfileSerializer(user)
# #         return Response(serializer.data, status=status.HTTP_200_OK)

# class UserListView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         users = AppUser.objects.all()
#         serializer = UserProfileSerializer(users, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from .models import User
import jwt, datetime


# Create your views here.
class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')
        print(token)

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)
        user_serializer = UserSerializer(user)

        response.data = {
            'user': user_serializer.data
        }
        return response


class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Vous n\'êtes pas connecté!')

        try:
    # Spécifiez l'algorithme utilisé lors du décodage (ici, 'HS256')
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Le token a expiré!')
        except jwt.InvalidTokenError:
            raise AuthenticationFailed('Le token est invalide!')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)
        return Response(serializer.data)



class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response