import requests, asyncio
from .models import *
baseUrl = "http://localhost:5000/"
clientURl = "clients/"
employeeURL = "employees/"

# Client Functions
def GetClientList(): 
    URL = baseUrl + clientURl
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

def CreateClient(client_name):
    URL = baseUrl + clientURl 
    # jsonData = 
    r = requests.post(url = URL, json={
    "name": client_name,
    })
    print(f"Status Code: {r.status_code}, Response: {r.json()}")
   
def UpdateClient(client): 
    URL = baseUrl + clientURl + client.id
    r = requests.put(url = URL, json={
    "name": client.name,
    })
    print(f"Status Code: {r.status_code}, Response: {r.json()}")

def DeleteClient(id):
    URL = baseUrl + clientURl + id
    r = requests.delete(url = URL)
    print(f"Status Code: {r.status_code}, Response: {r.json()}")

# Employee Functions
def GetEmployeeList(): 
    URL = baseUrl + employeeURL
    r = requests.get(url = URL)
    data = r.json()
    employeeList = []
    for employee in data:
        employeeList.append(EmployeeData(employee['id'], employee['name']))
    return employeeList

def GetEmployeeByID(id):
    URL = baseUrl + employeeURL + id 
    r = requests.get(url = URL)
    data = r.json()
    return EmployeeData(data['id'], data['name'])

def CreateEmployee(employee_name):
    print("create")
    URL = baseUrl + employeeURL 
    r = requests.post(url = URL, json={
    "name": employee_name,
    })
    print(f"Status Code: {r.status_code}, Response: {r.json()}")
   
def UpdateEmployee(employee): 
    print("updated") 
    URL = baseUrl + employeeURL + employee.id
    r = requests.put(url = URL, json={
    "name": employee.name,
    })
    print(f"Status Code: {r.status_code}, Response: {r.json()}")

def DeleteEmployee(id):
    URL = baseUrl + employeeURL + id
    r = requests.delete(url = URL)
    print(f"Status Code: {r.status_code}, Response: {r.json()}")

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

def CreateEngagents():
    print("create")

def UpdateEngagents(): 
    print("updated")

def DeleteEngagement():
    print("Delete")

def EndEngagement():
    print("END")

