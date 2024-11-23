import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../Components/Header"
import { api } from "../api"
import { categories } from "../Contexts/categories.js"

function Tickets(){
    const [loading, setLoading] = useState(false)
    const [tickets, setTickets] = useState([])

    useEffect(() => {
        loadTickets()
    }, [])

    async function loadTickets(){
        const user = await JSON.parse(localStorage.getItem('user'))
        const response = await api.get('/Ticket/ListTickets')
        const myTickets = response.data.filter(e => e.usuarioId === user.id)
        setTickets(myTickets)
        setLoading(false)
    }

    if (!loading) return(
        <div className="tickets-page" style={{ marginTop: '80px', color: 'white' }}>
            <Header />
            <h1>Tickets</h1>

            {tickets.length > 0 ? (
                <div>
                    {tickets.map((ticket, i) => (
                        <p>{ticket.preco}</p>
                    ))}
                </div>
            ) : (
                <div>
                    <p>Você não possui tickets</p>
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