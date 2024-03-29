"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.contrib.auth.views import LogoutView
from django.urls import include, path
from django.views.generic import TemplateView
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions, routers

from .views import UserViewSet, EventViewSet, CalendarViewSet

router = routers.DefaultRouter()
router.register(r"users", UserViewSet)
router.register(r"events", EventViewSet)
router.register(r"calendars", CalendarViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title="ace-your-day API",
        default_version="v1",
        description="API for ace-your-day",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="cbrown14@ufl.edu"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("admin/", admin.site.urls),
    # path("app/", include("ace_your_day.urls")),
    path("", TemplateView.as_view(template_name="index.html")),
    path("api/", include(router.urls)),
    path("accounts/", include("allauth.urls")),
    path("logout", LogoutView.as_view()),
    # path("api/", include("rest_framework.urls", namespace="rest_framework")),
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
   path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
