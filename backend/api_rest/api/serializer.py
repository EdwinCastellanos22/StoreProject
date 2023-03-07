from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Products, Carrito

class MyTokenObtenPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token= super().get_token(user)

        token['username']= user.username
        token['password']= user.password

        return token
    
class RegisterSerializer(serializers.ModelSerializer):

    password= serializers.CharField(
        write_only= True,
        required= True,
        validators= [validate_password]
    )
    password2= serializers.CharField(
        write_only= True,
        required= True
    )

    class Meta:
        model= User
        fields= ('username', 'password', 'password2')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password field din't match"}
            )
        return attrs
    
    def create(self, validated_data):
        user= User.objects.create(
            username= validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()

        return user

class ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model= Products
        fields= ('PID', 'name', 'description', 'price', 'creator', 'createAt')

class CarritoSerializer(serializers.ModelSerializer):

    class Meta:
        model= Carrito
        fields= ['usuario', 'producto', 'cantidad','total_precio']
