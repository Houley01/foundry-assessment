from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.template import loader
from django.contrib import messages
from FoundryAssessment.api import *
import requests
from .forms import *

def index(request):
    return render(request, 'index.html')

def clients(request):
    if request.method == 'POST':
        DeleteClient(request.POST.get("client_id"))
    # Do standand func and display data
    clientList = GetClientList()
    context = {'client_list': clientList}
    # messages.info(request, 'You have clicked delete account!') 
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
    if request.method == 'POST':
        DeleteEmployee(request.POST.get("employee_id"))
    # display standand data page
    dataList = GetEmployeeList()
    context = {'employeeList': dataList}
    return render(request, 'employees/employee.html', context)

def createEmployee(request):
    if request.method == 'POST':
        form = CreateEmployeeForm(request.POST)
        if form.is_valid():
            # localation of req data request.POST.get("client_name")
            CreateEmployee(request.POST.get("employee_name"))
            return HttpResponseRedirect('/employee')
    # Create a blank form
    else:
        return render(request, 'employees/create.html')

def editEmployee(request, id): 
    print(id)
    if request.method == 'POST':
        form = EditEmployeeForm(request.POST)
        if form.is_valid():
            UpdateEmployee(EmployeeData(request.POST.get("employee_id"), request.POST.get("employee_name")))
            return HttpResponseRedirect('/employee')
    # Create a blank form
    else:
        context = {'data': GetEmployeeByID(id)}
        return render(request, 'employees/edit.html', context)

def engagements(request):
    dataList = GetEngagmentsList()
    context = {'engagementList': dataList}
    return render(request, 'engagements/index.html', context)
