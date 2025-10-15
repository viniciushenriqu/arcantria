from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Inventory
from .serializers import InventorySerializer
from orders.models import Order
from orders.serializers import OrderSerializer
from web3 import Web3
import os

# Placeholder para smart contract
CONTRACT_ADDRESS = os.getenv('ARK_CONTRACT_ADDRESS', '0x0000000000000000000000000000000000000000')
INFURA_URL = os.getenv('INFURA_URL', 'https://mainnet.infura.io/v3/YOUR_INFURA_KEY')

class TransactionsViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Combinar orders e inventory changes (placeholder)
        return Order.objects.filter(user=self.request.user).order_by('-created_at')

    def list(self, request):
        orders = Order.objects.filter(user=self.request.user).order_by('-created_at')
        inventory_changes = []  # Placeholder para mudanças de inventário (vendas, etc.)

        transactions = []

        # Adicionar orders como transações
        for order in orders:
            transactions.append({
                'id': f"order_{order.id}",
                'type': 'Compra',
                'description': f"Compra de {order.product.name}",
                'amount': f"-{order.total_price} ARK",
                'date': order.created_at.strftime('%Y-%m-%d %H:%M:%S'),
                'status': order.status
            })

        # Placeholder: adicionar transações on-chain (compras, vendas)
        # Aqui seria necessário consultar o blockchain para transações reais

        # Mock transactions até integração completa
        mock_transactions = [
            {
                'id': 'tx_1',
                'type': 'Compra de token',
                'description': 'Compra de ARK tokens',
                'amount': '+100 ARK',
                'date': '2023-10-02',
                'status': 'Concluída'
            },
            {
                'id': 'tx_2',
                'type': 'Venda realizada',
                'description': 'Venda de item no marketplace',
                'amount': '+30 ARK',
                'date': '2023-10-03',
                'status': 'Concluída'
            }
        ]

        transactions.extend(mock_transactions)

        return Response(transactions)
