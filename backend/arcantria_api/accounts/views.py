from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User
from .serializers import UserSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def login_wallet(request):
    wallet_address = request.data.get('wallet_address')

    if not wallet_address:
        return Response({'error': 'Wallet address is required'}, status=status.HTTP_400_BAD_REQUEST)

    # Busca usuário pela carteira
    user = User.objects.filter(wallet_address=wallet_address).first()

    # Cria o usuário se ainda não existir
    if not user:
        user = User.objects.create(wallet_address=wallet_address)

    # Gera os tokens JWT
    refresh = RefreshToken.for_user(user)
    return Response({
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'user': UserSerializer(user).data
    })

@api_view(['GET'])
def user_me(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)
