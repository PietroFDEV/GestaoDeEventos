import Header from '../Components/Header.js'
import Footer from '../Components/Footer.js'
import { api } from "../api"
import '../Styles/Events.css'
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { IoFilter } from "react-icons/io5"

function Events(){
    const [searchParams, setSearchParams] = useState({ search: '', cat: '', dataMin: '', dataMax: '' })
    const [events, setEvents] = useState([{}])
    const [loading, setLoading] = useState(true)
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    const navigate = useNavigate()
    const useQuery = () => new URLSearchParams(useLocation().search)
    const query = useQuery()

    useEffect(() => {
        const search = query.get('search')
        const cat = query.get('cat')
        const dataMin = query.get('dataMin')
        const dataMax = query.get('dataMax')

        const params = {search: search, cat: cat, dataMin: dataMin, dataMax: dataMax}

        setSearchParams(params)

        filterEvents(params)
    }, [])

    async function filterEvents(params) {
        const response = await api.get(`/Evento/ListEvents`)
        let eventos = response.data
        if(params.search){
            eventos = eventos.filter(e => e.titulo.toLowerCase().includes(params.search.toLowerCase()))
        }

        if(params.cat){
            eventos = eventos.filter(e => e.categoria_id == params.cat)
        }

        if(params.dataMin){
            eventos = eventos.filter(e => e.data >= params.dataMin)
        }

        if(params.dataMax){
            eventos = eventos.filter(e => e.data <= params.dataMax)
        }

        setEvents(eventos)
        setLoading(false)
    }

    if (!loading) {
        return (
            <div>
                <Header />
                <div className="events-page">
                    <div className='events-page-top' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottom: '2px solid white', 
                        width: '100%', paddingBottom: '15px', justifyContent: 'space-between'
                    }}>
                        <p style={{ fontSize: '30px' }}>Eventos disponíveis</p>
                        <div className='filter-button' onClick={() => setIsFilterOpen(true)}>
                            <IoFilter color='white' size='30px' />
                            <p style={{ fontSize: '22px', marginLeft: '10px' }}>Filtros</p>
                        </div>
                    </div>
                    
                    <div className='events-middle' style={{ width: '100%' }}>
                        <div className='events-page-grid'>
                            {events.map((event, i) => (
                                <a key={i} href={`/evento?id=${event.id}`}>
                                    <div className='events-page-grid-item'>
                                        <p>{event.titulo}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                
                {isFilterOpen ? (
                    <div className='background-filters-menu'>
                        <div className="filters-menu">
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p style={{ fontSize: '26px' }}>Filtros</p>
                                <button className="close-button" onClick={() => setIsFilterOpen(false)}>&times;</button>
                            </div>
                            
                            <div className="filters-options">
                                {/* Adicione seus filtros aqui */}
                                <p>Categoria</p>
                                <p>Data</p>
                                <p>Local</p>
                            </div>
                        </div>
                        <div style={{ minWidth: '80%', minHeight: '100%', marginLeft: '20%' }} onClick={() => setIsFilterOpen(false)}>

                        </div>
                    </div>
                ) : (null)}
            </div>
        )
    }

    return (
        <div>
            <p>Carregando...</p>
        </div>
    )
}

export default Events