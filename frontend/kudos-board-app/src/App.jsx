import { useState } from 'react'
import './App.css'

import CreateBoard from './CreateModals/CreateBoard'
import BoardBox from './BoardBox/BoardBox'

function App() {

  return (
    <div className='App'>
      <header>Kudos Board</header>
      <div className='banner'>Welcome to the Kudos Board!!!</div>
      <main>
        <BoardBox/>
      </main>
      <footer>By Jack McClure 2025</footer>
    </div>
  )
}

export default App
