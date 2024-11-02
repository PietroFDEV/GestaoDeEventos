import { useState, useEffect, React } from "react"
import Header from '../Components/Header.js'
import Footer from '../Components/Footer.js'
import '../Styles/Home.css'
import { api } from '../api.js'

function Home(){

    useEffect(() => {
        // api.get('/api/usuario/id/1')
        // .then(response => {
        //     console.log(response.data)
        // })
        // .catch(error => {
        //     console.error('Error fetching user data:', error)
        // })
    }, [])


    return(
        <div className='home-page'>
            <Header logged={false}></Header>
            <div className='home-banner'>
                <img src='banner.png' width='100%'></img>
            </div>
            <div className='home-categories'>
                <h2>Encontre eventos sla sla sla</h2>
                <div className='categories-list'>
                    <a href='#'>
                        <div className='category'>
                            <div className='category-circle'>
                                <img src='party-icon.svg' width='50px' className='category-svg'></img>
                            </div>
                            <div className='category-title'>
                                <p>Categoria 1</p>
                            </div>
                        </div>
                    </a>
                    <a href='#'>
                        <div className='category'>
                            <div className='category-circle'>
                                <img src='party-icon.svg' width='50px' className='category-svg'></img>
                            </div>
                            <div className='category-title'>
                                <p>Categoria 1</p>
                            </div>
                        </div>
                    </a>
                    <a href='#'>
                        <div className='category'>
                            <div className='category-circle'>
                                <img src='party-icon.svg' width='50px' className='category-svg'></img>
                            </div>
                            <div className='category-title'>
                                <p>Categoria 1</p>
                            </div>
                        </div>
                    </a>
                    <a href='#'>
                        <div className='category'>
                            <div className='category-circle'>
                                <img src='party-icon.svg' width='50px' className='category-svg'></img>
                            </div>
                            <div className='category-title'>
                                <p>Categoria 1</p>
                            </div>
                        </div>
                    </a>
                    <a href='#'>
                        <div className='category'>
                            <div className='category-circle'>
                                <img src='party-icon.svg' width='50px' className='category-svg'></img>
                            </div>
                            <div className='category-title'>
                                <p>Categoria 1</p>
                            </div>
                        </div>
                    </a>
                    <a href='#'>
                        <div className='category'>
                            <div className='category-circle'>
                                <img src='party-icon.svg' width='50px' className='category-svg'></img>
                            </div>
                            <div className='category-title'>
                                <p>Categoria 1</p>
                            </div>
                        </div>
                    </a>
                    <a href='#'>
                        <div className='category'>
                            <div className='category-circle'>
                                <img src='party-icon.svg' width='50px' className='category-svg'></img>
                            </div>
                            <div className='category-title'>
                                <p>Categoria 1</p>
                            </div>
                        </div>
                    </a>
                    <a href='#'>
                        <div className='category'>
                            <div className='category-circle'>
                                <img src='party-icon.svg' width='50px' className='category-svg'></img>
                            </div>
                            <div className='category-title'>
                                <p>Categoria 1</p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
            <div className='next-events'>
                <h2>Próximos grandes eventos</h2>
                <div className='events-home-grid'>
                    <div className='home-event'>

                    </div>
                    <div className='home-event'>
                        
                    </div>
                    <div className='home-event'>
                        
                    </div>
                    <div className='home-event'>
                        
                    </div>
                    <div className='home-event'>
                        
                    </div>
                    <div className='home-event'>
                        
                    </div>
                    <div className='home-event'>
                        
                    </div>
                    <div className='home-event'>
                        
                    </div>
                </div>
            </div>
            <div className='click-here-div'>
                <h2>Deseja anunciar ou criar seu evento?</h2>
                <button className='click-here-button'>Clique aqui</button>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default Home