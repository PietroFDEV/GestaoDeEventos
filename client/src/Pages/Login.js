import { useState, useEffect, useContext } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { api } from "../api"
import '../Styles/login.css'
import { AuthContext } from "../Contexts/auth"

function Login(){
    const { authenticated, login } = useContext(AuthContext)
    const [registerUserState, setRegisterUserState] = useState({ nomeUsuario: '', emailUsuario: '', password: '' })
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        if(authenticated === true){
            navigate("/perfil")
        }
    }, [])

    const useQuery = () => new URLSearchParams(useLocation().search)
    const query = useQuery()
    const page = query.get('page')

    const handleSubmit = (e) => {
        e.preventDefault()
        if(email !== "" && password !== ""){
            login(email, password)
        } else {
            window.alert("Preencha todos os campos e tente novamente.")
        }
    }

    async function registerUser() {
        if (registerUserState.nomeUsuario !== '' && registerUserState.emailUsuario !== '' && registerUserState.password !== '') {
            const user = await api.post('/Usuario/createUser', {
                Nome: registerUserState.nomeUsuario,
                Email: registerUserState.emailUsuario,
                Senha: registerUserState.password
            })

            navigate("/login")
        }
        else {
            window.alert('Preencha todos os campos!')
        }
    }

    if (page === 'cadastro') return (
        <div className="login-page">
            <div className="profile-content">
                <div className="profile-register-card">
                    <div className="profile-login-card-top">
                        <h1>Bem vindo,<br></br> cadastre sua conta</h1>
                    </div>
                    <div className="profile-login-card-fields">
                        <div>
                            <p className="profile-login-inputs-title">Nome</p>
                            <input type="text" onChange={e => setRegisterUserState({ ...registerUserState, nomeUsuario: e.target.value })} className="profile-login-inputs" placeholder="John Dev" style={{ marginBottom: '20px' }}></input>
                        </div>
                        <div>
                            <p className="profile-login-inputs-title">E-mail</p>
                            <input type="text" onChange={e => setRegisterUserState({ ...registerUserState, emailUsuario: e.target.value })} className="profile-login-inputs" placeholder="exemplo@email.com" style={{ marginBottom: '20px' }}></input>
                        </div>
                        <div>
                            <p className="profile-login-inputs-title">Senha</p>
                            <input type="password" onChange={e => setRegisterUserState({ ...registerUserState, password: e.target.value })} className="profile-login-inputs" placeholder="**********"></input>
                        </div>
                    </div>
                    <div className="profile-login-card-buttons" style={{ justifyContent: 'center', marginTop: '40px' }}>
                        <button className="profile-login-buttons" onClick={registerUser}>Cadastrar</button>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div className="login-page">
            <div className="profile-content">
                <div className="profile-login-card">
                    <form onSubmit={handleSubmit}>
                        <div className="profile-login-card-top">
                            <h1>Bem vindo,<br></br> entre com sua conta</h1>
                        </div>
                        <div className="profile-login-card-fields">
                            <div style={{ marginBottom: '20px' }}>
                                <p className="profile-login-inputs-title">E-mail</p>
                                <input type="email" name="email" id="loginEmail" className="profile-login-inputs" placeholder="Digite o e-mail"
                                value={email} onChange={(e) => setEmail(e.target.value)} ></input>
                            </div>
                            <div>
                                <p className="profile-login-inputs-title">Senha</p>
                                <input type="password" name="password" id="loginPassword" className="profile-login-inputs" placeholder="Digite a senha"
                                value={password} onChange={(e) => setPassword(e.target.value)} ></input>
                            </div>
                            
                        </div>
                        <div className="profile-login-card-buttons">
                            <button className="profile-login-buttons" type="submit" onClick={() => handleSubmit}>Entrar</button>
                            <a href="/login?page=cadastro">
                                <button type="button" className="profile-login-buttons" style={{ backgroundColor: 'white', color: '#89259d' }}>Cadastrar</button>
                            </a>
                            
                        </div>
                    </form>
                    
                </div>
                
            </div>
        </div>
    )
}

export default Login