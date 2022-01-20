using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using ASP.NET_Core_Razor.Model;
using ASP.NET_Core_Razor.API;

namespace ASP.NET_Core_Razor.Pages.Engagement
{
    public class EndModel : PageModel
    {
        [BindProperty]
        public Model.EngagementModel engagementModel { get; set; }
        public EngagementAPI api = new EngagementAPI();
        public IActionResult OnGet(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            engagementModel = api.FindEngagementByID(id);

            if (engagementModel == null)
            {
                return NotFound();
            }
            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            try
            {
                await api.EndAsync(engagementModel.id);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            Console.WriteLine("debug");
            return RedirectToPage("../Engagement");

        }
    }
}

