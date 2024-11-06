using Microsoft.AspNetCore.Mvc;
using GestaoDeProjetos.Models;
using Microsoft.EntityFrameworkCore;

namespace GestaoDeProjetos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly GestaoprojetosContext _context;

        public TicketController(GestaoprojetosContext context)
        {
            _context = context;
        }  
    }
}
