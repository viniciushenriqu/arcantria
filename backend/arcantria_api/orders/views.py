from rest_framework import viewsets
from .models import Order
from .serializers import OrderSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from products.models import Inventory
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['status']
    ordering_fields = ['created_at', 'total_price']

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Ao criar uma order, adicionar item ao inventário se pago
        order = serializer.save(user=self.request.user)
        if order.status == 'paid':
            # Verificar se já existe no inventário
            inventory, created = Inventory.objects.get_or_create(
                user=order.user,
                product=order.product,
                defaults={'quantity': 0}
            )
            inventory.quantity += order.quantity
            inventory.save()

    @action(detail=True, methods=['post'])
    def pay(self, request, pk=None):
        order = self.get_object()
        if order.status != 'pending':
            return Response({'error': 'Order already processed'}, status=400)

        # Placeholder: implementar pagamento on-chain aqui
        # Verificar saldo, transferir tokens, etc.

        # Mock: marcar como pago e adicionar ao inventário
        order.status = 'paid'
        order.save()

        # Adicionar ao inventário
        inventory, created = Inventory.objects.get_or_create(
            user=order.user,
            product=order.product,
            defaults={'quantity': 0}
        )
        inventory.quantity += order.quantity
        inventory.save()

        return Response({'message': 'Order paid successfully'})

    @action(detail=True, methods=['post'])
    def ship(self, request, pk=None):
        order = self.get_object()
        if order.status != 'paid':
            return Response({'error': 'Order not paid yet'}, status=400)

        order.status = 'shipped'
        order.save()
        return Response({'message': 'Order shipped'})

    @action(detail=True, methods=['post'])
    def deliver(self, request, pk=None):
        order = self.get_object()
        if order.status != 'shipped':
            return Response({'error': 'Order not shipped yet'}, status=400)

        order.status = 'delivered'
        order.save()
        return Response({'message': 'Order delivered'})
