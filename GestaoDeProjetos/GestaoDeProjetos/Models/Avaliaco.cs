using System;
using System.Collections.Generic;

namespace GestaoDeProjetos.Models;

public partial class Avaliaco
{
    public int Id { get; set; }

    public int? EventoId { get; set; }

    public int? UsuarioId { get; set; }

    public int? Nota { get; set; }

    public string? Comentario { get; set; }

    public DateTime? DataAvaliacao { get; set; }

    public virtual Evento? Evento { get; set; }

    public virtual Usuario? Usuario { get; set; }
}
