public class Evento
{
    public int Id { get; set; }
    public string Titulo { get; set; }
    public string Descricao { get; set; }
    public DateTime Data { get; set; }
    public TimeSpan Hora { get; set; }
    public string Local { get; set; }
    public string TipoEvento { get; set; }
    public int? Capacidade { get; set; }
    public int UsuarioId { get; set; }
    public DateTime DataCriacao { get; set; }

    public Usuario Usuario { get; set; }
    public ICollection<Ticket> Tickets { get; set; }
    public ICollection<Localidade> Localidades { get; set; }
    public ICollection<EventoCategoria> EventosCategorias { get; set; }
    public ICollection<Avaliacao> Avaliacoes { get; set; }
}
