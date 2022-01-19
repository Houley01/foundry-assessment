using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using ASP.NET_Core_Razor.Model;
using ASP.NET_Core_Razor.API;

namespace ASP.NET_Core_Razor.Pages
{
    public class ClientModel : PageModel
    {
        [BindProperty]
        public string Name { get; set; }
        
        public ClientsApi api = new ClientsApi();
        public ClientName clientName = new ClientName();
        public void OnGet()
        {

        }
        public void OnPost()
        {
            clientName.name = Name;
            api.CreateClient(clientName);
        }
    }
}
