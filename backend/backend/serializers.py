from bson import ObjectId
from rest_framework import serializers

from .models import Event, User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class EventSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        r = super().to_representation(instance)
        if isinstance(instance.owner, User):
            r["owner"] = UserSerializer(instance.owner).data
        return r

    def to_internal_value(self, data):
        data = data.copy()
        if isinstance(data["owner"], str):
            data["owner"] = ObjectId(data["owner"])
        return super().to_internal_value(data)

    class Meta:
        model = Event
        fields = "__all__"
