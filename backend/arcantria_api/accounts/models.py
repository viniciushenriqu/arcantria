from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    username = None  # Desabilita username
    email = None     # Remove email
    wallet_address = models.CharField(max_length=255, unique=True, null=False, default='')

    USERNAME_FIELD = 'wallet_address'
    REQUIRED_FIELDS = []  # Nenhum campo adicional é obrigatório

    def __str__(self):
        return self.wallet_address
