import { useState, useEffect } from 'react'
import './HomeScreen.css'

const floatingEmojis = ['⭐', '🌟', '✨', '🎈', '🎉', '🌈', '💫', '🦋', '🌺', '🎀']

export default function HomeScreen({ onSelect }) {
  const [floaters, setFloaters] = useState([])

  useEffect(() => {
    const items = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      emoji: floatingEmojis[i % floatingEmojis.length],
      left: Math.random() * 90 + 5,
      delay: Math.random() * 4,
      duration: 4 + Math.random() * 4,
      size: 20 + Math.random() * 30,
    }))
    setFloaters(items)
  }, [])

  const menuItems = [
    {
      id: 'seasons',
      label: 'Seasons',
      emoji: '🌸❄️🍂☀️',
      color: '#FF6B9D',
      bg: 'linear-gradient(135deg, #FF6B9D, #FF8E53)',
      shadow: 'rgba(255,107,157,0.5)',
      character: '👸',
      characterName: 'Elsa',
      description: 'Spring, Summer, Fall & Winter!',
    },
    {
      id: 'months',
      label: 'Months',
      emoji: '📅',
      color: '#4ECDC4',
      bg: 'linear-gradient(135deg, #4ECDC4, #44A8B3)',
      shadow: 'rgba(78,205,196,0.5)',
      character: '🤠',
      characterName: 'Woody',
      description: 'All 12 months of the year!',
    },
    {
      id: 'days',
      label: 'Days of the Week',
      emoji: '📆',
      color: '#A855F7',
      bg: 'linear-gradient(135deg, #A855F7, #7C3AED)',
      shadow: 'rgba(168,85,247,0.5)',
      character: '🐭',
      characterName: 'Mickey',
      description: 'Monday through Sunday!',
    },
  ]

  return (
    <div className="home-screen">
      {floaters.map((f) => (
        <div
          key={f.id}
          className="floater"
          style={{
            left: `${f.left}%`,
            animationDelay: `${f.delay}s`,
            animationDuration: `${f.duration}s`,
            fontSize: `${f.size}px`,
          }}
        >
          {f.emoji}
        </div>
      ))}

      <div className="home-content">
        <div className="home-header">
          <div className="title-row">
            <span className="star-icon">⭐</span>
            <h1 className="home-title">Disney Learning Adventure!</h1>
            <span className="star-icon">⭐</span>
          </div>
          <p className="home-subtitle">What do you want to learn today? 🎉</p>
          <div className="character-parade">
            <span title="Elsa">👸</span>
            <span title="Woody">🤠</span>
            <span title="Mickey">🐭</span>
            <span title="Minnie">🐭</span>
            <span title="Buzz">🚀</span>
            <span title="Donald">🦆</span>
            <span title="Goofy">🐶</span>
            <span title="Pluto">🐕</span>
          </div>
        </div>

        <div className="menu-grid">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className="menu-card"
              style={{ '--card-shadow': item.shadow, background: item.bg }}
              onClick={() => onSelect(item.id)}
            >
              <div className="card-character">{item.character}</div>
              <div className="card-emoji">{item.emoji}</div>
              <div className="card-label">{item.label}</div>
              <div className="card-desc">{item.description}</div>
              <div className="card-character-name">with {item.characterName}!</div>
            </button>
          ))}
        </div>

        <div className="home-footer">
          <p>🌟 Tap a picture to start playing! 🌟</p>
        </div>
      </div>
    </div>
  )
}
