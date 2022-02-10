from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.template import loader
from FoundryAssessment.api import *
import requests
from .forms import *

def index(request):
    return HttpResponse("Hello, world. You're at the Home index.")

def clients(request):
    clientList = GetClientList()
    context = {'client_list': clientList}
    return render(request, 'clients/client.html', context )

def createClient(request):
    if request.method == 'POST':
        form = CreateClientForm(request.POST)
        if form.is_valid():
            # localation of req data request.POST.get("client_name")
            CreateClient(request.POST.get("client_name"))
            return HttpResponseRedirect('/clients')
    # Create a blank form
    else:
        # form = CreateClientForm()
        return render(request, 'clients/create.html')

def editClient(request, id): 
    print(id)
    if request.method == 'POST':
        form = EditClientForm(request.POST)
        if form.is_valid():
            # localation of req data request.POST.get("client_name")
            UpdateClient(ClientData(request.POST.get("client_id"), request.POST.get("client_name")))
            return HttpResponseRedirect('/clients')
    # Create a blank form
    else:
        context = {'data': GetClientByID(id)}
        return render(request, 'clients/edit.html', context)

def employees(request):
    # print('Employee REQ')
    dataList = GetEmployeeList()
    context = {'employeeList': dataList}
    return render(request, 'employees/employee.html', context)

def engagements(request):
    dataList = GetEngagmentsList()
    context = {'engagementList': dataList}
    return render(request, 'engagements/index.html', context)
