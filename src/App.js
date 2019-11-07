import React from 'react'
import './assets/style.scss'
import CardForm from './components/CardForm'
import Card from './components/Card'

function App() {
  return (
    <div className='wrapper'>
      <Card />
      <CardForm />
    </div>
  )
}

export default App
