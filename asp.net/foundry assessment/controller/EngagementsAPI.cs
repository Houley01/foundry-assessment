using System.Net.Http;
using System.Net;
using Newtonsoft.Json;
using System.Threading.Tasks;
using foundry_assessment.models;
using System.Collections.Generic;
using System;
using System.Text;
using System.Net.Http.Headers;

namespace foundry_assessment.controller
{
    public class EngagementsAPI
    {
        readonly string baseUrl = "http://localhost:5000";
        readonly string clientsURL = "/clients/";
        readonly string EmployeesURL = "/employees/";
        readonly string engagementsURL = "/engagements/";
        public List<EngagementDetails> Read()
        {
            List<EngagementDetails> engagementDetails = new List<EngagementDetails>();
            List<EngagementModel> tempList = new List<EngagementModel>();
            HttpClient httpClient = new HttpClient(); 
            httpClient.BaseAddress = new Uri(baseUrl);
            var consumeAPI = httpClient.GetAsync("engagements");
            consumeAPI.Wait();

            var readData = consumeAPI.Result;
            if (readData.IsSuccessStatusCode)
            {
                // Convert Json Data Input into C# Objects
                var jsonString = readData.Content.ReadAsStringAsync();
                tempList = JsonConvert.DeserializeObject<List<EngagementModel>>(jsonString.Result);
                Console.WriteLine(tempList);

                engagementDetails = GetDetails(tempList);
            }
            tempList.Clear();
            httpClient.Dispose();
            return engagementDetails;
        }

        private List<EngagementDetails> GetDetails(List<EngagementModel> engagementModel) 
        {
            List<EngagementDetails> engagementDetails = new List<EngagementDetails> ();
            ClientsApi clientsApi = new ClientsApi();
            // Get list of client data
            var clientData = clientsApi.ReadClients();
            // Get list of Employee data
            EmployeeApi empApi = new EmployeeApi();
            var empData = empApi.ReadEmployees();
            // Loop through the engagements  
            foreach (var engagement in engagementModel)
            {
                EngagementDetails temp = new EngagementDetails();
                temp.id = engagement.id;
                temp.name = engagement.name;
                temp.description = engagement.description;
                temp.started = engagement.started;
                temp.ended = engagement.ended;
                foreach (var emp in empData)
                {
                    if (engagement.employee == emp.id) temp.employee = emp; break;
                }
                foreach (var client in clientData)
                {
                    if (engagement.client == client.id) temp.client = client; break;
                }
                engagementDetails.Add (temp);
            }
            return engagementDetails; 
        }

        public void Create(CreateEngagements engagements)
        {

        }
        public void Update(UpdateEngagment details) { }

        public void Delete(string id) { }

        public void End(string id) { }
    }
}