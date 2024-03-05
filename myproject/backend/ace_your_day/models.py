from djongo import models


class User(models.Model):
    _id = models.ObjectIdField()
    token = models.CharField(max_length=1000)
