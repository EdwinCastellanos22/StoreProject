from django.urls import path, include
from .views import RegisterView, MyTokenPairView, get_routes, testAuth, ProductsListView, CarritoView
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework import routers

router= routers.DefaultRouter()
router.register('', ProductsListView)

urlpatterns = [
    path('token/', MyTokenPairView.as_view()),
    path('register/', RegisterView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('', get_routes),
    path('test/', testAuth),
    path('products/', include(router.urls)),
    path("carrito/", CarritoView.as_view(), name='Carrito'),
    path("carrito/<int:pk>", CarritoView.as_view(), name="Carrito Details")
]
