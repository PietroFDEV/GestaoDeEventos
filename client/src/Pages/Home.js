import Header from '../Components/Header.js'

function Home(){
    return(
        <div className='home-page'>
            <Header logged={true}></Header>
            <h1>Home</h1>
        </div>
    )
}

export default Home