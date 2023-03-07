from django.shortcuts import render
from rest_framework import permissions, status,views
from rest_framework.decorators import api_view, permission_classes
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from .serializer import MyTokenObtenPairSerializer, RegisterSerializer, ProductsSerializer, CarritoSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Products, Carrito
from rest_framework import viewsets

# Create your views here.

class MyTokenPairView(TokenObtainPairView):
    serializer_class= MyTokenObtenPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset= User.objects.all()
    permission_classes= (AllowAny,)
    serializer_class= RegisterSerializer

@api_view(['GET'])
def get_routes(request):
    routes= [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/',
        '/api/products'
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testAuth(request):
    
    if request.method == 'GET':
        data= f"Felicidades {request.user}, el api funciona a GET"
        return Response({'response': data}, status=status.HTTP_200_OK)
    
    elif request.method == 'POST':
        text= request.POST.get('text')
        data= f"Felicidades tu api funciona con POST con texto : {text}"
        return Response({'response':data}, status=status.HTTP_200_OK)
    
    return Response([], status=status.HTTP_400_BAD_REQUEST)



class ProductsListView(viewsets.ModelViewSet):
    permission_classes= (IsAuthenticated,)
    queryset = Products.objects.all()
    serializer_class= ProductsSerializer


class CarritoView(views.APIView):

    permission_classes= (IsAuthenticated,)

    def get(self, request):
        #Obtener todos los productos de el carrito
        car_items= Carrito.objects.filter(usuario= request.user)
        serializer= CarritoSerializer(car_items, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        #Agregar un producto al carrito
        producID= request.data.get('PID')
        quantity= request.data.get('quantity', 1)
        product= Products.objects.get(PID= producID)
        total_price= product.price * quantity
        cart_item= Carrito(usuario= request.user, producto= product, cantidad= quantity, total_precio=total_price)
        cart_item.save()
        serializer= CarritoSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def put(self, request, pk):
        #Acualizar producto de el carrito
        cart_item= Carrito.objects.get(id= pk, usuario= request.user)
        quantity= request.data.get('quantity', cart_item.cantidad)
        total_price= cart_item.producto.price * quantity
        cart_item.total_precio= total_price
        cart_item.cantidad= quantity
        cart_item.save()
        serializer= CarritoSerializer(cart_item)
        return Response(serializer.data)
    
    def delete(self, request, pk):
        #Eliminar un producto del carrito
        cart_item= Carrito.objects.get(id=pk, usuario= request.user)
        cart_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        