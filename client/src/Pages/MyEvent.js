import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import Header from "../Components/Header"
import { api } from "../api"
import { categories } from "../Contexts/categories.js"

function MyEvent(){
    const [loading, setLoading] = useState(true)
    const [event, setEvent] = useState({})
    const [verify, setVerify] = useState()

    const useQuery = () => new URLSearchParams(useLocation().search)
    const query = useQuery()
    const id = query.get('id')

    useEffect(() => {
        loadEvent()
    }, [])

    async function loadEvent(){
        const user = await JSON.parse(localStorage.getItem('user'))
        const response = await api.get(`/Evento/${id}`)
        if(response.data.usuarioId === user.id){
            setEvent(response.data)
            setVerify(true)
        } else {
            setVerify(false)
        }

        setLoading(false)
    }

    if (!loading) return(
        <div>
            <Header />
            {verify === true ? (
                <div className="my-event-page">
                    <div className="my-event-top">
                        
                    </div>

                    <div className="my-event-bottom">
                        <p>aaaa</p>
                    </div>
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