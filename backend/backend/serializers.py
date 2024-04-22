from rest_framework import serializers

from .models import Event, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["_id", "access_token"]


class EventSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        r = super().to_representation(instance)
        r["owner"] = UserSerializer(instance.owner).data
        return r

    class Meta:
        model = Event
        fields = "__all__"
