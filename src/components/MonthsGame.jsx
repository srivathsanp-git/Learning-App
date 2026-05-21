import { useState, useEffect } from 'react'
import './GameBase.css'

const MONTHS = [
  { name: 'January',   num: 1,  emoji: '⛄', season: 'Winter',  color: '#87CEEB', bg: '#e3f2fd', character: '👸', charName: 'Elsa',   fact: 'New Year starts! 🎉' },
  { name: 'February',  num: 2,  emoji: '💝', season: 'Winter',  color: '#FF69B4', bg: '#fce4ec', character: '👸', charName: 'Anna',   fact: "Valentine's Day! 💕" },
  { name: 'March',     num: 3,  emoji: '🌸', season: 'Spring',  color: '#98FB98', bg: '#f1f8e9', character: '🦋', charName: 'Tinker', fact: 'Spring begins! 🌷' },
  { name: 'April',     num: 4,  emoji: '🌧️', season: 'Spring',  color: '#7BC8F6', bg: '#e1f5fe', character: '🐭', charName: 'Mickey', fact: 'April showers! 🌈' },
  { name: 'May',       num: 5,  emoji: '🌺', season: 'Spring',  color: '#DDA0DD', bg: '#f3e5f5', character: '🌸', charName: 'Belle',  fact: 'Flowers are everywhere! 🌻' },
  { name: 'June',      num: 6,  emoji: '☀️', season: 'Summer',  color: '#FFD700', bg: '#fffde7', character: '🤠', charName: 'Woody',  fact: 'Summer starts! 🏖️' },
  { name: 'July',      num: 7,  emoji: '🎆', season: 'Summer',  color: '#FF4500', bg: '#fbe9e7', character: '🚀', charName: 'Buzz',   fact: 'Fireworks! 🎇' },
  { name: 'August',    num: 8,  emoji: '🌻', season: 'Summer',  color: '#FFA500', bg: '#fff8e1', character: '🦆', charName: 'Donald', fact: 'Hottest month! 🌡️' },
  { name: 'September', num: 9,  emoji: '🍎', season: 'Fall',    color: '#CD853F', bg: '#fbe3c6', character: '🐕', charName: 'Pluto',  fact: 'Back to school! 🎒' },
  { name: 'October',   num: 10, emoji: '🎃', season: 'Fall',    color: '#FF6B35', bg: '#fff3e0', character: '🐶', charName: 'Goofy',  fact: 'Halloween! 👻' },
  { name: 'November',  num: 11, emoji: '🦃', season: 'Fall',    color: '#A0522D', bg: '#efebe9', character: '🤠', charName: 'Woody',  fact: 'Thanksgiving! 🍽️' },
  { name: 'December',  num: 12, emoji: '🎄', season: 'Winter',  color: '#006400', bg: '#e8f5e9', character: '👸', charName: 'Elsa',   fact: 'Christmas! 🎁' },
]

const ORDINALS = ['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th']

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

function makeQuestions() {
  const qs = []
  MONTHS.forEach((m, idx) => {
    qs.push({
      prompt: `Which month comes ${ORDINALS[idx]} in the year?`,
      answer: m.name,
      options: shuffle([m.name, ...shuffle(MONTHS.filter(x=>x.name!==m.name)).slice(0,3).map(x=>x.name)]),
      month: m,
    })
    qs.push({
      prompt: `${m.emoji} Which month has ${m.fact.split('!')[0]}?`,
      answer: m.name,
      options: shuffle([m.name, ...shuffle(MONTHS.filter(x=>x.name!==m.name)).slice(0,3).map(x=>x.name)]),
      month: m,
    })
  })
  return shuffle(qs).slice(0, 10)
}

