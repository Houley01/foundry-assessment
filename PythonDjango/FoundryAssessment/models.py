from django.db import models

class ClientName: 
    def __init__(self, name):
        self.name = name

class ClientData:
    def __init__(self, id, name): 
        self.id = id
        self.name = name 

class EmployeeName: 
    def __init__(self, name):
        self.name = name
class EmployeeData:
    def __init__(self, id, name): 
        self.id = id
        self.name = name 

class EngagementModel:
    def __init__(self, id, name, client, employee, description, started, ended):
        self.id = id
        self.name = name
        self.client = client
        self.employee = employee
        self.description = description
        self.started = started
        self.ended = ended

class EngagementDetails:
    def __init__(self, id, name, ClientClass, EmployeeClass, description, started, ended):
        self.id = id
        self.name = name
        self.ClientClass =  ClientData(ClientClass)
        self.EmployeeClass = EmployeeClass 
        self.description = description
        self.started = started
        self.ended = ended

class CreateEngagements:
    def __init__(self, name, client, employee):
        self.name = name
        self.client = client
        self.employee = employee
        self.description = description 


class UpdateEngagment:
    def __init__(self, id, name, description):
        self.id = id
        self.name = name
        self.description = description 