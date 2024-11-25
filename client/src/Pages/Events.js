import Header from '../Components/Header.js'
import Footer from '../Components/Footer.js'
import { api } from "../api"
import '../Styles/Events.css'
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { IoFilter } from "react-icons/io5"
import { categories } from "../Contexts/categories.js"

function Events(){
    const [searchParams, setSearchParams] = useState({ search: '', cat: '', dataMin: '', dataMax: '', preco: 0 })
    const [events, setEvents] = useState([{}])
    const [loading, setLoading] = useState(true)
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    const navigate = useNavigate()
    const useQuery = () => new URLSearchParams(useLocation().search)
    const query = useQuery()

    useEffect(() => {
        loadPage()
    }, [])

    async function loadPage(){
        const search = query.get('search')
        const cat = query.get('cat')
        const dataMin = query.get('dataMin')
        const dataMax = query.get('dataMax')
        const preco = query.get('preco')

        const params = {search: search, cat: cat, dataMin: dataMin, dataMax: dataMax, preco: preco}

        await setSearchParams(params)

        await filterEvents(params)
    }

    async function reloadPage(params) {
        await filterEvents(params)
        setIsFilterOpen(false)
    }

    async function filterEvents(params) {
        const response = await api.get(`/Evento/ListEvents`)
        let eventos = response.data

        eventos = eventos.filter(e => e.ativo)
        
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

        if(params.preco){
            if(params.preco !== '0'){
                eventos = eventos.filter(e => e.preco > 0)
            } else {
                eventos = eventos.filter(e => e.preco == 0)
            }
        }
        

        setEvents(eventos)
        setLoading(false)
    }

    function categoryIcon(id){
        const category = categories.filter(c => c.cod === id)[0]

        return (
            category.icon
        )
    }

    function changeParams(){
        const newSearchParams = {
            search: searchParams.search,
            cat: searchParams.cat,
            dataMin: searchParams.dataMin,
            dataMax: searchParams.dataMax,
            preco: searchParams.preco
        }
        const params = new URLSearchParams(window.location.search)
        params.set('search', searchParams.search || '')
        params.set('cat', searchParams.cat || '')
        params.set('dataMin', searchParams.dataMin || '')
        params.set('dataMax', searchParams.dataMax || '')
        params.set('preco', searchParams.preco || 0)
        navigate(`?${params.toString()}`, { replace: true })

        reloadPage(newSearchParams)
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
                    
                    <div className='events-middle' style={{ width: '100%', marginTop: '20px' }}>
                        <div className='events-page-grid'>
                            {events.map((event, i) => (
                                <a key={i} href={`/evento?id=${event.id}`}>
                                    <div className="my-event-div">
                                        <div className='category-circle-card'>
                                            {categoryIcon(event.categoria_id)}
                                        </div>
                                        <div className="my-event-info">
                                            <p className="event-card-title" style={{ fontFamily: 'Lato Bold' }}>{event.titulo}</p>
                                            <p style={{ fontSize: '20px', color: 'lightgray' }}>{new Date(event.data).toLocaleDateString()} • {event.hora.slice(0, 5)}</p>
                                            <p style={{ fontSize: '20px', fontFamily: 'Lato Bold' }}>Preço: {event.preco > 0 ? (`R$ ${event.preco.toFixed(2)}`) : (`Grátis`)}</p>
                                            
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                
                {isFilterOpen && (
                    <div className='background-filters-menu'>
                        <div className="filters-menu">
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p style={{ fontSize: '26px' }}>Filtros</p>
                                <button className="close-button" onClick={() => setIsFilterOpen(false)}>&times;</button>
                            </div>
                            
                            <div className="filters-options">
                                <div className='categorias-div'>
                                    <p style={{ fontSize: '22px' }}>Categoria</p>
                                    <select defaultValue={searchParams.cat} className='select-category' onChange={(e) => setSearchParams({...searchParams, cat: e.target.value})}>
                                        <option value={null}>Selecione</option>
                                        <option value={1}>Festa</option>
                                        <option value={2}>Show</option>
                                        <option value={3}>Arte</option>
                                        <option value={4}>Esporte</option>
                                        <option value={5}>Gastronomia</option>
                                        <option value={6}>Tecnologia</option>
                                        <option value={7}>Religioso</option>
                                        <option value={8}>Games</option>
                                        <option value={9}>Outros</option>
                                    </select>
                                </div>

                                <div className='' style={{ marginTop: '30px' }}>
                                    <p style={{ fontSize: '22px' }}>Data</p>
                                    <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <p style={{ fontSize: '18px', width: '30px' }}>De:</p>
                                        <input type='date' style={{ marginLeft: '10px', fontSize: '18px', fontFamily: 'Lato', borderRadius: '5px', border: '0',
                                            padding: '2px 5px', cursor: 'pointer', outline: 'none' }} defaultValue={searchParams.dataMin} 
                                            onChange={(e) => setSearchParams({...searchParams, dataMin: e.target.value})}
                                        />
                                    </div>
                                    <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <p style={{ fontSize: '18px', width: '30px' }}>Até:</p>
                                        <input type='date' style={{ marginLeft: '10px', fontSize: '18px', fontFamily: 'Lato', borderRadius: '5px', border: '0',
                                            padding: '2px 5px', cursor: 'pointer', outline: 'none' }} defaultValue={searchParams.dataMax} 
                                            onChange={(e) => setSearchParams({...searchParams, dataMax: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div style={{ marginTop: '30px' }}>
                                    <p style={{ fontSize: '22px' }}>Preço</p>
                                    <select defaultValue={searchParams.preco} className='select-category' onChange={(e) => setSearchParams({...searchParams, preco: e.target.value})}>
                                        <option value={null}>Selecione</option>
                                        <option value={0}>Grátis</option>
                                        <option value={1}>Pago</option>
                                    </select>

                                </div>

                                <div style={{ marginTop: '30px' }}>
                                    <button className='apply-filter-button' onClick={() => changeParams()}>Aplicar filtros</button>
                                </div>
                            </div>
                        </div>
                        <div style={{ minWidth: '80%', minHeight: '100%', marginLeft: '20%' }} onClick={() => setIsFilterOpen(false)}>

                        </div>
                    </div>
                )}
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