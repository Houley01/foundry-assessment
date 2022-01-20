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
    public class EditModel : PageModel
    {
        [BindProperty]
        public UpdateEngagment engagement { get; set; }
        public EngagementAPI api = new EngagementAPI();
        public IActionResult OnGet(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            engagement = api.GetUpdateEngagmentByID(id);

            if (engagement == null)
            {
                return NotFound();
            }
            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            try
            {
                if (engagement.description == null)
                {
                    engagement.description = " ";
                }
                api.Update(engagement);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }


            return RedirectToPage("../Engagement");

        }

    }
}
