from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    email = models.EmailField(verbose_name='Endereço de email', unique=True)
    is_active = models.BooleanField(
        verbose_name='É um usuário ativo', default=True
    )


class Profile(models.Model):
    COURSE_CHOICES = (
        (1, 'Informática'),
        (2, 'Agroindústria'),
        (3, 'Agropecuária')
    )
    STATUS_CHOICES = (
        (1, 'Matriculado'),
        (2, 'Cursando'),
        (3, 'Trancado'),
        (4, 'Concluído'),
        (5, 'Desistente'),
        (6, 'Formado')
    )
    
    user = models.OneToOneField(
        User,
        verbose_name='Perfil do usuário',
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    full_name = models.CharField(
        verbose_name='Nome completo', max_length=250, null=True, blank=True
    )
    course = models.IntegerField(
        verbose_name='Curso', choices=COURSE_CHOICES, null=True, blank=True
    )
    status = models.IntegerField(
        verbose_name='Status atual', choices=STATUS_CHOICES, null=True, blank=True
    )
    email = models.CharField(
        verbose_name='Email para contato', max_length=250, null=True, blank=True
    )
    phone = models.CharField(
        verbose_name='Telefone para contato', max_length=15, null=True, blank=True
    )
    skills = models.TextField(
        verbose_name='Habilidades', null=True, blank=True
    )
    show_profile = models.BooleanField(
        verbose_name='Autorizo a exibição do meu perfil',
        default=False,
    )
