import React, { useState, useEffect } from 'react'
import '../Styles/Header.css'

const Header = ({ logged }) => {

    if(!logged){
        return (
            <div className='header'>
                <div className='header-logo'>
                    <img src='Logo_full.png' height='50px'></img>
                </div>
                
                <a href='/eventos'>
                    <div className='h-find-events h-background'>
                        <p>Encontrar Eventos</p>
                    </div>
                </a>

                <a href='/login'>
                    <div className='h-create-events h-background'>
                        <p>Criar Eventos</p>
                    </div>
                </a>

                <a href='/login'>
                    <div className='h-login h-background'>
                        <div className='login-div'>
                            <img src='person-icon.svg' className='fill-white' width='25px'></img>
                            <p style={{ marginLeft: '5px' }}>Entrar</p>
                        </div>
                    </div>
                </a>
            </div>
        )
    }


    return (
        <div className='header'>
            <div className='header-logo'>
                <img src='Logo_full.png' height='50px'></img>
            </div>
            
            <a href='/eventos'>
                <div className='h-find-events h-background'>
                    <p>Encontrar Eventos</p>
                </div>
            </a>

            <a href='#'>
                <div className='h-create-events h-background'>
                    <p>Criar um evento</p>
                </div>
            </a>

            <a href='Tickets'>
                <div className='h-create-events h-background'>
                    <p>Tickets</p>
                </div>
            </a>

            <a href='/meus-eventos'>
                <div className='h-create-events h-background'>
                    <p>Meus Eventos</p>
                </div>
            </a>

            <a href='/perfil'>
                <div className='h-login h-background'>
                    <div className='login-div'>
                        <img src='person-icon.svg' className='fill-white' width='25px'></img>
                        <p style={{ marginLeft: '5px' }}>Lucas Martins</p>
                    </div>
                </div>
            </a>
        </div>
    )
}

export default Header