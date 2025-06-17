import { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

import MainPage from './MainPage/MainPage'
import BoardPage from './BoardPage/BoardPage'


import './App.css'

function App() {

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage/>} />
          <Route path='/boards/:boardID' element={<BoardPage/>} />
        </Routes>
      </BrowserRouter>
      <footer>By Jack McClure 2025</footer>
    </div>
  )
}

export default App