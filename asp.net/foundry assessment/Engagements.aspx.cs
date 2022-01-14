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
    public partial class Engagement : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            GetDataForGridView();
            GetDropDownData();
        }

        protected void Insert(object sender, EventArgs eventArgs)
        {
            CreateEngagements createEngagements = new CreateEngagements();
            createEngagements.name = txtName.Text;
            if (string.IsNullOrEmpty(txtDescription.Text))
            {
                createEngagements.description = "";
            } else
            {
                createEngagements.description = txtDescription.Text;
            }
            createEngagements.client = clientDropDown.SelectedValue;
            createEngagements.employee = employeeDropDown.SelectedValue;

            EngagementsAPI engagementsAPI = new EngagementsAPI();
            

            var statusCode = engagementsAPI.Create(createEngagements);
            if (statusCode == System.Net.HttpStatusCode.OK)
            {
                txtName.Text = null;
                txtDescription.Text = null;
                GetDataForGridView();
            }
        }

        protected void OnRowEditing(object sender, GridViewEditEventArgs eventArgs)
        {
            GridViewEngagements.EditIndex = eventArgs.NewEditIndex;
            GetDataForGridView();
        }

        protected void OnRowCancelingEdit(object sender, EventArgs eventArgs)
        {
            GridViewEngagements.EditIndex = -1;
            GetDataForGridView();
        }

        protected void OnRowUpdating(object sender, GridViewUpdateEventArgs eventArgs)
        {
            try
            {
                GridViewRow row = GridViewEngagements.Rows[eventArgs.RowIndex];
                UpdateEngagment updateEngagment = new UpdateEngagment();
                updateEngagment.id = (string)GridViewEngagements.DataKeys[eventArgs.RowIndex].Values[0];
                updateEngagment.name = (row.FindControl("txtName") as TextBox).Text;
                updateEngagment.description = (row.FindControl("txtDescription") as TextBox).Text;
                Console.WriteLine(updateEngagment);
                
                EngagementsAPI engagementsAPI = new EngagementsAPI();
                engagementsAPI.Update(updateEngagment);
            
                GridViewEngagements.EditIndex = -1;
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
                string id = (string)GridViewEngagements.DataKeys[eventArgs.RowIndex].Values[0];
                EngagementsAPI engagementsAPI = new EngagementsAPI();
                _ = await engagementsAPI.Delete(id);
                GetDataForGridView();
            }
            catch (Exception ex)
            {
               Console.WriteLine(ex.Message);
            }

        }
        protected void OnRowEnd(object sender, GridViewCommandEventArgs eventArgs)
        {
            int index = int.Parse((string) eventArgs.CommandArgument);
            string id = (string )GridViewEngagements.DataKeys[index].Value;
            //Console.WriteLine(eventArgs);
            EngagementsAPI engagementsAPI = new EngagementsAPI();
            _ = engagementsAPI.EndAsync(id);
            GetDataForGridView();
        }


        private void GetDataForGridView()
        {
            EngagementsAPI engagmentApi = new EngagementsAPI();
            var list = engagmentApi.Read();
            // Populate gridview
            GridViewEngagements.DataSource = list;
            GridViewEngagements.DataBind();
        }

        private void GetDropDownData()
        {
            ClientsApi clientsApi = new ClientsApi();
            clientDropDown.DataSource = clientsApi.ReadClients();
            clientDropDown.DataBind();
            EmployeeApi employeeApi = new EmployeeApi();
            employeeDropDown.DataSource = employeeApi.ReadEmployees();
            employeeDropDown.DataBind();
        }
        
    }
}