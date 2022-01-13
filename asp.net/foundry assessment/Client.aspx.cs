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
    public partial class Client : System.Web.UI.Page
    {
        ClientsApi clientsApi = new ClientsApi();
        protected void Page_Load(object sender, EventArgs e)
        {
            GetDataForGridView();
        }

        protected void Insert(object sender, EventArgs eventArgs) {
            EmployeeName tempName = new EmployeeName();
            tempName.name = txtName.Text;
            ClientsApi clientsApi = new ClientsApi();
            var statusCode = clientsApi.CreateClient(tempName);
            if (statusCode == System.Net.HttpStatusCode.OK)
            {
                txtName.Text = null;
                GetDataForGridView();
            }
            
        }

        protected void OnRowEditing(object sender, GridViewEditEventArgs eventArgs) 
        {
            GridViewClients.EditIndex = eventArgs.NewEditIndex;
            GetDataForGridView();
        }

        protected void OnRowCancelingEdit(object sender, EventArgs eventArgs) 
        { 
            GridViewClients.EditIndex = -1;
            GetDataForGridView();
        }

        protected void OnRowUpdating(object sender, GridViewUpdateEventArgs eventArgs) 
        {
            try
            {
                GridViewRow row = GridViewClients.Rows[eventArgs.RowIndex];
                ClientsClass clientsClass = new ClientsClass();
                clientsClass.id = (string)GridViewClients.DataKeys[eventArgs.RowIndex].Values[0];
                clientsClass.name = (row.FindControl("txtName") as TextBox).Text;
                //Console.WriteLine(clientsClass);
                ClientsApi clientsApi = new ClientsApi();
                clientsApi.UpdateClient(clientsClass);

                GridViewClients.EditIndex = -1;
                GetDataForGridView();
            } catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        protected async void OnRowDeleting(object sender, GridViewDeleteEventArgs eventArgs) 
        {
            try {
                string id = (string)GridViewClients.DataKeys[eventArgs.RowIndex].Values[0];
                Console.WriteLine(id);
                ClientsApi clientsApi = new ClientsApi();
                var statusCode = await clientsApi.DeleteClient(id);
                GetDataForGridView();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            
        }

        private void GetDataForGridView()
        {   
            var ClientsList = clientsApi.ReadClients();
            // Populate gridview
            GridViewClients.DataSource = ClientsList;
            GridViewClients.DataBind();
        }
    }
}