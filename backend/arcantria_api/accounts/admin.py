from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'wallet_address', 'is_active', 'date_joined')
    list_filter = ('is_active', 'date_joined')
    search_fields = ('wallet_address',)
    ordering = ('-date_joined',)
