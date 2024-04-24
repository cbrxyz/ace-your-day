import coreapi
from bson import ObjectId
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import permissions, views, viewsets
from rest_framework.decorators import action
from rest_framework.filters import BaseFilterBackend

from .models import Event, User
from .openai import EventyAI
from .serializers import EventSerializer, UserSerializer


@login_required
def home(request):
    return render(request, "core/home.html")


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

    def list(self, request):
        serializer = self.get_serializer(User.objects.all(), many=True)
        return JsonResponse(serializer.data, safe=False)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return JsonResponse(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            return JsonResponse(
                self.get_serializer(User.objects.get(pk=ObjectId(pk))).data,
            )
        except User.DoesNotExist:
            return JsonResponse({"success": False}, status=404)

    def update(self, request, pk=None):
        try:
            serializer = self.get_serializer(
                User.objects.get(pk=ObjectId(pk)),
                data=request.data,
            )
        except User.DoesNotExist:
            return JsonResponse({"success": False}, status=404)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return JsonResponse(serializer.data)

    def partial_update(self, request, pk=None):
        try:
            serializer = self.get_serializer(
                User.objects.get(pk=ObjectId(pk)),
                data=request.data,
                partial=True,
            )
        except User.DoesNotExist:
            return JsonResponse({"success": False}, status=404)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return JsonResponse(serializer.data)

    def destroy(self, request, pk=None):
        try:
            User.objects.get(pk=ObjectId(pk)).delete()
        except User.DoesNotExist:
            return JsonResponse({"success": False}, status=404)
        return JsonResponse({"success": True})

    @action(methods=["get"], detail=True)
    def events(self, request, pk=None):
        try:
            return JsonResponse(
                EventSerializer(
                    Event.objects.filter(
                        owner___id=ObjectId(pk) if pk else request.user,
                    ).distinct(),
                    many=True,
                ).data,
                safe=False,
            )
        except (User.DoesNotExist, Event.DoesNotExist):
            return JsonResponse({"success": False}, status=404)


class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        serializer = self.get_serializer(Event.objects.all(), many=True)
        return JsonResponse(serializer.data, safe=False)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return JsonResponse(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            return JsonResponse(
                self.get_serializer(Event.objects.get(pk=ObjectId(pk))).data,
                safe=False,
            )
        except Event.DoesNotExist:
            return JsonResponse({"success": False}, status=404)

    def update(self, request, pk=None):
        # If owner in request data, ensure it is ObjectId
        serializer = self.get_serializer(
            Event.objects.get(pk=ObjectId(pk)),
            data=request.data,
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return JsonResponse(serializer.data)

    def partial_update(self, request, pk=None):
        try:
            serializer = self.get_serializer(
                Event.objects.get(pk=ObjectId(pk)),
                data=request.data,
                partial=True,
            )
        except Event.DoesNotExist:
            return JsonResponse({"success": False}, status=404)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return JsonResponse(serializer.data)

    def destroy(self, request, pk=None):
        try:
            Event.objects.get(pk=ObjectId(pk)).delete()
        except Event.DoesNotExist:
            # raise 404 status
            return JsonResponse({"success": False}, status=404)
        return JsonResponse({"success": True})


class SimpleFilterBackend(BaseFilterBackend):
    def get_schema_fields(self, view):
        return [
            coreapi.Field(
                name="message",
                location="message",
                required=False,
                type="string",
            ),
        ]


class EventyView(views.APIView):
    filter_backends = (SimpleFilterBackend,)

    def get(self, request):
        response = EventyAI().get_response(request.GET["message"])
        return JsonResponse({"message": response.choices[0].message.content})
