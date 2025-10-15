from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from products.views import ProductViewSet, InventoryViewSet
from products.transactions import TransactionsViewSet
from orders.views import OrderViewSet  # import do app orders
from accounts.views import login_wallet, user_me
from accounts.balance import get_balance
from django.http import HttpResponse

def home(request):
    return HttpResponse("Bem-vindo à API Arcantria!")

# Criando o router da API
router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'inventory', InventoryViewSet)
router.register(r'transactions', TransactionsViewSet, basename='transactions')
router.register(r'orders', OrderViewSet)  # registrando orders

# URLs principais
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/login-wallet/', login_wallet, name='login_wallet'),
    path('api/users/me/', user_me, name='user_me'),
    path('api/balance/', get_balance, name='get_balance'),
    path('api/', include(router.urls)),
    path('', home),  # rota inicial
]
