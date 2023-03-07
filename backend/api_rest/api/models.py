from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Products(models.Model):

    PID= models.AutoField(primary_key=True, unique=True)
    name= models.CharField(max_length=250, unique=True)
    description= models.TextField()
    price= models.DecimalField(max_digits=20, decimal_places=2)
    creator= models.CharField(max_length=250)
    createAt= models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Nombre:{self.name}, Creador{self.creator}"
    
class Carrito(models.Model):
    id= models.AutoField(primary_key=True)
    usuario= models.ForeignKey(User, on_delete=models.CASCADE)
    producto= models.ForeignKey(Products, on_delete=models.CASCADE)
    cantidad= models.IntegerField(default=1)
    total_precio= models.DecimalField(max_digits=10, decimal_places=2)