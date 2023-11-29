import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password, make_password
from accounts.models import Profile
from django.views.generic import TemplateView

# views dedicadas ao gerenciamento de usuarios
@csrf_exempt
def cadastrar_usuario(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')

        try:
            # Crie um novo usuário usando o model User do Django Allauth
            user = get_user_model().objects.create_user(
                username=username, email=email, password=make_password(password)
            )
        except:
            return JsonResponse({'message': 'Erro ao criar usuário, confira os dados e tente novamente!'})
        
        return JsonResponse({'message': 'Usuário criado com sucesso!'})

    return JsonResponse({'message': 'Método não permitido'}, status=405)

@csrf_exempt
def listar_usuarios(request):
    if request.method == 'GET':
        # Obtenha todos os usuários usando o model User do Django Allauth
        users = get_user_model().objects.all()

        # Serialize os dados conforme necessário
        user_data = [{'id':user.id, 'username': user.username, 'email': user.email} for user in users]

        return JsonResponse({'users': user_data})

    return JsonResponse({'message': 'Método não permitido'}, status=405)

@csrf_exempt
def detalhes_usuario(request, user_id):
    if request.method == 'GET':
        # Obtenha um usuário específico usando o model User do Django Allauth
        try:
            user = get_user_model().objects.get(id=user_id)
            user_data = {'username': user.username, 'email': user.email}
            return JsonResponse({'user': user_data})
        except get_user_model().DoesNotExist:
            return JsonResponse({'message': 'Usuário não encontrado'}, status=404)

    return JsonResponse({'message': 'Método não permitido'}, status=405)

@csrf_exempt
def alterar_usuario(request, user_id):
    if request.method == 'PUT':
        data = json.loads(request.body.decode('utf-8'))

        # Obtenha um usuário específico usando o model User do Django Allauth
        try:
            user = get_user_model().objects.get(id=user_id)
            user.username = data.get('username', user.username)
            user.email = data.get('email', user.email)

            # Verifique se a senha anterior foi fornecida
            senha_anterior = data.get('previous_password')
            if senha_anterior and check_password(senha_anterior, user.password):
                # A senha anterior está correta, agora podemos alterar a senha
                nova_senha = data.get('password')
                if nova_senha:
                    user.password = make_password(nova_senha)
            else:
                # Senha anterior não fornecida ou incorreta
                return JsonResponse({'message': 'Senha anterior não fornecida ou incorreta'}, status=400)

            user.save()
            return JsonResponse({'message': 'Informações do usuário alteradas com sucesso!'})
        except get_user_model().DoesNotExist:
            return JsonResponse({'message': 'Usuário não encontrado'}, status=404)

    return JsonResponse({'message': 'Método não permitido'}, status=405)

@csrf_exempt
def excluir_usuario(request, user_id):
    if request.method == 'DELETE':
        # Obtenha um usuário específico usando o model User do Django Allauth
        try:
            user = get_user_model().objects.get(id=user_id)
            user.delete()
            return JsonResponse({'message': 'Usuário excluído com sucesso!'})
        except get_user_model().DoesNotExist:
            return JsonResponse({'message': 'Usuário não encontrado'}, status=404)

    return JsonResponse({'message': 'Método não permitido'}, status=405)

# views dedicadas aos perfis de usuários
@csrf_exempt
def cadastrar_perfil(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        user_id = data.get('user_id')

        # Verificar se o usuário já possui um perfil
        if Profile.objects.filter(user_id=user_id).exists():
            return JsonResponse({'message': 'Este usuário já possui um perfil'}, status=400)

        try:
            # Criar um novo perfil
            profile = Profile.objects.create(
                user_id=user_id,
                full_name=data.get('full_name'),
                course=data.get('course'),
                status=data.get('status'),
                email=data.get('email'),
                phone=data.get('phone'),
                skills=data.get('skills'),
                show_profile=data.get('show_profile', False),
            )
        except:
            return JsonResponse({'message': 'Erro ao criar perfil, confira os dados e tente novamente!'}, status=400)
        
        return JsonResponse({'message': 'Perfil criado com sucesso!'})

    return JsonResponse({'message': 'Método não permitido'}, status=405)

@csrf_exempt
def listar_perfis(request):
    if request.method == 'GET':
        # Obter todos os perfis
        profiles = Profile.objects.all()

        # Serializar os dados conforme necessário
        profile_data = [{'user_id': profile.user_id, 'full_name': profile.full_name, 'course': profile.course, 'status': profile.status,
                         'email': profile.email, 'phone': profile.phone, 'skills': profile.skills, 'show_profile': profile.show_profile} for profile in profiles]

        return JsonResponse({'profiles': profile_data})

    return JsonResponse({'message': 'Método não permitido'}, status=405)

@csrf_exempt
def detalhes_perfil(request, user_id):
    if request.method == 'GET':
        # Obter o perfil associado ao usuário
        try:
            profile = Profile.objects.get(user_id=user_id)
            profile_data = {'full_name': profile.full_name, 'course': profile.course, 'status': profile.status,
                            'email': profile.email, 'phone': profile.phone, 'skills': profile.skills, 'show_profile': profile.show_profile}
            return JsonResponse({'profile': profile_data})
        except Profile.DoesNotExist:
            return JsonResponse({'message': 'Perfil não encontrado'}, status=404)

    return JsonResponse({'message': 'Método não permitido'}, status=405)

@csrf_exempt
def alterar_perfil(request, user_id):
    if request.method == 'PUT':
        data = json.loads(request.body.decode('utf-8'))

        # Obter o perfil associado ao usuário
        try:
            profile = Profile.objects.get(user_id=user_id)
            profile.full_name = data.get('full_name', profile.full_name)
            profile.course = data.get('course', profile.course)
            profile.status = data.get('status', profile.status)
            profile.email = data.get('email', profile.email)
            profile.phone = data.get('phone', profile.phone)
            profile.skills = data.get('skills', profile.skills)
            profile.show_profile = data.get('show_profile', profile.show_profile)
            profile.save()
            return JsonResponse({'message': 'Informações do perfil alteradas com sucesso!'})
        except Profile.DoesNotExist:
            return JsonResponse({'message': 'Perfil não encontrado'}, status=404)

    return JsonResponse({'message': 'Método não permitido'}, status=405)

@csrf_exempt
def excluir_perfil(request, user_id):
    if request.method == 'DELETE':
        # Excluir o perfil associado ao usuário
        try:
            profile = Profile.objects.get(user_id=user_id)
            profile.delete()
            return JsonResponse({'message': 'Perfil excluído com sucesso!'})
        except Profile.DoesNotExist:
            return JsonResponse({'message': 'Perfil não encontrado'}, status=404)

    return JsonResponse({'message': 'Método não permitido'}, status=405)

# view para listar os endpoints
class Home(TemplateView):
    template_name = 'home.html'
