using Microsoft.AspNetCore.Mvc;

namespace GestaoDeProjetos.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventosController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Evento 1", "Evento 2", "Evento 3", "Evento 4", "Evento 5"
        };

        private readonly ILogger<EventosController> _logger;

        public EventosController(ILogger<EventosController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetEventoAleatorio")]
        public IEnumerable<Evento> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new Evento
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                Type = "VIP",
                Name = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}
