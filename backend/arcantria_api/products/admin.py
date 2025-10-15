from django.contrib import admin
from .models import Product, Inventory

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'stock', 'created_at', 'updated_at')
    list_filter = ('created_at', 'updated_at')
    search_fields = ('name', 'description')
    ordering = ('-created_at',)

@admin.register(Inventory)
class InventoryAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'quantity', 'equipped_slot', 'acquired_at')
    list_filter = ('equipped_slot', 'acquired_at')
    search_fields = ('user__username', 'product__name')
    ordering = ('-acquired_at',)
