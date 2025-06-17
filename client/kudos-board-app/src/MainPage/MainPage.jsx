import './MainPage.css'

import BoardBox from '../BoardBox/BoardBox'

const MainPage = () => {
    return (
        <div className='mainpage'>
            <header>Kudos Board</header>
            <div className='banner'>Welcome to the Kudos Board!!!</div>
            <main>
                <BoardBox/> 
            </main>
        </div>
    )
}

export default MainPage