export default function MonthsGame({ onBack, onCorrect }) {
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [isWrong, setIsWrong] = useState(false)
  const [score, setScore] = useState(0)
  const [mode, setMode] = useState('learn')
  const [activeMonth, setActiveMonth] = useState(null)

  useEffect(() => { setQuestions(makeQuestions()) }, [])

  const handleAnswer = (opt) => {
    if (selected) return
    setSelected(opt)
    if (opt === questions[current].answer) {
      setScore(s => s + 1)
      onCorrect(`🎉 "${opt}" is RIGHT! You're SO SMART! 🌟`)
    } else {
      setIsWrong(true)
      setTimeout(() => setIsWrong(false), 600)
    }
  }

  const next = () => {
    setSelected(null)
    setIsWrong(false)
    if (current + 1 < questions.length) setCurrent(c => c + 1)
    else { setQuestions(makeQuestions()); setCurrent(0) }
  }

  if (mode === 'learn') {
    return (
      <div className="game-screen" style={{ background: 'linear-gradient(135deg, #1a1a2e, #0f3460)' }}>
        <div className="game-header">
          <button className="back-btn" onClick={onBack}>⬅ Home</button>
          <h2 className="game-title">📅 Months of the Year!</h2>
          <button className="mode-btn" onClick={() => setMode('quiz')}>Quiz Time! 🎯</button>
        </div>

        <p className="learn-prompt">Tap a month to learn about it! 👆</p>

        <div className="months-grid">
          {MONTHS.map((m) => (
            <button
              key={m.name}
              className={`month-card ${activeMonth?.name === m.name ? 'active' : ''}`}
              style={{ background: `linear-gradient(135deg, ${m.color}, ${m.color}cc)`, borderColor: m.color }}
              onClick={() => setActiveMonth(activeMonth?.name === m.name ? null : m)}
            >
              <div className="mc-num">{m.num}</div>
              <div className="mc-emoji">{m.emoji}</div>
              <div className="mc-name">{m.name}</div>
              <div className="mc-char">{m.character}</div>
            </button>
          ))}
        </div>

        {activeMonth && (
          <div className="month-info-card" style={{ background: activeMonth.bg, borderColor: activeMonth.color }}>
            <div className="mic-row">
              <span className="mic-emoji">{activeMonth.emoji}</span>
              <div>
                <div className="mic-name">{activeMonth.name}</div>
                <div className="mic-num">Month #{activeMonth.num}</div>
              </div>
              <span className="mic-char">{activeMonth.character}</span>
            </div>
            <div className="mic-season">🍃 Season: {activeMonth.season}</div>
            <div className="mic-fact">✨ {activeMonth.fact}</div>
            <div className="mic-charname">— {activeMonth.charName} says hi! 👋</div>
          </div>
        )}
      </div>
    )
  }

  if (questions.length === 0) return <div className="game-screen loading">Loading...</div>

  const q = questions[current]

  return (
    <div className="game-screen" style={{ background: 'linear-gradient(135deg, #1a1a2e, #0f3460)' }}>
      <div className="game-header">
        <button className="back-btn" onClick={onBack}>⬅ Home</button>
        <h2 className="game-title">Months Quiz! 🎯</h2>
        <button className="mode-btn" onClick={() => setMode('learn')}>Learn Mode 📚</button>
      </div>

      <div className="score-row">
        <span className="score-badge">⭐ Score: {score}</span>
        <span className="progress-badge">Question {current + 1} of {questions.length}</span>
      </div>

      <div className="question-card" style={{ background: `linear-gradient(135deg, ${q.month.color}, ${q.month.color}99)` }}>
        <div className="q-character">{q.month.character}</div>
        <div className="q-prompt">{q.prompt}</div>
        <div className="q-icon">{q.month.emoji}</div>
        <div className="q-hint">{q.month.fact}</div>
      </div>

      <div className="options-grid">
        {q.options.map((opt) => {
          const m = MONTHS.find(x => x.name === opt)
          let cls = 'option-btn'
          if (selected) {
            if (opt === q.answer) cls += ' correct'
            else if (opt === selected) cls += ' wrong'
          }
          if (isWrong && opt === selected) cls += ' shake'
          return (
            <button key={opt} className={cls} style={{ '--opt-color': m?.color }} onClick={() => handleAnswer(opt)}>
              <span className="opt-emoji">{m?.emoji}</span>
              <span className="opt-label">{opt}</span>
            </button>
          )
        })}
      </div>

      {selected && (
        <button className="next-btn" onClick={next}>
          {current + 1 < questions.length ? 'Next Question ➡' : 'Play Again! 🔄'}
        </button>
      )}
    </div>
  )
}
