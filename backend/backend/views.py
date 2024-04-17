from django.http import JsonResponse
from rest_framework import permissions, views, viewsets
from rest_framework.decorators import action

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
            calendar=self, calendar__owner__access_token=self.request.user
        )


class EventyView(views.APIView):
    def get(self, request):
        response = EventyAI().get_response("What is 2 + 2?")
        return JsonResponse({"message": response.choices[0].message.content})
