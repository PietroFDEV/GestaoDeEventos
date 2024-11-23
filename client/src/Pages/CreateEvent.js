import { useState, useEffect, useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { api } from "../api"
import '../Styles/CreateEvent.css'
import Header from "../Components/Header"
import Footer from "../Components/Footer"
import { categories } from "../Contexts/categories"

function CreateEvent(){
    const [event, setEvent] = useState({ titulo: '', descricao: '', categoria_id: 0, capacidade: 0, data: '', hora: '', endereco: '', local: '' })

    const navigate = useNavigate()

    async function handleSubmit() {
        let user = await JSON.parse(localStorage.getItem('user'))
        const ev = {
            Titulo: event.titulo,
            Descricao: event.descricao,
            Data: event.data,
            Hora: `${event.hora}:00`,
            Local: event.local,
            Capacidade: parseInt(event.capacidade),
            endereco: event.endereco,
            categoria_id: parseInt(event.categoria_id),
            UsuarioId: user.id,
            TipoEvento: 'evento',
            Ativo: true
        }

        const response = await api.post('/Evento/CreateEvent', ev)

        if(response.status === 201){
            navigate(`/meu-evento?id=${response.data.id}`)
        }
    }

    return (
        <div className="ce-page">
            <Header />
            <div className="ce-container">
                <h3 className="ce-title">Crie um evento!</h3>
                <div className="ce-field-div">
                    <p className="ce-field-title">Nome do evento</p>
                    <input type="text" placeholder="Nome" className="ce-field" onChange={(e) => setEvent({ ...event, titulo: e.target.value })} />
                </div>
                <div className="ce-field-div">
                    <p className="ce-field-title">Descrição do evento</p>
                    <input type="text" placeholder="Descrição" className="ce-field" onChange={(e) => setEvent({ ...event, descricao: e.target.value })} />
                </div>
                <div className="ce-field-div">
                    <p className="ce-field-title">Categoria do evento</p>
                    <select className="ce-field-select" onChange={(e) => setEvent({ ...event, categoria_id: e.target.value })}>
                        <option value={null}>Selecione uma categoria</option>
                        {categories.map((cat, i) => (
                            <option key={i} value={cat.cod}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="ce-field-div">
                    <p className="ce-field-title">Capacidade do evento</p>
                    <input type="number" placeholder="100" className="ce-field" onChange={(e) => setEvent({ ...event, capacidade: e.target.value })} />
                </div>
                <div className="ce-field-div">
                    <p className="ce-field-title">Data e hora do evento</p>
                    <div className="date-time-div">
                        <input type="date" className="ce-field-half" style={{ width: '150px' }} onChange={(e) => setEvent({ ...event, data: e.target.value })} />
                        <input type="time" className="ce-field-half" style={{ width: '110px' }} onChange={(e) => setEvent({ ...event, hora: e.target.value })} />
                    </div>
                </div>
                <div className="ce-field-div">
                    <p className="ce-field-title">Endereço do evento</p>
                    <input type="text" placeholder="Rua ..., Nº 111, Curitiba" className="ce-field" onChange={(e) => setEvent({ ...event, endereco: e.target.value })} />
                </div>
                <div className="ce-field-div">
                    <p className="ce-field-title">Local do evento</p>
                    <input type="text" placeholder="Local" className="ce-field" onChange={(e) => setEvent({ ...event, local: e.target.value })} />
                </div>

                <div className="ce-button-div">
                    <button type="submit" className="ce-button" onClick={() => handleSubmit()} >Criar evento</button>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default CreateEvent