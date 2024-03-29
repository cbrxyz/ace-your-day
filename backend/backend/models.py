from djongo import models


class User(models.Model):
    _id = models.ObjectIdField()
    access_token = models.CharField(max_length=1000)


class Calendar(models.Model):
    _id = models.ObjectIdField()
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    color = models.CharField(max_length=6)  # hex without hashtag


class Event(models.Model):
    _id = models.ObjectIdField()
    name = models.CharField(max_length=100)
    start = models.DateTimeField()
    end = models.DateTimeField()
    all_day = models.BooleanField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    calendar = models.ForeignKey(Calendar, on_delete=models.CASCADE)
