# Importa a função render do Django, que permite renderizar templates HTML. # noqa: E501
from django.shortcuts import render

# Importa o modelo User do Django, que é o modelo padrão de usuário do sistema
from django.contrib.auth.models import User

# Importa os generics do Django REST Framework, que são classes genéricas para criação de APIs # noqa: E501
from rest_framework import generics

# Importa o serializador que foi criado para o modelo User
from .serializers import UserSerializer, NoteSerializer

# Importa as permissões do Django REST Framework.
# `IsAuthenticated` permite o acesso apenas para usuários autenticados.
# `AllowAny` permite o acesso para qualquer usuário, sem necessidade de autenticação. # noqa: E501
from rest_framework.permissions import IsAuthenticated, AllowAny

# Importa os serializadores do Django REST Framework, que são usados para converter dados de modelos em formatos como JSON # noqa: E501
from .models import Note


# Define uma classe para a visualização de uma lista e criação de notas.
class NoteListCreated(generics.ListCreateAPIView):
    # Define o serializer que será usado para a conversão dos dados.
    serializer_class = NoteSerializer
    # Define as permissões, garantindo que apenas usuários autenticados possam acessar essa visão. # noqa: E501
    permission_classes = [IsAuthenticated]

    # Método para retornar o conjunto de notas do usuário autenticado.
    def get_queryset(self):
        # Obtém o usuário da requisição.
        user = self.request.user
        # Retorna todas as notas que pertencem ao usuário autenticado.
        return Note.objects.filter(author=user)

    # Método chamado quando uma nova nota é criada.
    def perform_create(self, serializer):
        # Verifica se o serializer é válido.
        if serializer.is_valid():
            # Salva a nota, associando-a ao usuário autenticado.
            serializer.save(author=self.request.user)
        else:
            # Caso o serializer seja inválido, imprime os erros.
            print(serializer.errors)

# Define uma classe para a exclusão de uma nota.


class NoteDelete(generics.DestroyAPIView):
    # Define o queryset para todas as notas.
    queryset = Note.objects.all()
    # Define o serializer que será usado para a conversão dos dados.
    serializer_class = NoteSerializer
    # Define as permissões, garantindo que apenas usuários autenticados possam acessar essa visão. # noqa: E501
    permission_classes = [IsAuthenticated]

    # Método para retornar o conjunto de notas do usuário autenticado para garantir que ele só possa excluir suas próprias notas. # noqa: E501
    def get_queryset(self):
        # Obtém o usuário da requisição.
        user = self.request.user
        # Retorna todas as notas que pertencem ao usuário autenticado.
        return Note.objects.filter(author=user)


# Criação de uma view para permitir a criação de novos usuários via API


class CreateUserView(generics.CreateAPIView):
    # Define a queryset que será usada para buscar ou criar usuários
    queryset = User.objects.all()

    # Define o serializador que será usado para validar e formatar os dados do usuário # noqa: E501
    serializer_class = UserSerializer

    # Define as permissões para essa view. Neste caso, qualquer pessoa pode acessar essa view, pois é `AllowAny` # noqa: E501
    # Permite que qualquer usuário (autenticado ou não) acesse a view
    permission_classes = [AllowAny]
