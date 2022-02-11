from django import forms

class CreateClientForm(forms.Form):
    client_name = forms.CharField(label='Clients Name', max_length=100)

class EditClientForm(forms.Form):
    client_name = forms.CharField(label='Clients Name', max_length=100)
    
class CreateEmployeeForm(forms.Form):
    employee_name = forms.CharField(label='Clients Name', max_length=100)

class EditEmployeeForm(forms.Form):
    employee_name = forms.CharField(label='Clients Name', max_length=100)