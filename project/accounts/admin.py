from django.contrib import admin
from django.apps import apps

app = apps.get_app_config('accounts')

# Obtém todos os modelos do aplicativo atual
models = app.get_models()

# Registra todos os modelos no admin
for model in models:
    admin.site.register(model)
