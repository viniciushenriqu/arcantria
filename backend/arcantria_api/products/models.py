from django.db import models
from accounts.models import User

class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Inventory(models.Model):
    SLOT_CHOICES = (
        ('head', 'Head'),
        ('chest', 'Chest'),
        ('right-hand', 'Right Hand'),
        ('left-hand', 'Left Hand'),
        ('legs', 'Legs'),
        ('feet', 'Feet'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    equipped_slot = models.CharField(max_length=20, choices=SLOT_CHOICES, blank=True, null=True)
    acquired_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'product')  # Um usuário pode ter apenas uma instância de cada produto

    def __str__(self):
        return f"{self.user.username} - {self.product.name}"
