import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import Header from "../Components/Header"
import { api } from "../api"
import { categories } from "../Contexts/categories.js"
import { FaRegFlag, FaStar } from "react-icons/fa"
import { BsCalendar2Date } from "react-icons/bs"
import { MdOutlinePlace } from "react-icons/md"

function MyEvent(){
    const [loading, setLoading] = useState(true)
    const [event, setEvent] = useState({})
    const [verify, setVerify] = useState(false)
    const [tickets, setTickets] = useState([])
    const [soldValue, setSoldValue] = useState(0.00)
    const [avaliations, setAvaliations] = useState([])
    const [averageRating, setAverageRating] = useState()
    const [isModalActive, setIsModalActive] = useState(false)

    const useQuery = () => new URLSearchParams(useLocation().search)
    const query = useQuery()
    const id = query.get('id')

    useEffect(() => {
        loadEvent()
    }, [id])

    async function loadEvent(){
        const user = await JSON.parse(localStorage.getItem('user'))
        const response = await api.get(`/Evento/${id}`)
        if(response.data.usuarioId === user.id){
            setEvent(response.data)
            setVerify(true)
            const ticket = await loadTickets(response.data.id)
            await loadAvaliations(response.data.id)
            calcRange(response.data.capacidade, ticket.length)
        } else {
            setVerify(false)
        }

        setLoading(false)
    }

    async function loadTickets(eventoId){
        const response = await api.get(`/Ticket/EventId/${eventoId}`)
        const ticks = response.data
        const users = []
        let totalValue = 0.00
        for(let i = 0; i < ticks.length; i++){
            const res = await api.get(`/Usuario/${ticks[i].usuarioId}`)
            users.push(res.data)
            totalValue = totalValue + ticks[i].preco
        }

        const mergedTickets = ticks.map(t => {
            const user = users.find(user => user.id === t.usuarioId)
            return {
              ...t,
              user: user || null,
            }
        })

        setTickets(mergedTickets)
        setSoldValue(totalValue)
        return response.data
    }

    async function loadAvaliations(eventoId){
        const response = await api.get(`/Rating/EventId/${eventoId}`)
        const avaliation = response.data
        setAvaliations(response.data)
        let total = 0
        for(let i = 0; i < avaliation.length; i++){
            total = total + avaliation[i].nota
        }
        let average = (total / avaliation.length).toFixed(1)
        if(avaliation.length === 0){
            average = 0
        }
        setAverageRating(average)
    }

    function calcRange(capacidade, tickets){
        setTimeout(() => {
            const range = document.getElementById('rangeInput')
            if (range) {
                const percentage = (tickets / capacidade) * 100
                range.style.background = `linear-gradient(to right, #64379b ${percentage}%, #e0e0e0 ${percentage}%)`
            }
        }, 100)
    }

    function category(id){
        const category = categories.filter(c => c.cod === id)[0]

        return (
            category
        )
    }

    async function finishEvent(){
        await api.post(`/Evento/FinishEvent/${id}`)
        window.location.reload()
    }

    if (!loading) return(
        <div>
            <Header />
            {verify === true ? (
                <div className="my-event-page">
                    <div className="my-event-top">
                        <h3 style={{ color: 'white', fontSize: '26px' }}>Detalhes do evento {!event.ativo ? ' - Finalizado' : null}</h3>

                        <div className="event-info-grid-top" style={{ display: 'flex', flexDirection: 'row', marginBottom: '30px', width: '60%' }}>
                            <div className="event-info-card" style={{ display: 'flex', flexDirection: 'row', marginRight: '3%', minWidth: '44%', justifyContent: 'start' }}>
                                <div className="event-info-card-icon-div" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'
                                    , marginRight: '10px', width: '60px', height: '60px', borderRadius: '10px' }}>
                                    <FaRegFlag color='black' size='40px' />
                                </div>
                                <div className="event-info-card-text-div" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '70%' }}>
                                    <p className="event-info-card-title" style={{ fontSize: '22px' }}>{event.titulo}</p>
                                    <p className="event-info-card-description" style={{ fontSize: '18px', color: 'lightgray', 
                                    maxWidth: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{event.descricao}</p>
                                </div>    
                            </div>

                            <div className="event-info-card" style={{ display: 'flex', flexDirection: 'row', minWidth: '44%'}}>
                                <div className="event-info-card-icon-div" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'
                                    , marginRight: '10px', width: '60px', height: '60px', borderRadius: '10px' }}>
                                    {category(event.categoria_id).icon}
                                </div>
                                <div className="event-info-card-text-div" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <p className="event-info-card-title" style={{ fontSize: '22px' }}>Categoria</p>
                                    <p className="event-info-card-description" style={{ fontSize: '18px', color: 'lightgray' }}>{category(event.categoria_id).name}</p>
                                </div>    
                            </div>
                        </div>
                        
                        {/* date and address */}
                        <div className="event-info-grid-top" style={{ display: 'flex', flexDirection: 'row', width: '60%' }}>
                            <div className="event-info-card" style={{ display: 'flex', flexDirection: 'row', marginRight: '30px' }}>
                                <div className="event-info-card-icon-div" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'
                                    , marginRight: '10px', width: '60px', height: '60px', borderRadius: '10px' }}>
                                    <BsCalendar2Date color='black' size='40px' />
                                </div>
                                <div className="event-info-card-text-div" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <p className="event-info-card-title" style={{ fontSize: '22px' }}>Data e horário</p>
                                    <p className="event-info-card-description" style={{ fontSize: '18px', color: 'lightgray' }}
                                    >{new Date(event.data).toLocaleDateString()} - {event.hora.slice(0, 5)}</p>
                                </div>    
                            </div>

                            <div className="event-info-card" style={{ display: 'flex', flexDirection: 'row'}}>
                                <div className="event-info-card-icon-div" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'
                                    , marginRight: '10px', width: '60px', height: '60px', borderRadius: '10px' }}>
                                    <MdOutlinePlace color='black' size='40px' />
                                </div>
                                <div className="event-info-card-text-div" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <p className="event-info-card-title" style={{ fontSize: '22px' }}>{event.local}</p>
                                    <p className="event-info-card-description" style={{ fontSize: '18px', color: 'lightgray' }}>{event.endereco}</p>
                                </div>    
                            </div>
                        </div>
                    </div>

                    <div className="my-event-bottom">
                        <div className="tickets-sold-div" style={{ width: '60%'}}>
                            <div className="tickets-sold-top" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '5px'  }}>
                                <p style={{ fontSize: '22px', color: 'white' }}>{((tickets.length / event.capacidade) * 100).toFixed(0)}% vendidos</p>
                                <p style={{ fontSize: '22px', color: 'white' }}>{tickets.length}/{event.capacidade} tickets</p>
                            </div>
                            <div className="tickets-sold-middle" style={{ width: '100%', marginBottom: '5px' }}>
                                <div className="range-container">
                                    <input type="range" id="rangeInput" min={0} max={event.capacidade} value={tickets.length} disabled />
                                </div>
                            </div>
                            <div className="tickets-sold-bottom" style={{ width: '100%' }}>
                                <p style={{ color: 'lightgray', fontSize: '20px', cursor: 'pointer' }} onClick={() => setIsModalActive(true)}>Ver tickets vendidos</p>
                            </div>
                        </div>
                        {event.ativo ? (
                            <div className="finish-event-div" style={{ width: '60%', marginTop: '50px' }}>
                                <button className="finish-event-button" style={{ outline: 'none', fontSize: '22px', width: '200px', height: '50px', border: '0px', 
                                borderRadius: '5px', cursor: 'pointer', backgroundColor: '#64379b', color: 'white' }} onClick={() => finishEvent()}>Finalizar evento</button>
                            </div>
                        ) : (
                            <div className="event-avaliations-div" style={{ display: 'flex', flexDirection: 'row', width: '60%', marginTop: '50px', 
                            color: 'white', fontSize: '24px', justifyContent: 'space-between', borderBottom: '3px solid white', paddingBottom: '5px', borderRadius: '2px' }}>
                                <div className="avaliations-value" style={{ display: 'flex', flexDirection: 'row' }}>
                                    <p style={{ marginRight: '15px' }}>Avaliação média:</p>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <FaStar color='yellow' size='24px' />
                                        <p style={{ marginLeft: '5px', fontSize: '24px' }}>{averageRating}</p>
                                    </div>
                                </div>
                        
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                                    <p>{avaliations.length} {avaliations.length === 1 ? 'Avaliação' : 'Avaliações'}</p>
                                    <a href={`/evento?id=${event.id}#tickets-div`}>
                                        <p style={{ fontSize: '20px', marginLeft: '10px', color: 'lightgray', cursor: 'pointer', marginBottom: '1px' }}>Ver avaliações</p>
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    {isModalActive && (
                        <div className="my-event-tickets-modal">
                            <div className="modal-container">
                                <div className="modal-top">
                                    <p style={{ fontSize: '24px' }}>Relação de tickets vendidos</p>
                                    <p style={{ fontSize: '20px' }}>Valor total vendido: R$ {soldValue.toFixed(2).replace('.',',')}</p>
                                    <button className="close-button" onClick={() => setIsModalActive(false)} style={{ fontSize: '40px' }}>&times;</button>
                                </div>

                                <div className="tickets-container" style={{ height: '90%', overflowY: 'auto' }}>
                                    <div className="modal-ticket-header">
                                        <p style={{ width: '15%', fontSize: '20px', textAlign: 'center' }}>Nº Ticket</p>
                                        <p style={{ width: '25%', fontSize: '20px' }}>Nome do comprador</p>
                                        <p style={{ width: '25%', fontSize: '20px' }}>E-mail do comprador</p>
                                        <p style={{ width: '15%', fontSize: '20px', textAlign: 'center' }}>Valor pago</p>
                                        <p style={{ width: '20%', fontSize: '20px', textAlign: 'center' }}>Data da compra</p>
                                    </div>
                                    <div style={{ marginTop: '0px' }}>
                                        {tickets.map((ticket, i) => (
                                            <div className="modal-ticket" key={i}>
                                                <div style={{ width: '15%', textAlign: 'center' }}>
                                                    <p style={{ fontSize: '18px' }}>{ticket.id}</p>
                                                </div>
                                                <div style={{ width: '25%' }}>
                                                    <p style={{ fontSize: '18px' }}>{ticket.user.nome}</p>
                                                </div>
                                                <div style={{ width: '25%' }}>
                                                    <p style={{ fontSize: '18px' }}>{ticket.user.email}</p>
                                                </div>
                                                <div style={{ width: '15%', textAlign: 'center' }}>
                                                    <p style={{ fontSize: '18px' }}>R$ {ticket.preco.toFixed(2).replace('.',',')}</p>
                                                </div>
                                                <div style={{ width: '20%', textAlign: 'center' }}>
                                                    <p style={{ fontSize: '18px' }}>{new Date(ticket.dataCompra).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            ) : (
                <div style={{ height: '100%', textAlign: 'center', marginTop: '120px', color: 'white', fontSize: '22px' }}>
                    <p>Você não tem acesso a esta página.</p>
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

export default MyEvent