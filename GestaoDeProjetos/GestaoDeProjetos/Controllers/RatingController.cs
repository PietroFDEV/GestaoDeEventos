using Microsoft.AspNetCore.Mvc;
using GestaoDeProjetos.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace GestaoDeProjetos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RatingController : ControllerBase
    {
        private readonly GestaoprojetosContext _context;

        public RatingController(GestaoprojetosContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Avaliaco>> GetRating(int id)
        {
            var rating = await _context.Avaliacoes.FindAsync(id);

            if (rating == null)
            {
                return NotFound();
            }

            return rating;
        }

        [HttpGet("EventId/{id}")]
        public async Task<ActionResult<IEnumerable<Avaliaco>>> GetRatingsByEventId(int id)
        {
            var ratings = await _context.Avaliacoes
                .Where(d => d.EventoId == id)
                .ToListAsync();

            if (ratings == null)
            {
                return NotFound();
            }

            return ratings;
        }

        [HttpGet("ListRatings")]
        public async Task<ActionResult<IEnumerable<Avaliaco>>> GetRatings()
        {
            var ratings = await _context.Avaliacoes.ToListAsync();

            if (ratings == null)
            {
                return NotFound();
            }

            return ratings;
        }


        [HttpPost("CreateRating")]
        public async Task<ActionResult<Avaliaco>> PostRating(Avaliaco rating)
        {
            rating.DataAvaliacao = DateTime.Now;

            if (rating.EventoId is null or <= 0 ||
                rating.UsuarioId is null or <= 0 ||
                rating.Nota is null or < 1 or > 5 ||
                string.IsNullOrWhiteSpace(rating.Comentario))
            {
                return BadRequest("EventoId, UsuarioId, Nota, and Comentario are required, and Nota must be between 1 and 5.");
            }


            _context.Avaliacoes.Add(rating);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetRating), new { id = rating.Id }, rating);
        }
    }
}
