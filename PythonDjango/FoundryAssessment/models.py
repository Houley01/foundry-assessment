from django.db import models

# Create your models here.
class ClientData:
    def __init__(self, id, name): 
        self.id = id
        self.name = name 