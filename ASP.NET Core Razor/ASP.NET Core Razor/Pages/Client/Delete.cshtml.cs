using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using ASP.NET_Core_Razor.Model;
using ASP.NET_Core_Razor.API;


namespace ASP.NET_Core_Razor.Pages.Client
{
    public class DeleteModel : PageModel
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
               await api.DeleteClient(clientClass.id);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            Console.WriteLine("debug");
            return RedirectToPage("../Client");

        }
    }
}
