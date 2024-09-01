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

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/evento' element={<Event />} />
        <Route path='/eventos' element={<Events />} />
        <Route path='/login' element={<Login />} />
        <Route path='/meu-evento' element={<MyEvent />} />
        <Route path='/meus-eventos' element={<MyEvents />} />
        <Route path='/perfil' element={<Profile />} />
        <Route path='/tickets' element={<Tickets />} />
      </Routes>
    </Router>
  )
}

export default App;
