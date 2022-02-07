import requests
from .models import ClientData
baseUrl = "http://localhost:5000/"

def GetClientList(): 
    URL = baseUrl + "clients" 

    r = requests.get(url = URL)
    data = r.json()
    # print(data)
    clientList = []
    for client in data:
        # print(client['id'], client['name']) 
        clientList.append(ClientData(client['id'], client['name']))

    # for client in clientList:
    #     print(client.id, ' ', client.name)
    return clientList