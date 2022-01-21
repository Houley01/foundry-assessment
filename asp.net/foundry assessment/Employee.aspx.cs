using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using foundry_assessment.models;
using System.Net.Http;
using Newtonsoft.Json;
using foundry_assessment.controller;
using System.Threading.Tasks;

namespace foundry_assessment
{
	public partial class Employee : System.Web.UI.Page
	{
        protected void Page_Load(object sender, EventArgs e)
        {
            GetDataForGridView();
        }

        protected void Insert(object sender, EventArgs eventArgs)
        {
            EmployeeName tempName = new EmployeeName();
            tempName.name = txtName.Text;
            EmployeeApi EmployeeApi = new EmployeeApi();
            var statusCode = EmployeeApi.CreateEmployee(tempName);
            if (statusCode == System.Net.HttpStatusCode.OK)
            {
                txtName.Text = null;
                GetDataForGridView();
            }

        }

        protected void OnRowEditing(object sender, GridViewEditEventArgs eventArgs)
        {
            GridViewEmployee.EditIndex = eventArgs.NewEditIndex;
            GetDataForGridView();
        }

        protected void OnRowCancelingEdit(object sender, EventArgs eventArgs)
        {
            GridViewEmployee.EditIndex = -1;
            GetDataForGridView();
        }

        protected void OnRowUpdating(object sender, GridViewUpdateEventArgs eventArgs)
        {
            try
            {
                GridViewRow row = GridViewEmployee.Rows[eventArgs.RowIndex];
                EmployeeClass employeeClass = new EmployeeClass();
                employeeClass.id = (string)GridViewEmployee.DataKeys[eventArgs.RowIndex].Values[0];
                employeeClass.name = (row.FindControl("txtName") as TextBox).Text;
                //Console.WriteLine(EmployeeClass);
                EmployeeApi employeeApi = new EmployeeApi();
                employeeApi.UpdateEmployee(employeeClass);

                GridViewEmployee.EditIndex = -1;
                GetDataForGridView();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        protected async void OnRowDeleting(object sender, GridViewDeleteEventArgs eventArgs)
        {
            try
            {
                string id = (string)GridViewEmployee.DataKeys[eventArgs.RowIndex].Values[0];
                Console.WriteLine(id);
                EmployeeApi employeeApi = new EmployeeApi();
                var statusCode = await employeeApi.DeleteEmployee(id);
                GetDataForGridView();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

        }

        private void GetDataForGridView()
        {
            EmployeeApi employeeApi = new EmployeeApi();
            var employeeList = employeeApi.ReadEmployees();
            // Populate gridview
            GridViewEmployee.DataSource = employeeList;
            GridViewEmployee.DataBind();
        }
    }
}