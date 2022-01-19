﻿using System.Net.Http;
using System.Net;
using Newtonsoft.Json;
using System.Threading.Tasks;
using ASP.NET_Core_Razor.Model;
using System.Collections.Generic;
using System;
using System.Text;
using System.Net.Http.Headers;

namespace ASP.NET_Core_Razor.API
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

        public List<ClientClass> ReadClients()
        {
            List<ClientClass> ClientsList = new List<ClientClass>();
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
                ClientsList = JsonConvert.DeserializeObject<List<ClientClass>>(jsonString.Result);
                Console.WriteLine(ClientsList);
            }
            consumeAPI.Dispose();
            httpClient.Dispose();
            return ClientsList;
        }

        public ClientClass FindClientById(string id)
        {
            ClientClass client = new ClientClass();
            HttpClient httpClient = new HttpClient();
            httpClient.BaseAddress = new Uri("http://localhost:5000/");

            // Wait for API Call to get data 
            var consumeAPI = httpClient.GetAsync("clients/"+ id);
            consumeAPI.Wait();

            var readData = consumeAPI.Result;
            if (readData.IsSuccessStatusCode)
            {
                // Convert Json Data Input into C# Objects
                var jsonString = readData.Content.ReadAsStringAsync();
                client = JsonConvert.DeserializeObject < ClientClass> (jsonString.Result);
                Console.WriteLine(client);
            }
            consumeAPI.Dispose();
            httpClient.Dispose();

            return client;
        }

        public HttpStatusCode UpdateClient(ClientClass client)
        {
            HttpClient httpClient = new HttpClient();
            ClientName clientName = new ClientName();
            clientName.name = client.name;
            string jsonInput = JsonConvert.SerializeObject(clientName);
            var content = new StringContent(jsonInput, Encoding.UTF8, "application/json");
            var results = httpClient.PutAsync(baseUrl + clientsURL + client.id, content).Result;
            Console.WriteLine(results.StatusCode);
            httpClient.Dispose();
            return results.StatusCode;
        }
        public async Task<HttpStatusCode> DeleteClient(string clientId)
        {
            HttpClient httpClient = new HttpClient();
            HttpResponseMessage response = await httpClient.DeleteAsync(baseUrl + clientsURL + clientId);
            httpClient.Dispose();
            return response.StatusCode;
        }

    }
}
