import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../Components/Header"
import { api } from "../api"
import { categories } from "../Contexts/categories.js"
import '../Styles/MyEvents.css'

function MyEvents(){
    const [loading, setLoading] = useState(true)
    const [events, setEvents] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        loadEvents()
    }, [])

    async function loadEvents(){
        const user = await JSON.parse(localStorage.getItem('user'))
        const response = await api.get('/Evento/ListEvents')
        const myEvents = response.data.filter(e => e.usuarioId === user.id)
        setEvents(myEvents)
        setLoading(false)
    }

    function category(id){
        const category = categories.filter(c => c.cod === id)[0]

        return (
            category
        )
    }



    if (!loading) return(
        <div className="my-events-page">
            <Header />

            <div className="content">
                <h3 className="my-events-title">Meus eventos</h3>
                <div className="my-events-grid">
                    {events.map((event, i) => (
                        <a href={`/meu-evento?id=${event.id}`} key={i}>
                            <div className={event.ativo ? "my-event-div" : "my-event-div-disabled"}>
                                <div className='category-circle-card'>
                                    {category(event.categoria_id).icon}
                                </div>
                                <div className="my-event-info">
                                    <p className="event-card-title" style={{ fontFamily: 'Lato Bold' }}>{event.titulo} {!event.ativo && ' - Finalizado'}</p>
                                    <p style={{ fontSize: '20px', color: 'lightgray' }}>{new Date(event.data).toLocaleDateString()} • {event.hora.slice(0, 5)}</p>
                                    <p style={{ fontSize: '20px', fontFamily: 'Lato Bold' }}>Preço: {event.preco > 0 ? (`R$ ${event.preco.toFixed(2)}`) : (`Grátis`)}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )

    return (
        <div>
            <p>Carregando...</p>
        </div>
    )
}

export default MyEvents