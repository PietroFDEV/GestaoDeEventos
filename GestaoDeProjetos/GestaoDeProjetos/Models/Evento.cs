using System;
using System.Collections.Generic;

namespace GestaoDeProjetos.Models;

public partial class Evento
{
    public int Id { get; set; }

    public string Titulo { get; set; } = null!;

    public string? Descricao { get; set; }

    public DateTime Data { get; set; }

    public TimeSpan Hora { get; set; }

    public string? Local { get; set; }

    public string? TipoEvento { get; set; }

    public int? Capacidade { get; set; }

    public int? UsuarioId { get; set; }

    public DateTime? DataCriacao { get; set; }

    public virtual ICollection<Avaliaco> Avaliacos { get; set; } = new List<Avaliaco>();

    public virtual ICollection<Localidade> Localidades { get; set; } = new List<Localidade>();

    public virtual ICollection<Ticket> Tickets { get; set; } = new List<Ticket>();

    public virtual Usuario? Usuario { get; set; }

    public virtual ICollection<Categoria> Categoria { get; set; } = new List<Categoria>();
}
