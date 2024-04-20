import coreapi
from django.http import JsonResponse
from rest_framework import permissions, views, viewsets
from rest_framework.decorators import action
from rest_framework.filters import BaseFilterBackend

from django.contrib.auth.decorators import login_required
from django.shortcuts import render

@login_required
def home(request):
    return render(request, 'core/home.html')

from .models import Calendar, Event, User
from .openai import EventyAI
from .serializers import CalendarSerializer, EventSerializer, UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Event.objects.filter(calendar__owner__access_token=self.request.user)


class CalendarViewSet(viewsets.ModelViewSet):
    queryset = Calendar.objects.all()
    serializer_class = CalendarSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Calendar.objects.filter(owner__access_token=self.request.user)

    @action(methods=["get"], detail=True)
    def events(self, request, pk=None):
        return Event.objects.filter(
            calendar=self,
            calendar__owner__access_token=self.request.user,
        )


class SimpleFilterBackend(BaseFilterBackend):
    def get_schema_fields(self, view):
        return [
            coreapi.Field(
                name="message", location="message", required=False, type="string"
            ),
        ]


class EventyView(views.APIView):
    filter_backends = (SimpleFilterBackend,)

    def get(self, request):
        response = EventyAI().get_response(request.GET["message"])
        return JsonResponse({"message": response.choices[0].message.content})
