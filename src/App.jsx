import { useState } from 'react'
import HomeScreen from './components/HomeScreen'
import SeasonsGame from './components/SeasonsGame'
import MonthsGame from './components/MonthsGame'
import DaysGame from './components/DaysGame'
import Celebration from './components/Celebration'
import './App.css'

export default function App() {
  const [screen, setScreen] = useState('home')
  const [celebrating, setCelebrating] = useState(false)
  const [celebrationMsg, setCelebrationMsg] = useState('')

  const celebrate = (msg) => {
    setCelebrationMsg(msg)
    setCelebrating(true)
    setTimeout(() => setCelebrating(false), 3500)
  }

  return (
    <div className="app-wrapper">
      {celebrating && <Celebration message={celebrationMsg} />}

      {screen === 'home' && <HomeScreen onSelect={setScreen} />}
      {screen === 'seasons' && (
        <SeasonsGame onBack={() => setScreen('home')} onCorrect={celebrate} />
      )}
      {screen === 'months' && (
        <MonthsGame onBack={() => setScreen('home')} onCorrect={celebrate} />
      )}
      {screen === 'days' && (
        <DaysGame onBack={() => setScreen('home')} onCorrect={celebrate} />
      )}
    </div>
  )
}
