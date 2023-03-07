
from django.contrib import admin
from django.urls import path, include
from api.views import get_routes


urlpatterns = [
    path('admin/', admin.site.urls),
    path("", get_routes),
    path('api/', include('api.urls')),
]
