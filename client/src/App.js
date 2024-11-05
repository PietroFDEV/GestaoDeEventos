import './App.css';
import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import Event from './Pages/Event'
import Events from './Pages/Events'
import Home from './Pages/Home'
import Login from './Pages/Login'
import MyEvent from './Pages/MyEvent'
import MyEvents from './Pages/MyEvents';
import Profile from './Pages/Profile'
import Tickets from './Pages/Tickets'
import CreateEvent from './Pages/CreateEvent';

import { AuthProvider, AuthContext } from './Contexts/auth'

function App() {

  const Private = ({children}) => {
    const { authenticated, loading } = useContext(AuthContext)

    if (loading) {
      return <div className='loading'>Carregando...</div>
    }

    if (!authenticated){
      return <Navigate to="/login" />
    }

    return children;
  }

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='/home' element={<Home />} />
          <Route path='/evento' element={<Event />} />
          <Route path='/eventos' element={<Events />} />
          <Route path='/login' element={<Login />} />
          <Route path='/meu-evento' element={<Private> <MyEvent /> </Private>} />
          <Route path='/meus-eventos' element={<Private> <MyEvents /> </Private>} />
          <Route path='/perfil' element={<Private> <Profile /> </Private>} />
          <Route path='/tickets' element={<Private> <Tickets /> </Private>} />
          <Route path='/criar-evento' element={<Private> <CreateEvent /> </Private>} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App;
