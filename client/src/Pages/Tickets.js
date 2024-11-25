import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../Components/Header"
import { api } from "../api"
import { categories } from "../Contexts/categories.js"
import '../Styles/Tickets.css'

function Tickets(){
    const [loading, setLoading] = useState(false)
    const [tickets, setTickets] = useState([])
    const [isModalActive, setIsModalActive] = useState(false)
    const [modalTicket, setModalTicket] = useState({})
    const [user, setUser] = useState({})

    useEffect(() => {
        loadTickets()
    }, [])

    async function loadTickets(){
        const user = await JSON.parse(localStorage.getItem('user'))
        setUser(user)
        const response = await api.get('/Ticket/ListTickets')

        const res = await api.get(`/Evento/ListEvents`)
        const events = res.data

        const myTickets = response.data.filter(e => e.usuarioId === user.id)

        const mergedtickets = myTickets.map(t => {
            const event = events.find(e => e.id === t.eventoId)
            return {
              ...t,
              event: event || null,
            }
        })

        setTickets(mergedtickets)
        setLoading(false)
    }

    async function loadTicket(ticket){
        setModalTicket(ticket)
        setIsModalActive(true)
    }

    if (!loading) return(
        <div className="tickets-page" style={{ marginTop: '100px', color: 'white' }}>
            <Header />
            <div className="" style={{ margin: '0px 12%' }}>
                <h1 style={{ fontSize: '26px', marginBottom: '40px' }}>Meus Tickets</h1 >
                {tickets.length > 0 ? (
                    <div className="ticket-grid">
                        {tickets.map((ticket, i) => (
                            <div onClick={() => loadTicket(ticket)} key={i} style={{ flexDirection: 'column', paddingTop: '20px' }}
                                className={ticket.event.ativo ? 'ticket-div' : 'ticket-div-disabled'}>
                                <div style={{ fontSize: '22px' }}>Ticket {ticket.id}</div>
                                <div className="my-event-info" style={{ alignItems: 'center', marginLeft: 0 }}>
                                    <p className="event-card-title" style={{ fontFamily: 'Lato Bold' }}>{ticket.event.titulo}</p>
                                    <p style={{ fontSize: '20px', color: 'lightgray' }}>{new Date(ticket.event.data).toLocaleDateString()} • {ticket.event.hora.slice(0, 5)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <p>Você não possui tickets</p>
                    </div>
                )}
            </div>

            {isModalActive && (
                <div className="my-event-tickets-modal">
                    <div className="modal-container" style={{ width: '600px', height: '650px' }}>
                        <div className="modal-top">
                            <p style={{ fontSize: '26px' }}>Detalhes do ticket</p>
                            <button className="close-button" onClick={() => setIsModalActive(false)} style={{ fontSize: '40px' }}>&times;</button>
                        </div>

                        <div className="tickets-container" style={{ height: '90%', overflowY: 'auto', display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '50px' }}>
                            <p style={{ fontSize: '22px' }}><strong>Ticket:</strong> {modalTicket.id}</p>
                            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '30px' }}>
                                <p style={{ fontSize: '22px' }}><strong>Evento:</strong></p>
                                <a style={{ marginLeft: '10px', fontSize: '22px', color: '#64379b' }} href={`/evento?id=${modalTicket.event.id}`} target="_blank">{modalTicket.event.titulo}</a>
                            </div>
                            <p style={{ fontSize: '22px', marginTop: '30px', textAlign: 'center' }}><strong>Nome do comprador</strong> <br></br> {user.nome}</p>
                            
                            <p style={{ fontSize: '22px', marginTop: '30px', textAlign: 'center' }}><strong>Endereço do evento</strong> <br></br> {modalTicket.event.endereco}</p>

                            <p style={{ fontSize: '22px', marginTop: '30px', textAlign: 'center' }}><strong>Data e hora do evento</strong> <br></br>
                                {new Date(modalTicket.event.data).toLocaleDateString()} • {modalTicket.event.hora.slice(0, 5)}</p>

                            <p style={{ fontSize: '22px', marginTop: '30px', textAlign: 'center' }}><strong>Valor pago</strong> <br></br> R${modalTicket.preco.toFixed(2).replace('.',',')}</p>
                        </div>
                    </div>
                </div>
            )}
            

            
        </div>
    )

    return (
        <div>
            <p>Carregando...</p>
        </div>
    )
}

export default Tickets