import { useState, useEffect, useContext } from "react"
import Header from "../Components/Header";
import { AuthContext } from "../Contexts/auth"
import '../Styles/profile.css'

function Profile(){
    const [user, setUser] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [initials, setInitials] = useState()

    const { logout } = useContext(AuthContext)

    useEffect(() => {
        loadUser()
    }, [])

    async function loadUser() {
        let user = await JSON.parse(localStorage.getItem('user'))
        setUser(user)
        const names = user.nome.split(' ')
        setInitials(names[0].charAt(0) + names[names.length - 1].charAt(0))
        setLoading(false)
    }

    const handleLogout = () => {
        logout()
    }

    function setChangePass(){

    }

    function setConfirmPass(){

    }

    function saveAccount(){

    }

    if (!loading) return(
        <div>
            <Header />
            <div className="page">
                <div className="account-container">
                    <div className="account-divs" id="account-initials" style={{ marginBottom: '10px' }}>
                        {initials}
                    </div>
                    <div className="account-name account-divs">
                        <p className="account-divs-1">Nome:</p>
                        <div className="account-divs-2">
                            <input type="text" className="account-inputs" defaultValue={user.nome} readOnly
                                //onChange={(e) => setUser({...userInfo, userName: e.target.value})} 
                            />
                        </div>
                    </div>
                    <div className="account-email account-divs">
                        <p className="account-divs-1">E-mail:</p>
                        <div className="account-divs-2">
                            <input style={{ color: '#a3a3a3' }} type="text" className="account-inputs" value={user.email} readOnly/>
                        </div>
                    </div>
                    <div className="account-password account-divs">
                        <p className="account-divs-1">Alterar senha:</p>
                        <div className="account-divs-2">
                            <input onChange={(e) => setChangePass(e.target.value)} type="password" className="account-inputs" placeholder="Nova senha"/>
                        </div>
                    </div>
                    <div className="account-confirm-password account-divs">
                        <p className="account-divs-1">Confirmar senha:</p>
                        <div className="account-divs-2">
                            <input onChange={(e) => setConfirmPass(e.target.value)} type="password" className="account-inputs" placeholder="Confirmar senha"/>
                        </div>
                    </div>
                    <div className="save-button-div account-divs">
                        <button className="save-contract-button" type="submit" style={{ fontSize: '20px' }} onClick={() => saveAccount()}>Salvar</button>
                        <button className="save-contract-button" type="submit" onClick={() => handleLogout()}
                          style={{ marginTop: '20px', backgroundColor: '#f20202', fontSize: '20px' }}>Sair</button>
                    </div>
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

export default Profile