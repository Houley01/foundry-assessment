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
            ClientName tempName = new ClientName();
            tempName.name = txtName.Text;
            ClientsApi clientsApi = new ClientsApi();
            var statusCode = clientsApi.CreateClient(tempName);
            if (statusCode == System.Net.HttpStatusCode.OK)
            {
                txtName.Text = null;
                GetDataForGridView();
            }
            
        }

        protected void OnRowEditing() { }

        protected void OnRowCancelingEdit() { }

        protected void OnRowUpdating() { }

        protected async void OnRowDeleting(object sender, GridViewDeleteEventArgs e) 
        {
            try {
                string id = (string)GridViewClients.DataKeys[e.RowIndex].Values[0];
                Console.WriteLine(id);
                ClientsApi clientsApi = new ClientsApi();
                var statusCode = await clientsApi.DeleteClient(id);
                this.GetDataForGridView();
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