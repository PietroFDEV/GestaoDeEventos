using Microsoft.AspNetCore.Mvc;
using GestaoDeProjetos.Models;
using Microsoft.EntityFrameworkCore;

namespace GestaoDeProjetos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly GestaoprojetosContext _context;

        public UsuarioController(GestaoprojetosContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetUser(int id)
        {
            var user = await _context.Usuarios.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpGet("Authenticate")]
        public async Task<ActionResult<bool>> Authenticate(string email, string password)
        {
            var user = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email == email && u.Senha == password);

            if (user == null)
            {
                return NoContent();
            }

            return Ok(user);
        }

        [HttpPost("CreateUser")]
        public async Task<ActionResult<Usuario>> PostUser(Usuario user)
        {
            user.DataCriacao = DateTime.Now;

            if (string.IsNullOrWhiteSpace(user.Nome) ||
                string.IsNullOrWhiteSpace(user.Email) ||
                string.IsNullOrWhiteSpace(user.Senha))
            {
                return BadRequest("Nome, Email, and Senha são necessárias.");
            }

            _context.Usuarios.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }
    }
}
