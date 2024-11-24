import { useState, useEffect, useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Header from "../Components/Header"
import Footer from "../Components/Footer.js"
import { api } from "../api"
import { categories } from "../Contexts/categories.js"
import { BsCalendar2Date } from "react-icons/bs"
import { MdOutlinePlace } from "react-icons/md"
import { FaStar } from "react-icons/fa"
import { FaRegStar } from "react-icons/fa"
import '../Styles/Event.css'
import { AuthContext } from "../Contexts/auth"

function Event(){
    const [loading, setLoading] = useState(true)
    const [event, setEvent] = useState({})
    const [creator, setCreator] = useState({})
    const [manyEvents, setManyEvents] = useState(0)
    const [initials, setInitials] = useState()
    const [tickets, setTickets] = useState(0)
    const [ableToComment, setAbleToComment] = useState(false)
    const [ratings, setRatings] = useState([{}])
    const [averageRating, setAverageRating] = useState(0.0)
    const [stars, setStars] = useState(0)
    const [comment, setComment] = useState('')
    const { authenticated } = useContext(AuthContext)

    const useQuery = () => new URLSearchParams(useLocation().search)
    const query = useQuery()
    const id = query.get('id')

    const navigate = useNavigate()

    useEffect(() => {
        loadEvent()
    }, [])

    async function loadEvent(){
        const response = await api.get(`/Evento/${id}`)
        setEvent(response.data)
        await loadCreator(response.data.usuarioId)
        const rating = await loadRatings(id)
        const soldTickets = await loadTickets(id)
        await verifyUser(soldTickets, rating)
        setLoading(false)
    }

    async function loadCreator(userId) {
        const response = await api.get(`/Usuario/${userId}`)
        setCreator(response.data)

        let events = await api.get(`/Evento/ListEvents`)
        events = events.data
        events = events.filter(e => e.usuarioId === userId)

        setManyEvents(events.length)

        const names = response.data.nome.split(' ')
        setInitials(names[0].charAt(0) + names[names.length - 1].charAt(0))
        return
    }

    function category(id){
        const category = categories.filter(c => c.cod === id)[0]
        return category
    }

    function getInitials(string) {
        const names = string.split(' ')
        const initial = names[0].charAt(0) + names[names.length - 1].charAt(0)
        return initial
    }

    async function loadRatings(eventoId){
        const response = await api.get(`/Rating/EventId/${eventoId}`)
        const avaliation = response.data

        let total = 0
        for(let i = 0; i < avaliation.length; i++){
            total = total + avaliation[i].nota
        }
        let average = (total / avaliation.length).toFixed(1)
        if(avaliation.length === 0){
            average = 0
        }
        setAverageRating(average)
        const users = []
        for(let i = 0; i < avaliation.length; i++){
            const res = await api.get(`/Usuario/${avaliation[i].usuarioId}`)
            users.push(res.data)
        }

        const mergedRatings = avaliation.map(rating => {
            const user = users.find(user => user.id === rating.usuarioId);
            return {
              ...rating,
              user: user || null, // Add the user or null if not found
            }
        })

        setRatings(mergedRatings)

        return mergedRatings
    }

    async function loadTickets(eventoId) {
        const response = await api.get(`/Ticket/EventId/${eventoId}`)
        return response.data
    }

    async function checkOut() {
        if(authenticated === true){
            const user = await JSON.parse(localStorage.getItem('user'))
            const ticket = {
                EventoId: event.id,
                UsuarioId: user.id,
                CodigoQr: '1',
                Lote: 1,
                Preco: event.preco
            }
            for(let i = 0; i < tickets; i++){
                await api.post(`/Ticket/CreateTicket`, ticket)
            }
            
            navigate('/tickets')
        } else {
            navigate('/login')
        }
    }

    async function submitRating() {
        if(authenticated === true){
            const user = await JSON.parse(localStorage.getItem('user'))
            const rating = {
                EventoId: event.id,
                UsuarioId: user.id,
                Nota: stars,
                Comentario: comment
            }
            await api.post(`/Rating/CreateRating`, rating)
            window.location.reload()
        }
    }

    async function verifyUser(soldTickets, ratings){
        const user = await JSON.parse(localStorage.getItem('user'))
        if(user){
            const alreadyCommented = ratings.find(r => r.usuarioId == user.id)
            if(alreadyCommented !== undefined){
                setAbleToComment(false)
                return
            }
            
            const buyed = soldTickets.find(s => s.usuarioId == user.id)
            if(!buyed){
                setAbleToComment(false)
                return
            }
            setAbleToComment(true)
            return
        } else {
            setAbleToComment(false)
            return
        }
    }

    if(!loading) {
        return (
            <div>
                <Header />
                <div className="event-page">
                    <div className="event-page-left" style={{ width: '60%', color: 'white', marginRight: '5%' }}>
                        <div className="event-page-section-1" style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                            <p style={{ fontSize: '40px', fontFamily: 'Lato Bold' }}>{event.titulo} {event.ativo ? '' : ' - Finalizado'}</p>
                            <p style={{ color: 'lightgray', fontSize: '26px', marginTop: '10px', marginBottom: '50px', wordWrap: 'break-word', overflowWrap: 'break-word' }}>{event.descricao}</p>

                            <p style={{ marginBottom: '10px', fontSize: '26px', fontFamily: 'Lato Bold' }}>Categoria do Evento</p>
                            <div className="event-page-category-div">
                                <div style={{ backgroundColor: 'white', width: '150px', height: '60px', borderRadius: '20px', 
                                display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {category(event.categoria_id).icon}
                                    <p style={{ marginLeft: '10px', fontSize: '22px', color: 'black', fontFamily: 'Lato Bold' }}>{category(event.categoria_id).name}</p>
                                </div>
                                
                            </div>
                        </div>

                        <div className="event-page-section-2" style={{ display: 'flex', flexDirection: 'column', marginTop: '50px' }}>
                            <p style={{ marginBottom: '10px', fontSize: '26px', fontFamily: 'Lato Bold' }}>Data e Hora</p>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <BsCalendar2Date color='#64379b' size='30px' />
                                <p style={{ fontSize: '22px', marginLeft: '10px' }}>{new Date(event.data).toLocaleDateString()} às {event.hora.slice(0, 5)}</p>
                            </div>

                            <p style={{ marginBottom: '10px', fontSize: '26px', fontFamily: 'Lato Bold', marginTop: '50px' }}>Localização</p>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <MdOutlinePlace color='#64379b' size='30px' />
                                <p style={{ fontSize: '22px', marginLeft: '10px' }}>{event.local} | {event.endereco}</p>
                            </div>
                        </div>

                        {event.ativo ? (
                            <div className="event-page-section-3" style={{ display: 'flex', flexDirection: 'column', marginTop: '50px' }}>
                                <p style={{ marginBottom: '10px', fontSize: '26px', fontFamily: 'Lato Bold' }}>Ingressos</p>
                                <div id="tickets-div" style={{ border: '2px solid #64379b', boxSizing: 'border-box', padding: '10px 20px', width: '400px',
                                display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderRadius: '5px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <p style={{ fontSize: '20px', marginBottom: '5px' }}>Ingresso Comum</p>
                                        <p style={{ fontSize: '20px' }}>R$ {(event.preco).toFixed(2).replace('.', ',')}</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', 
                                            width: '30px', height: '30px', borderRadius: '5px', backgroundColor: tickets === 0 ? 'gray' : '#64379b'}}
                                            onClick={() => setTickets(tickets === 0 ? 0 : tickets - 1)}
                                        >
                                            <p style={{ fontSize: '28px', userSelect: 'none' }}>-</p>
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '10px', marginRight: '10px' }}>
                                            <p style={{ fontSize: '22px', userSelect: 'none' }}>{tickets}</p>
                                        </div>

                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer',
                                            width: '30px', height: '30px', backgroundColor: '#64379b', borderRadius: '5px' }}
                                            onClick={() => setTickets(tickets + 1)}
                                        >
                                            <p style={{ fontSize: '26px', userSelect: 'none' }}>+</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (null)}

                        <div className="event-page-section-4" style={{ display: 'flex', flexDirection: 'column', marginTop: '50px', marginBottom: '50px' }}>
                            <p style={{ marginBottom: '10px', fontSize: '26px', fontFamily: 'Lato Bold' }}>Organizado por</p>
                            <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#1d1828', boxSizing: 'border-box', padding: '20px', borderRadius: '10px', width: '400px' }}>
                                <div className="account-divs" id="account-initials" style={{ fontSize: '24px', width: '60px', height: '60px', margin: '0 10px 0 0' }}>
                                    {initials}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <p style={{ fontSize: '22px' }}>{creator.nome}</p>
                                    <p style={{ fontSize: '18px', color: 'lightgray', marginTop: '5px' }}>
                                        {manyEvents} { manyEvents === 1 ? 'Evento organizado' : 'Eventos organizados' }
                                    </p>
                                </div>
                            </div>
                        </div>

                        {!event.ativo ? (
                            <div className="event-page-section-5" style={{ display: 'flex', flexDirection: 'column', marginTop: '50px', marginBottom: '50px' }} >
                                <p style={{ marginBottom: '15px', fontSize: '26px', fontFamily: 'Lato Bold' }}>Avaliações</p>

                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <p style={{ fontSize: '24px', marginRight: '5px' }}>{averageRating}</p>
                                        <FaStar color='#64379b' size='30px' />
                                    </div>
                                    
                                    <p style={{ fontSize: '22px', marginLeft: '30px' }}>{ratings.length} {ratings.length === 1 ? 'Avaliação' : 'Avaliações'}</p>
                                </div>
                                <div id="avaliations-div" style={{ marginTop: '30px', display: 'flex', flexDirection: 'row' }}>
                                    {ratings.length > 0 ? (
                                        <div style={{ width: '350px', marginRight: '30px' }}>
                                            {ratings.map((rating, i) => (
                                                <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid white', width: '100%',
                                                boxSizing: 'border-box', paddingBottom: '8px', marginBottom: '15px' }} key={i}>
                                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                        <div>
                                                        <div className="account-divs" id="account-initials" style={{ fontSize: '18px', width: '45px', height: '45px', margin: '0 10px 0 0' }}>
                                                            {getInitials(rating.user.nome)}
                                                        </div>
                                                        </div>
                                                        <div style={{ display: 'flex', flexDirection: 'column', width: '250px' }}>
                                                            <p style={{ fontSize: '18px', fontFamily: 'Lato Bold' }}>{rating.user.nome}</p>
                                                            <p style={{ fontSize: '16px', marginTop: '3px', color: 'lightgray' }}>{new Date(rating.dataAvaliacao).toLocaleDateString()}</p>
                                                        </div>
                                                        <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                                                            <p style={{ fontSize: '22px', marginRight: '5px' }}>{rating.nota}</p>
                                                            <FaStar color='#64379b' size='25px' />
                                                        </div>
                                                    </div>
                                                    
                                                    <div style={{ marginTop: '10px' }}>
                                                        <p style={{ fontSize: '18px' }}>{rating.comentario}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        
                                        </div>
                                    ) : null}
                                    {ableToComment ? (
                                        <div style={{ width: '350px', display: 'flex', flexDirection: 'column' }}>
                                            <p style={{ fontSize: '22px' }}>Deixe sua avaliação</p>
                                            <div className="star-div" style={{ display: 'flex', flexDirection: 'row', marginTop: '10px', width: '100%' }}>
                                                {stars >= 1 ? <FaStar color='#64379b' size='25px' style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => setStars(1)}/>
                                                : <FaRegStar color='#64379b' size='25px' style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => setStars(1)}/>}
                                                {stars >= 2 ? <FaStar color='#64379b' size='25px' style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => setStars(2)}/>
                                                : <FaRegStar color='#64379b' size='25px' style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => setStars(2)}/>}
                                                {stars >= 3 ? <FaStar color='#64379b' size='25px' style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => setStars(3)}/>
                                                : <FaRegStar color='#64379b' size='25px' style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => setStars(3)}/>}
                                                {stars >= 4 ? <FaStar color='#64379b' size='25px' style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => setStars(4)}/>
                                                : <FaRegStar color='#64379b' size='25px' style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => setStars(4)}/>}
                                                {stars == 5 ? <FaStar color='#64379b' size='25px' style={{ cursor: 'pointer' }} onClick={() => setStars(5)}/>
                                                : <FaRegStar color='#64379b' size='25px' style={{ cursor: 'pointer' }} onClick={() => setStars(5)}/>}
                                            </div>
                                            <textarea type="text" placeholder="Escreva sua avaliação aqui" style={{ fontFamily: 'Lato', fontSize: '16px', outline: 'none',
                                                marginTop: '15px', padding: '5px', resize: 'none', width: '90%', height: '60px', borderRadius: '5px', border: '0px'
                                            }} value={comment} onChange={(e) => setComment(e.target.value)} />
                                            <button style={{ cursor: 'pointer', marginTop: '15px', width: '180px', backgroundColor: '#64379b', border: '0px', color: 'white',
                                            fontSize: '18px', height: '40px', borderRadius: '5px'
                                            }} onClick={() => submitRating() }>Enviar avaliação</button>
                                        </div>
                                    ) : (
                                        null
                                    )}
                                    
                                </div>
                                
                            </div>
                        ) : (null)}
                    </div>
                    <div className="event-page-right" style={{ width: '35%' }}>
                        <div className="select-tickets-div" style={{ position: 'fixed', border: '1px solid gray', width: '370px', height: '70px', borderRadius: '10px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '50px' }}>
                            {event.ativo ? 
                                tickets === 0 ? (
                                    <div className="select-tickets-inner">
                                        <a href="#tickets-div">
                                            <p style={{ fontSize: '20px' }}>Selecionar ingressos</p>
                                        </a>
                                    </div>
                                ) : (
                                    <div className="select-tickets-inner" onClick={() => checkOut()}>
                                        <p style={{ fontSize: '20px' }}>Comprar ( R$ {(event.preco * tickets).toFixed(2).replace('.', ',')} )</p>
                                    </div>
                                )
                            : (
                                <div className="select-tickets-inner">
                                    <a href="#avaliations-div">
                                        <p style={{ fontSize: '20px' }}>Visualizar avaliações</p>
                                    </a>
                                </div>
                            )}
                            
                            
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
    
    return (
        <div>
            <p>Carregando...</p>
        </div>
    )
}

export default Event