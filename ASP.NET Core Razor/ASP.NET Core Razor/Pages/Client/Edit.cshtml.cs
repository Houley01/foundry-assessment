using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using ASP.NET_Core_Razor.Model;
using ASP.NET_Core_Razor.API;
using Microsoft.AspNetCore.Mvc.Rendering;
using ASP.NET_Core_Razor.Model;



namespace ASP.NET_Core_Razor.Pages.Client
{
    public class EditModel : PageModel
    {
        [BindProperty]
        public ClientClass clientClass { get; set; }
        public ClientsApi api = new ClientsApi();
        public IActionResult OnGet(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            clientClass = api.FindClientById(id);

            if (clientClass == null)
            {
                return NotFound();
            }
            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            try
            {
                api.UpdateClient(clientClass);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
         
            
            return RedirectToPage("../Client");
            
        }
    }
}
