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
        }

        protected void Insert(object sender, EventArgs eventArgs)
        {
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
            GridViewEngagements.EditIndex = -1;
            GetDataForGridView();
        }

        protected void OnRowDeleting(object sender, GridViewDeleteEventArgs eventArgs)
        {

        }

        private void GetDataForGridView()
        {
            EngagementsAPI engagmentApi = new EngagementsAPI();
            var list = engagmentApi.Read();
            // Populate gridview
            GridViewEngagements.DataSource = list;
            GridViewEngagements.DataBind();
        }
    }
}