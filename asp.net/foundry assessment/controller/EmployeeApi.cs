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
    public class EmployeeApi
    {
        // Build the HTTP Client info
        readonly string baseUrl = "http://localhost:5000";
        readonly string clientsURL = "/clients/";
        readonly string employeesURL = "/employees/";
        readonly string engagementsURL = "/engagements/";

        //HttpClient httpClient = new HttpClient();


            //Needing to test this
            public HttpStatusCode CreateEmployee(EmployeeName employeeName)
        {
            HttpClient httpClient = new HttpClient();
            string jsonInput = JsonConvert.SerializeObject(employeeName);
            var content = new StringContent(jsonInput, Encoding.UTF8, "application/json");
            var results = httpClient.PostAsync(baseUrl + employeesURL, content).Result;
            return results.StatusCode;
        }

        public List<EmployeeClass> ReadEmployees() 
        {
            List<EmployeeClass> employeeList = new List<EmployeeClass>();
            // Build the HTTP Client info
            HttpClient httpClient = new HttpClient();
            httpClient.BaseAddress = new Uri(baseUrl);

            // Wait for API Call to get data 
            var consumeAPI = httpClient.GetAsync("employees");
            consumeAPI.Wait();

            var readData = consumeAPI.Result;
            if (readData.IsSuccessStatusCode)
            {
                // Convert Json Data Input into C# Objects
                var jsonString = readData.Content.ReadAsStringAsync();
                employeeList = JsonConvert.DeserializeObject<List<EmployeeClass>>(jsonString.Result);
                Console.WriteLine(employeeList);
            }
            consumeAPI.Dispose();
            httpClient.Dispose();
            return employeeList;
        }

        public HttpStatusCode UpdateEmployee(EmployeeClass employee)
        {
            HttpClient httpClient = new HttpClient();
            EmployeeName employeeName= new EmployeeName();
            employeeName.name = employee.name;
            string jsonInput = JsonConvert.SerializeObject(employeeName);
            var content = new StringContent(jsonInput, Encoding.UTF8, "application/json");
            var results = httpClient.PutAsync(baseUrl + employeesURL + employee.id, content).Result;
            Console.WriteLine(results.StatusCode);
            httpClient.Dispose();
            return results.StatusCode;
        }
        public async Task<HttpStatusCode> DeleteEmployee(string employeeId)
        {
            HttpClient httpClient = new HttpClient();
            HttpResponseMessage response = await httpClient.DeleteAsync(baseUrl + employeesURL + employeeId);
            httpClient.Dispose();
            return response.StatusCode;
        }

    }
}