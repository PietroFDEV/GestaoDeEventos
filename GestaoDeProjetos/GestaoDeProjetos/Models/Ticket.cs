public class Ticket
{
    public int Id { get; set; }
    public int EventoId { get; set; }
    public int UsuarioId { get; set; }
    public string CodigoQr { get; set; }
    public int? Lote { get; set; }
    public decimal? Preco { get; set; }
    public DateTime DataCompra { get; set; }

    public Evento Evento { get; set; }
    public Usuario Usuario { get; set; }
}
