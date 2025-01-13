# Importa a função render do Django, que permite renderizar templates HTML. # noqa: E501
from django.shortcuts import render

# Importa o modelo User do Django, que é o modelo padrão de usuário do sistema
from django.contrib.auth.models import User

# Importa os generics do Django REST Framework, que são classes genéricas para criação de APIs # noqa: E501
from rest_framework import generics

# Importa o serializador que foi criado para o modelo User
from .serializers import UserSerializer

# Importa as permissões do Django REST Framework.
# `IsAuthenticated` permite o acesso apenas para usuários autenticados.
# `AllowAny` permite o acesso para qualquer usuário, sem necessidade de autenticação. # noqa: E501
from rest_framework.permissions import IsAuthenticated, AllowAny


# Criação de uma view para permitir a criação de novos usuários via API
class CreateUserView(generics.CreateAPIView):
    # Define a queryset que será usada para buscar ou criar usuários
    queryset = User.objects.all()

    # Define o serializador que será usado para validar e formatar os dados do usuário # noqa: E501
    serializer_class = UserSerializer

    # Define as permissões para essa view. Neste caso, qualquer pessoa pode acessar essa view, pois é `AllowAny` # noqa: E501
    # Permite que qualquer usuário (autenticado ou não) acesse a view
    permission_classes = [AllowAny]
