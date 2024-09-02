public class Avaliacao
{
    public int Id { get; set; }
    public int EventoId { get; set; }
    public int UsuarioId { get; set; }
    public int Nota { get; set; }
    public string Comentario { get; set; }
    public DateTime DataAvaliacao { get; set; }

    public Evento Evento { get; set; }
    public Usuario Usuario { get; set; }
}
