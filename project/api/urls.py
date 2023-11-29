from django.urls import path
from . import views


urlpatterns = [
    # Usuários
    path('cadastrar_usuario', views.cadastrar_usuario, name='cadastrar_usuario'),
    path('listar_usuarios', views.listar_usuarios, name='listar_usuarios'),
    path('detalhes_usuario/<int:user_id>', views.detalhes_usuario, name='detalhes_usuario'),
    path('alterar_usuario/<int:user_id>', views.alterar_usuario, name='alterar_usuario'),
    path('excluir_usuario/<int:user_id>', views.excluir_usuario, name='excluir_usuario'),
    
    # Perfis
    path('cadastrar_perfil', views.cadastrar_perfil, name='cadastrar_perfil'),
    path('listar_perfis', views.listar_perfis, name='listar_perfis'),
    path('detalhes_perfil/<int:user_id>', views.detalhes_perfil, name='detalhes_perfil'),
    path('alterar_perfil/<int:user_id>', views.alterar_perfil, name='alterar_perfil'),
    path('excluir_perfil/<int:user_id>', views.excluir_perfil, name='excluir_perfil'),
]
