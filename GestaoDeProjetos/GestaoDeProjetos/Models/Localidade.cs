public class Localidade
{
    public int Id { get; set; }
    public int EventoId { get; set; }
    public string Endereco { get; set; }
    public string Cidade { get; set; }
    public string Estado { get; set; }
    public string Cep { get; set; }

    public Evento Evento { get; set; }
}
