from djongo import models


class User(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    access_token = models.CharField(max_length=1000)


class Event(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    title = models.CharField(max_length=100)
    start = models.DateTimeField()
    end = models.DateTimeField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="events")
    color = models.CharField(max_length=6, default="000000")
    text_color = models.CharField(max_length=6, default="ffffff")
    category = models.CharField(max_length=100)
    description = models.TextField()
    flexible = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
