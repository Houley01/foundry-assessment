using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using foundry_assessment.models;
using System.Net.Http;
using Newtonsoft.Json;
namespace foundry_assessment
{
    public partial class Client : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            // Create a object 
            IEnumerable<ClientsClass> clients = null;
            // Build the HTTP Client info
            HttpClient hClient = new HttpClient();
            hClient.BaseAddress = new Uri("http://localhost:5000/");

            // Wait for API Call to get data 
            var consumeAPI = hClient.GetAsync("clients");
            consumeAPI.Wait();

            var readData = consumeAPI.Result;
            if (readData.IsSuccessStatusCode)
            {
                // Convert Json Data Input into C# Objects
                var jsonString = readData.Content.ReadAsStringAsync();
                var ClientsList = JsonConvert.DeserializeObject<List<ClientsClass>>(jsonString.Result);
                Console.WriteLine(ClientsList);

                // Populate gridview
                GridViewClients.DataSource = ClientsList;
                GridViewClients.DataBind();

            }
        }

        protected void Insert() { }

        protected void OnRowEditing() { }

        protected void OnRowCancelingEdit() { }

        protected void OnRowUpdating() { }

        protected void OnRowDeleting(object sender, GridViewDeleteEventArgs e) 
        {
            string id = (string)GridViewClients.DataKeys[e.RowIndex].Values[0];
            Console.WriteLine(id);
        }
    }
}