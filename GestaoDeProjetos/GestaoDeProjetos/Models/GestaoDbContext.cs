using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace GestaoDeProjetos.Models
{
    public class GestaoDbContext : DbContext
    {
        public GestaoDbContext(DbContextOptions<GestaoDbContext> options)
            : base(options)
        {
        }

        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<Evento> Evento { get; set; }
        public DbSet<EventoCategoria> EventoCategoria { get; set; }
        public DbSet<Avaliacao> Avaliacao { get; set; }
        public DbSet<Localidade> Localidade { get; set; }
        public DbSet<Categoria> Categoria { get; set; }
        public DbSet<Ticket> Ticket { get; set; }

    }

}
