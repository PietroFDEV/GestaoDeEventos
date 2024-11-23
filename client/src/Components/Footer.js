import React, { useState, useEffect } from 'react'
import '../Styles/Footer.css'

const Footer = ({}) => {
    return (
        <footer>
            <div className='footer-content'>
                <div className='footer-section-1'>
                    <div className='footer-section-1-left'>
                        <div className='footer-logo'>
                            <img src='Logo_full.png' className='footer-img' width='150px'></img>
                        </div>
                        <div className='footer-logo-description'>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>
                        </div>
                    </div>
                    <div className='footer-section-1-right'>
                        <div className='footer-grid'>
                            <div className='pages-list'>
                                <h3 className='footer-items-title'>Páginas</h3>
                                <a className='footer-items footer-links' href='/'>Home</a>
                                <a className='footer-items footer-links' href='/eventos'>Eventos</a>
                                <a className='footer-items footer-links' href='/tickets'>Tickets</a>
                            </div>
                            <div className='about-list'>
                                <h3 className='footer-items-title'>Sobre</h3>
                                <a className='footer-items footer-links' href='/suporte'>Suporte</a>
                                <a className='footer-items footer-links' href='/termos-e-condicoes'>Termos e Condições</a>
                                <a className='footer-items footer-links' href='/politica-de-privacidade'>Política de Privacidade</a>
                            </div>
                            <div className='info-list'>
                                <h3 className='footer-items-title'>Informações</h3>
                                <a className='footer-items'>Curitiba-PR</a>
                                <a className='footer-items'>contato@goeventos.com.br</a>
                                <a className='footer-items'>CNPJ 00.000.000/0001-00</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='footer-section-2'>
                    <div className='company-rights'>
                        <span className='company'>©2024 GO Eventos. Todos os direitos reservados</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer