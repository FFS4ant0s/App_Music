# Importa o modelo User do Django, que representa os usuários do sistema
from django.contrib.auth.models import User

# Importa os módulos necessários do Django REST Framework (DRF) para trabalhar com serializadores # noqa: E501
from rest_framework import serializers
# Importa os serializadores do Django REST Framework, que são usados para converter dados de modelos em formatos como JSON # noqa: E501
from .models import Note


# Criação de um serializador para o modelo User
class UserSerializer(serializers.ModelSerializer):
    # A classe Meta é usada para configurar o serializador, como o modelo e os campos que ele deve usar # noqa: E501
    class Meta:
        # Define que o serializador será baseado no modelo User
        model = User

        # Define os campos que serão incluídos no serializador
        fields = ["id", "username", "password"]

        # Aqui, é configurado um erro de digitação em "exxtra_kwargs", que deve ser "extra_kwargs" # noqa: E501
        # O dicionário extra_kwargs permite definir opções adicionais para campos específicos # noqa: E501
        extra_kwargs = {"password": {"write_only": True}}

    # Método para criar um usuário com os dados validados
    def create(self, validated_data):
        # Cria um usuário no banco de dados utilizando o método create_user (que cria um usuário com senha segura) # noqa: E501
        user = User.objects.create_user(**validated_data)

        # Retorna o usuário criado
        return user


# Define o serializador para o modelo `Note`
class NoteSerializer(serializers.ModelSerializer):
    # A classe Meta define configurações para o serializador, como o modelo e os campos # noqa: E501
    class Meta:
        # Define que o serializador será baseado no modelo `Note`
        model = Note

        # Define quais campos do modelo `Note` serão incluídos no serializador
        fields = ["id", "title", "content", "created_at", "author"]

        # Define configurações extras para o campo `author`
        # No caso, configuramos para que o campo `author` seja apenas de leitura, ou seja, não pode ser alterado via API # noqa: E501
        extra_kwargs = {"author": {"read_only": True}}
