import { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

import MainPage from './MainPage/MainPage'
import BoardPage from './BoardPage/BoardPage'
import NoMatch from './NoMatch/NoMatch'


import './App.css'
import ThemeSwitch from './ToggleSwitch/ToggleSwitch'

function App() {

  return (
    <div className='App'>
      <ThemeSwitch></ThemeSwitch>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage/>} />
          <Route path='/boards/:boardID' element={<BoardPage/>} />
          <Route path='*' element={<NoMatch/>} />
        </Routes>
      </BrowserRouter>
      <footer>By Jack McClure 2025</footer>
    </div>
  )
}

export default App