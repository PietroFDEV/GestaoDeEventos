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

    function categoryIcon(id){
        const category = categories.filter(c => c.cod === id)[0]

        return (
            category.icon
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
                            <div className={new Date(event.data) < new Date() ? "my-event-div-disabled" : "my-event-div"}>     
                                <div className='category-circle'>
                                    {categoryIcon(event.categoria_id)}
                                </div>
                                <div className="my-event-info">
                                    <p className="event-card-title">{event.titulo}</p>
                                    <p style={{ fontSize: '20px' }}>{new Date(event.data).toLocaleDateString()}</p>
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