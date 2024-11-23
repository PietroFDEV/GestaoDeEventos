import { useState, useEffect, React } from "react"
import Header from '../Components/Header.js'
import Footer from '../Components/Footer.js'
import '../Styles/Home.css'
import { api } from '../api.js'
import { categories } from "../Contexts/categories.js"

function Home(){
    const [events, setEvents] = useState([{}])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getEvents()
    }, [])

    async function getEvents() {
        const response = await api.get('/Evento/ListEvents')
        let eventos = response.data.filter(e => e.ativo === true)
        eventos = eventos.sort((a, b) => b.capacidade - a.capacidade).slice(0, 8)
        setEvents(eventos)
        setLoading(false)
    }

    function categoryIcon(id){
        const category = categories.filter(c => c.cod === id)[0]

        return (
            category.icon
        )
    }

    if (!loading) return(
        <div className='home-page'>
            <Header logged={false}></Header>
            <div className='home-banner'>
                <img src='banner.png' width='100%'></img>
            </div>
            <div className='home-categories'>
                <h2>Encontre eventos por categoria</h2>
                <div className='categories-list'>
                    {categories.map((category, i) => (
                        <a href='#' key={i}>
                            <div className='category'>
                                <div className='category-circle'>
                                    {category.icon}
                                </div>
                                <div className='category-title'>
                                    <p>{category.name}</p>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
            <div className='next-events'>
                <h2>Próximos eventos</h2>
                <div className='events-home-grid'>
                    {events.map((event, i) => (
                        <a key={i} href={`/evento?id=${event.id}`}>
                            <div className="my-event-div">
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
            <div className='click-here-div'>
                <h2>Deseja anunciar ou criar seu evento?</h2>
                <a href="/criar-evento">
                    <button className='click-here-button'>Clique aqui</button>
                </a>
            </div>
            <Footer />
        </div>
    )

    return (
        <div>
            <p>Carregando...</p>
        </div>
    )
}

export default Home