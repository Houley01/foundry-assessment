using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using ASP.NET_Core_Razor.Model;
using ASP.NET_Core_Razor.API;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace ASP.NET_Core_Razor.Pages.Engagement
{
    public class CreateModel : PageModel
    {
        [BindProperty]
        public CreateEngagements createEngagements { get; set; }
       
        public EngagementAPI engagementAPI = new EngagementAPI();
        public ClientsApi clientAPI = new ClientsApi();
        public EmployeeAPI employeeAPI = new EmployeeAPI();

        public List<EmployeeClass> employeeList { get; set; }
        public List<ClientClass> clientList { get; set; }

        [BindProperty]
        public string employeeDD { get; set; }
        [BindProperty]
        public string clientDD { get; set; }


        public void OnGet()
        {
            employeeList = employeeAPI.ReadEmployees();
            clientList = clientAPI.ReadClients();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            try
            {
                createEngagements.client = clientDD;
                createEngagements.employee = employeeDD;
                engagementAPI.Create(createEngagements);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }


            return RedirectToPage("../Engagement");

        }
    }
}
