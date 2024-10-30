using Microsoft.AspNetCore.Mvc;
using GestaoDeProjetos.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace GestaoDeProjetos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventoController : ControllerBase
    {
        private readonly GestaoprojetosContext _context;

        public EventoController(GestaoprojetosContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Evento>> GetEvent(int id)
        {
            var ev = await _context.Eventos.FindAsync(id);

            if (ev == null)
            {
                return NotFound();
            }

            return ev;
        }

        [HttpGet("ListEvents")]
        public async Task<ActionResult<IEnumerable<Evento>>> GetEvents()
        {
            var ev = await _context.Eventos.ToListAsync();

            if (ev == null)
            {
                return NotFound();
            }

            return ev;
        }

        [HttpPost("CreateEvent")]
        public async Task<ActionResult<Evento>> PostEvent(Evento ev)
        {
            ev.DataCriacao = DateTime.Now;

            if (string.IsNullOrWhiteSpace(ev.Titulo) ||
                string.IsNullOrWhiteSpace(ev.Descricao) ||
                ev.Data == default ||
                ev.Hora == default ||
                string.IsNullOrWhiteSpace(ev.Local) ||
                string.IsNullOrWhiteSpace(ev.TipoEvento) ||
                ev.Capacidade is null or <= 0 ||
                ev.UsuarioId is null or <= 0)
            {
                return BadRequest("Todos os campos obrigatórios devem ser preenchidos com valores válidos.");
            }

            _context.Eventos.Add(ev);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEvent), new { id = ev.Id }, ev);
        }
    }
}
