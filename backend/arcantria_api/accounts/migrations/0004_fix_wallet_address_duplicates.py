# Generated manually to fix duplicate empty wallet_address entries

from django.db import migrations

def fix_wallet_addresses(apps, schema_editor):
    User = apps.get_model('accounts', 'User')
    # Iterate over users with empty or null wallet_address
    for user in User.objects.filter(wallet_address__in=['', None]):
        # Generate a unique wallet_address based on user id
        new_wallet_address = f'user_{user.id}'
        # Ensure uniqueness (though unlikely to conflict since id is unique)
        while User.objects.filter(wallet_address=new_wallet_address).exists():
            # If somehow conflicts, append a suffix (rare case)
            new_wallet_address = f'user_{user.id}_dup'
        user.wallet_address = new_wallet_address
        user.save()

def reverse_fix_wallet_addresses(apps, schema_editor):
    # Reverse operation: set back to empty (for rollback, if needed)
    User = apps.get_model('accounts', 'User')
    for user in User.objects.filter(wallet_address__startswith='user_'):
        user.wallet_address = ''
        user.save()

class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_alter_user_options_alter_user_managers_and_more'),
    ]

    operations = [
        migrations.RunPython(fix_wallet_addresses, reverse_code=reverse_fix_wallet_addresses),
    ]
