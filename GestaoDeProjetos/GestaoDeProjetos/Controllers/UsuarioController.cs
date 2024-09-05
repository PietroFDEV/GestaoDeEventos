using Microsoft.AspNetCore.Mvc;
using GestaoDeProjetos.Models;
using System.Linq;
using System.Threading.Tasks;
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

        // GET: api/Usuario/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);

            if (usuario == null)
            {
                return NotFound();
            }

            return usuario;
        }

        //GET: api/Usuario/Authenticate/{email}/{password}
        [HttpGet("Authenticate")]
        public async Task<ActionResult<Usuario>> Authenticate(string email, string password)
        {
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email == email && u.Senha == password);

            if (usuario == null)
            {
                return NotFound("Usuário não encontrado");
            }

            return usuario;
        }

        // POST: api/Usuario
        [HttpPost]
        public async Task<ActionResult<Usuario>> PostUsuario(Usuario usuario)
        {
            usuario.DataCriacao = DateTime.Now;

            if (string.IsNullOrWhiteSpace(usuario.Nome) ||
                string.IsNullOrWhiteSpace(usuario.Email) ||
                string.IsNullOrWhiteSpace(usuario.Senha))
            {
                return BadRequest("Nome, Email, and Senha são necessárias.");
            }

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUsuario), new { id = usuario.Id }, usuario);
        }
    }
}
