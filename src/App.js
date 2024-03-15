import React from 'react'
import NavBar from './Components/NavBar/NavBar'
import {originals,Actions,Horror,Romance,Comedy} from './Urls'
import './App.css'
import Banner from './Components/Banner/Banner'
import RowPost from './Components/RowPost/RowPost'

function App() {
  return (
    <div className='App'>
      <NavBar/>
      <Banner/>
      <RowPost url={originals} title='Netflix Orginals'/>
      <RowPost url={Actions} title='Action' isSmall/>
      <RowPost url={Horror} title='Horror' isSmall/>
      <RowPost url={Romance} title='Romance' isSmall/>
      <RowPost url={Comedy} title='Comedy' isSmall/>
    </div>
  )
}

export default App

