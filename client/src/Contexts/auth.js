import React, { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { api, createSession } from "../api"

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const recoveredUser = localStorage.getItem("user")

        if (recoveredUser) {
            setUser(JSON.parse(recoveredUser))
        }

        setLoading(false)
    }, [])

    const login = async (email, password) => {
        const response = await createSession( email, password )
        
        if(response.status === 204){
            window.alert('E-mail ou senha errados, tente novamente.')
        }

        const resultado = response.status === 200
        const loggedUser = response.data

        if(resultado === true){
            localStorage.setItem("user", JSON.stringify(loggedUser))
            setUser(loggedUser)
        }
        else {
            navigate("/login")
        }
    }

    const logout = () => {
        localStorage.removeItem("user")
        
        setUser(null)
        navigate('/login')
    }

    return (
        <AuthContext.Provider value={{ authenticated: !!user, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}