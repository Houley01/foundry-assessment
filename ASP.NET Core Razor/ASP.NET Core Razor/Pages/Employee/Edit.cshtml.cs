using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using ASP.NET_Core_Razor.Model;
using ASP.NET_Core_Razor.API;
using Microsoft.AspNetCore.Mvc.Rendering;



namespace ASP.NET_Core_Razor.Pages.Employee
{
    public class EditModel : PageModel
    {
        [BindProperty]
        public EmployeeClass employee { get; set; } 

        public EmployeeAPI employeeAPI = new EmployeeAPI();
        public IActionResult OnGet(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            employee = employeeAPI.FindEmployeeByID(id);

            if (employee == null)
            {
                return NotFound();
            }
            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            try
            {
                employeeAPI.UpdateEmployee(employee);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }


            return RedirectToPage("../Employee");

        }
    }
}
