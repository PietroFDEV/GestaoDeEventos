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

        [HttpGet("{id}")]
        public async Task<ActionResult<Ticket>> GetTicket(int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);

            if (ticket == null)
            {
                return NotFound();
            }

            return ticket;
        }

        [HttpGet("EventId/{id}")]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetTicketByEventId(int id)
        {
            var tickets = await _context.Tickets
                .Where(d => d.EventoId == id)
                .ToListAsync();

            if (tickets == null)
            {
                return NotFound();
            }

            return tickets;
        }

        [HttpGet("ListTickets")]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetTickets()
        {
            var tickets = await _context.Tickets.ToListAsync();

            if (tickets == null)
            {
                return NotFound();
            }

            return tickets;
        }


        [HttpPost("CreateTicket")]
        public async Task<ActionResult<Ticket>> PostTicket(Ticket ticket)
        {
            ticket.DataCompra = DateTime.Now;

            if (ticket.EventoId is null or <= 0 ||
            ticket.UsuarioId is null or <= 0 ||
            string.IsNullOrWhiteSpace(ticket.CodigoQr) ||
            ticket.Lote is null or <= 0 ||
            ticket.Preco is null or <= 0)
            {
                return BadRequest("EventoId, UsuarioId, CodigoQr, Lote and Preco are required, and numeric fields must have positive values.");
            }



            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTicket), new { id = ticket.Id }, ticket);
        }
    }
}
