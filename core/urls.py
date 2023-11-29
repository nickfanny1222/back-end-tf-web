from django.contrib import admin
from django.urls import path, include
from api.views import HomeView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('api.urls')),
    path('', HomeView.as_view())
]
