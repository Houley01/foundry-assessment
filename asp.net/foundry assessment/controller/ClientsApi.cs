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
    public class ClientsApi
    {
        // Build the HTTP Client info
        readonly string baseUrl = "http://localhost:5000";
        readonly string clientsURL = "/clients/";
        readonly string EmployeesURL = "/employees/";
        readonly string engagementsURL = "/engagements/";

        //HttpClient httpClient = new HttpClient();


            //Needing to test this
            public HttpStatusCode CreateClient(ClientName clientName)
        {
            HttpClient httpClient = new HttpClient();
            string jsonInput = JsonConvert.SerializeObject(clientName);
            var content = new StringContent(jsonInput, Encoding.UTF8, "application/json");
            var results = httpClient.PostAsync(baseUrl + clientsURL, content).Result;
            return results.StatusCode;
        }

        public List<ClientsClass> ReadClients() 
        {
            List<ClientsClass> ClientsList = new List<ClientsClass>();
            // Build the HTTP Client info
            HttpClient httpClient = new HttpClient();
            httpClient.BaseAddress = new Uri("http://localhost:5000/");

            // Wait for API Call to get data 
            var consumeAPI = httpClient.GetAsync("clients");
            consumeAPI.Wait();

            var readData = consumeAPI.Result;
            if (readData.IsSuccessStatusCode)
            {
                // Convert Json Data Input into C# Objects
                var jsonString = readData.Content.ReadAsStringAsync();
                ClientsList = JsonConvert.DeserializeObject<List<ClientsClass>>(jsonString.Result);
                Console.WriteLine(ClientsList);
            }
            consumeAPI.Dispose();
            httpClient.Dispose();
            return ClientsList;
        }

        //public async Task<HttpStatusCode> UpdateClient(string clientId) { }
        public async Task<HttpStatusCode> DeleteClient(string clientId)
        {
            HttpResponseMessage response = await httpClient.DeleteAsync(baseUrl + clientsURL + clientId);
            return response.StatusCode;
        }
    }
}