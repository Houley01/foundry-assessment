from django.http import HttpResponse
from FoundryAssessment.api import GetClientList
import requests

def index(request):
    return HttpResponse("Hello, world. You're at the Home index.")

def clients(request):
    clientList = GetClientList()
    return HttpResponse("Clients Home page.")
