from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from products.views import ProductViewSet
from orders.views import OrderViewSet  # import do app orders

# Criando o router da API
router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'orders', OrderViewSet)  # registrando orders

# URLs principais
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
