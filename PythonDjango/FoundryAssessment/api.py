import requests, asyncio
from .models import *
baseUrl = "http://localhost:5000/"

# Client Functions
def GetClientList(): 
    URL = baseUrl + "clients" 
    r = requests.get(url = URL)
    data = r.json()
    clientList = []
    for client in data:
        clientList.append(ClientData(client['id'], client['name']))
    return clientList

def GetClientByID(id):
    URL = baseUrl + "clients/" + id 
    r = requests.get(url = URL)
    data = r.json()
    return ClientData(data['id'], data['name'])

# Employee Functions
def GetEmployeeList(): 
    URL = baseUrl + "employees" 
    r = requests.get(url = URL)
    data = r.json()
    employeeList = []
    for employee in data:
        employeeList.append(EmployeeData(employee['id'], employee['name']))
    return employeeList

def GetEmployeeByID(id):
    URL = baseUrl + "employees/" + id 
    r = requests.get(url = URL)
    data = r.json()
    return ClientData(data['id'], data['name'])

# Engagments Functions
def GetEngagmentsList():
    URL = baseUrl + "engagements" 
    r = requests.get(url = URL)
    data = r.json()
    engagementList = []
    # Loop through the data from the api and attempt to add client and employee data
    for engagement in data:
        try:
           tempData = EngagementModel(
                engagement["id"],
                engagement["name"],
                GetClientByID(engagement["client"]),
                GetEmployeeByID(engagement["employee"]),
                engagement["description"],
                engagement["started"],
                engagement["ended"]
            )
    # Catch the Exection KeyError if "engagement["ended"]" does not exist in data
        except KeyError:
            tempData = EngagementModel(
                engagement["id"],
                engagement["name"],
                GetClientByID(engagement["client"]),
                GetEmployeeByID(engagement["employee"]),
                engagement["description"],
                engagement["started"],
                ""
            )
        engagementList.append(tempData)
    return engagementList