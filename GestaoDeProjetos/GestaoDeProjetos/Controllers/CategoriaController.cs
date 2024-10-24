using Microsoft.AspNetCore.Mvc;
using GestaoDeProjetos.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace GestaoDeProjetos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase
    {
        private readonly GestaoprojetosContext _context;

        public CategoriaController(GestaoprojetosContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Categoria>> GetCategory(int id)
        {
            var category = await _context.Categorias.FindAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }

        [HttpGet("ListCategories")]
        public async Task<ActionResult<IEnumerable<Categoria>>> GetCategories()
        {
            var category = await _context.Categorias.ToListAsync();

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }

        [HttpPost("CreateCategory")]
        public async Task<ActionResult<Categoria>> PostCategory(Categoria category)
        {
            if (string.IsNullOrWhiteSpace(category.Nome))
            {
                return BadRequest("Nome é necessário.");
            }

            _context.Categorias.Add(category);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCategory), new { id = category.Id }, category);
        }
    }
}
