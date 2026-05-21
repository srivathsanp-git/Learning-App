import { useState, useEffect } from 'react'
import './GameBase.css'

const DAYS = [
  { name: 'Monday',    short: 'Mon', num: 1, emoji: '🌙', color: '#9B59B6', character: '🐭', charName: 'Mickey',  fact: 'Start of the school week! 📚', activity: 'Go to school! 🎒' },
  { name: 'Tuesday',   short: 'Tue', num: 2, emoji: '🔥', color: '#E74C3C', character: '🐭', charName: 'Minnie',  fact: 'Taco Tuesday! 🌮',            activity: 'Play outside! 🌳' },
  { name: 'Wednesday', short: 'Wed', num: 3, emoji: '🌊', color: '#3498DB', character: '🦆', charName: 'Donald',  fact: "Hump day — we're halfway!",  activity: 'Arts and crafts! 🎨' },
  { name: 'Thursday',  short: 'Thu', num: 4, emoji: '⚡', color: '#F39C12', character: '🐶', charName: 'Goofy',   fact: 'Almost Friday! 🎉',            activity: 'Read books! 📖' },
  { name: 'Friday',    short: 'Fri', num: 5, emoji: '🎉', color: '#27AE60', character: '🤠', charName: 'Woody',   fact: 'TGIF — weekend is here!',     activity: 'Game night! 🎲' },
  { name: 'Saturday',  short: 'Sat', num: 6, emoji: '🌟', color: '#FF6B9D', character: '🚀', charName: 'Buzz',    fact: 'Weekend fun day! 🎡',          activity: 'Go to the park! 🛝' },
  { name: 'Sunday',    short: 'Sun', num: 7, emoji: '☀️', color: '#FF8C00', character: '👸', charName: 'Elsa',    fact: 'Relax and rest day! 😴',       activity: 'Family time! 👨‍👩‍👧' },
]

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

function makeQuestions() {
  const qs = []
  DAYS.forEach((d, idx) => {
    qs.push({
      prompt: `Which day is the ${['1st','2nd','3rd','4th','5th','6th','7th'][idx]} day of the week?`,
      answer: d.name,
      options: shuffle([d.name, ...shuffle(DAYS.filter(x=>x.name!==d.name)).slice(0,3).map(x=>x.name)]),
      day: d,
    })
    qs.push({
      prompt: `${d.emoji} ${d.activity} What day is this?`,
      answer: d.name,
      options: shuffle([d.name, ...shuffle(DAYS.filter(x=>x.name!==d.name)).slice(0,3).map(x=>x.name)]),
      day: d,
    })
  })
  return shuffle(qs).slice(0, 10)
}

export default function DaysGame({ onBack, onCorrect }) {
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [isWrong, setIsWrong] = useState(false)
  const [score, setScore] = useState(0)
  const [mode, setMode] = useState('learn')
  const [activeDay, setActiveDay] = useState(null)

  useEffect(() => { setQuestions(makeQuestions()) }, [])

  const handleAnswer = (opt) => {
    if (selected) return
    setSelected(opt)
    if (opt === questions[current].answer) {
      setScore(s => s + 1)
      onCorrect(`🌟 "${opt}" — PERFECT ANSWER! You rock! 🎸`)
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
      <div className="game-screen" style={{ background: 'linear-gradient(135deg, #2d1b69, #11003d)' }}>
        <div className="game-header">
          <button className="back-btn" onClick={onBack}>⬅ Home</button>
          <h2 className="game-title">📆 Days of the Week!</h2>
          <button className="mode-btn" onClick={() => setMode('quiz')}>Quiz Time! 🎯</button>
        </div>

        <p className="learn-prompt">Tap a day to learn about it! 👆</p>

        <div className="days-rail">
          {DAYS.map((d) => (
            <button
              key={d.name}
              className={`day-card ${activeDay?.name === d.name ? 'active' : ''}`}
              style={{ background: `linear-gradient(135deg, ${d.color}, ${d.color}bb)`, borderColor: d.color }}
              onClick={() => setActiveDay(activeDay?.name === d.name ? null : d)}
            >
              <div className="dc-num">{d.num}</div>
              <div className="dc-emoji">{d.emoji}</div>
              <div className="dc-short">{d.short}</div>
              <div className="dc-char">{d.character}</div>
            </button>
          ))}
        </div>

        {activeDay && (
          <div className="day-info-card" style={{ borderColor: activeDay.color, background: `${activeDay.color}22` }}>
            <div className="dic-header">
              <span className="dic-emoji">{activeDay.emoji}</span>
              <div>
                <div className="dic-name" style={{ color: activeDay.color }}>{activeDay.name}</div>
                <div className="dic-num">Day {activeDay.num} of the week</div>
              </div>
              <span className="dic-char">{activeDay.character}</span>
            </div>
            <div className="dic-activity">🎯 {activeDay.activity}</div>
            <div className="dic-fact">💡 {activeDay.fact}</div>
            <div className="dic-charname">{activeDay.charName} says: "Have a great {activeDay.name}!" 😄</div>
          </div>
        )}

        <div className="week-sequence">
          <p className="ws-title">The Week in Order:</p>
          <div className="ws-row">
            {DAYS.map((d, i) => (
              <div key={d.name} className="ws-item" style={{ color: d.color }}>
                <span className="ws-emoji">{d.emoji}</span>
                <span className="ws-name">{d.short}</span>
                {i < 6 && <span className="ws-arrow">→</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (questions.length === 0) return <div className="game-screen loading">Loading...</div>

  const q = questions[current]

  return (
    <div className="game-screen" style={{ background: 'linear-gradient(135deg, #2d1b69, #11003d)' }}>
      <div className="game-header">
        <button className="back-btn" onClick={onBack}>⬅ Home</button>
        <h2 className="game-title">Days Quiz! 🎯</h2>
        <button className="mode-btn" onClick={() => setMode('learn')}>Learn Mode 📚</button>
      </div>

      <div className="score-row">
        <span className="score-badge">⭐ Score: {score}</span>
        <span className="progress-badge">Question {current + 1} of {questions.length}</span>
      </div>

      <div className="question-card" style={{ background: `linear-gradient(135deg, ${q.day.color}, ${q.day.color}99)` }}>
        <div className="q-character">{q.day.character}</div>
        <div className="q-prompt">{q.prompt}</div>
        <div className="q-icon">{q.day.emoji}</div>
        <div className="q-hint">{q.day.activity}</div>
      </div>

      <div className="options-grid">
        {q.options.map((opt) => {
          const d = DAYS.find(x => x.name === opt)
          let cls = 'option-btn'
          if (selected) {
            if (opt === q.answer) cls += ' correct'
            else if (opt === selected) cls += ' wrong'
          }
          if (isWrong && opt === selected) cls += ' shake'
          return (
            <button key={opt} className={cls} style={{ '--opt-color': d?.color }} onClick={() => handleAnswer(opt)}>
              <span className="opt-emoji">{d?.emoji}</span>
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
