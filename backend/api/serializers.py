# Importa o modelo User do Django, que representa os usuários do sistema
from django.contrib.auth.models import User

# Importa os módulos necessários do Django REST Framework (DRF) para trabalhar com serializadores # noqa: E501
from rest_framework import serializers


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
