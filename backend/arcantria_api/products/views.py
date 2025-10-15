from rest_framework import viewsets
from .models import Product, Inventory
from .serializers import ProductSerializer, InventorySerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['name', 'price']
    search_fields = ['name', 'description']

class InventoryViewSet(viewsets.ModelViewSet):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Inventory.objects.filter(user=self.request.user)

    @action(detail=False, methods=['post'])
    def equip(self, request):
        inventory_id = request.data.get('inventory_id')
        slot = request.data.get('slot')

        try:
            inventory_item = Inventory.objects.get(id=inventory_id, user=request.user)
            # Desequipar item anterior no slot
            Inventory.objects.filter(user=request.user, equipped_slot=slot).update(equipped_slot=None)
            # Equipar novo item
            inventory_item.equipped_slot = slot
            inventory_item.save()
            return Response({'message': 'Item equipped successfully'})
        except Inventory.DoesNotExist:
            return Response({'error': 'Item not found'}, status=404)

    @action(detail=False, methods=['post'])
    def sell(self, request):
        inventory_id = request.data.get('inventory_id')
        price = request.data.get('price', 0)  # Preço definido pelo vendedor

        try:
            inventory_item = Inventory.objects.get(id=inventory_id, user=request.user)
            if inventory_item.quantity > 0:
                # Placeholder: implementar venda on-chain aqui
                # Deduzir quantidade ou remover item
                inventory_item.quantity -= 1
                if inventory_item.quantity <= 0:
                    inventory_item.delete()
                else:
                    inventory_item.save()
                return Response({'message': 'Item sold successfully'})
            else:
                return Response({'error': 'No items to sell'}, status=400)
        except Inventory.DoesNotExist:
            return Response({'error': 'Item not found'}, status=404)
