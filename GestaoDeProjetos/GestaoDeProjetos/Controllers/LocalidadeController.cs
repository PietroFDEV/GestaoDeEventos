using Microsoft.AspNetCore.Mvc;
using GestaoDeProjetos.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace GestaoDeProjetos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocalidadeController : ControllerBase
    {
        private readonly GestaoprojetosContext _context;

        public LocalidadeController(GestaoprojetosContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Localidade>> GetLocation(int id)
        {
            var location = await _context.Localidades.FindAsync(id);

            if (location == null)
            {
                return NotFound();
            }

            return location;
        }

        [HttpGet("Event{id}")]
        public async Task<ActionResult<Localidade>> GetLocationByEventId(int id)
        {
            var locations = await _context.Localidades.ToListAsync();
            var location = locations.Find(d => d.EventoId == id);

            if (location == null)
            {
                return NotFound();
            }

            return location;
        }


        [HttpGet("ListLocation")]
        public async Task<ActionResult<IEnumerable<Localidade>>> GetLocations()
        {
            var location = await _context.Localidades.ToListAsync();

            if (location == null)
            {
                return NotFound();
            }

            return location;
        }

        [HttpPost("CreateLocation")]
        public async Task<ActionResult<Localidade>> PostLocation(Localidade location)
        {
            if (location.EventoId is null or <= 0 ||
                string.IsNullOrWhiteSpace(location.Endereco) ||
                string.IsNullOrWhiteSpace(location.Cidade) ||
                string.IsNullOrWhiteSpace(location.Estado) ||
                string.IsNullOrWhiteSpace(location.Cep))
            {
                return BadRequest("Todos os campos (Endereço, Cidade, Estado e Cep) são necessários.");
            }

            _context.Localidades.Add(location);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLocation), new { id = location.Id }, location);
        }
    }
}
