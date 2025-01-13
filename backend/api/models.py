# Importa o módulo `models` do Django, que é usado para definir os modelos de dados no banco de dados # noqa: E501
from django.db import models

# Importa o modelo `User` do Django, que representa os usuários do sistema
from django.contrib.auth.models import User


# Define o modelo `Note` que será utilizado para criar a tabela de anotações no banco de dados # noqa: E501
class Note(models.Model):
    # Campo para o título da nota, limitado a 100 caracteres
    title = models.CharField(max_length=100)

    # Campo para o conteúdo da nota, com tamanho variável
    content = models.TextField()

    # Campo para registrar a data e hora de criação da nota automaticamente
    # `auto_now_add=True` faz com que o Django defina automaticamente a data/hora ao criar a nota # noqa: E501
    created_at = models.DateTimeField(auto_now_add=True)

    # Relacionamento de chave estrangeira com o modelo `User`, indicando que cada nota pertence a um autor # noqa: E501
    # `on_delete=models.CASCADE` significa que, se o usuário for excluído, todas as notas associadas a ele também serão excluídas # noqa: E501
    # `related_name="notes"` permite que acessemos as notas de um usuário com `user.notes.all()` # noqa: E501
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="notes")

    # Método que retorna o título da nota quando uma instância de `Note` é chamada ou impressa # noqa: E501
    def __str__(self):
        return self.title
