from django.http import HttpResponse
from django.shortcuts import render
from django.template import loader
from FoundryAssessment.api import *
import requests

def index(request):
    return HttpResponse("Hello, world. You're at the Home index.")

def clients(request):
    clientList = GetClientList()
    context = {'client_list': clientList}
    return render(request, 'clients/client.html', context )

def employees(request):
    # print('Employee REQ')
    dataList = GetEmployeeList()
    context = {'employeeList': dataList}
    return render(request, 'employees/employee.html', context)


def engagements(request):
    dataList = GetEngagmentsList()
    context = {'engagementList': dataList}
    return render(request, 'engagements/index.html', context)