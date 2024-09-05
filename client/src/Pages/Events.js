import Header from '../Components/Header.js'
import Footer from '../Components/Footer.js'
import '../Styles/Events.css'

function Events(){
    return(
        <div className="events-page">
            <Header logged={false}></Header>
            <div className="filter-div">
                <div className="filter-div-category">
                    <p>Categoria</p>
                    <div className='category-options'>
                        <p>teste</p>
                    </div>
                </div>
                <div className="filter-div-category">
                    <p>Categoria</p>
                    <div className='category-options'>
                        <p>teste</p>
                    </div>
                </div>
                <div className="filter-div-category">
                    <p>Categoria</p>
                    <div className='category-options'>
                        <p>teste</p>
                    </div>
                </div>
                <div className="filter-div-category">
                    <p>Categoria</p>
                    <div className='category-options'>
                        <p>teste</p>
                    </div>
                </div>
                <div className="filter-div-category">
                    <p>Categoria</p>
                    <div className='category-options'>
                        <p>teste</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Events