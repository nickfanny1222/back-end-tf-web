from django.contrib.sites.models import Site
from django.core.management.base import BaseCommand
from accounts.models import User

class Command(BaseCommand):
    help = "Configura dados iniciais da aplicação."
    requires_migrations_checks = True
    
    def handle(self, *args, **options):        
        # Cria o usuário administrador
        admin = User(
            email='admin@email.com', 
            username='Admin', 
            first_name='Admin',
            last_name='User',
            is_superuser=True,
            is_staff=True
        )
        admin.set_password('12345678')
        admin.save()
            
        for i in range(1, 10+1):
            random_user = User(email=f'usuario_{i}@email.com', 
                               username=f'Usuário {i}', 
                               first_name='Usuário',
                               last_name=f'Teste {i}')
            random_user.set_password('12345678')
            random_user.save()

        # configurar o model Site
        debug_site = Site.objects.get(id=1)
        debug_site.domain='localhost:8000'
        debug_site.name='Conexão Carreira'
        debug_site.save()

        self.stdout.write(msg='\033[1m\033[32m' + 'Tudo ok!' + '\033[0;0m')
