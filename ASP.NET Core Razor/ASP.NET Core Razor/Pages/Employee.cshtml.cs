using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using ASP.NET_Core_Razor.API;
using ASP.NET_Core_Razor.Model;

namespace ASP.NET_Core_Razor.Pages
{
    public class EmployeeModel : PageModel
    {
        public string NewEmployeeName { get; set; }
        public EmployeeName employeeName = new EmployeeName();
        public EmployeeAPI employeeAPI = new EmployeeAPI();
        public void OnGet()
        {
        }
        public void OnPost()
        {
            employeeName.name = NewEmployeeName;
            employeeAPI.CreateEmployee(employeeName);
        }
    }
}
