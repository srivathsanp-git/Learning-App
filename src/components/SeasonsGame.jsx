import { useState, useEffect } from 'react'
import './GameBase.css'

const SEASONS = [
  {
    name: 'Spring',
    emoji: '🌸',
    color: 'linear-gradient(135deg, #FFB7C5, #FF69B4)',
    bg: 'linear-gradient(135deg, #fff0f5, #ffe4e8)',
    icon: '🌸🌺🌷🌼🦋🐝',
    description: 'Flowers bloom and birds sing!',
    character: { emoji: '👸', name: 'Elsa', line: 'The flowers are so beautiful!' },
    months: 'March, April, May',
    facts: ['Flowers bloom in spring! 🌸', 'Baby animals are born! 🐣', 'It gets warmer! ☀️'],
    borderColor: '#FF69B4',
  },
  {
    name: 'Summer',
    emoji: '☀️',
    color: 'linear-gradient(135deg, #FFD700, #FF8C00)',
    bg: 'linear-gradient(135deg, #fffde7, #fff8c0)',
    icon: '☀️🌊🏖️🍦🌻🦀',
    description: 'Hot and sunny days!',
    character: { emoji: '🤠', name: 'Woody', line: "Yeehaw! Let's go to the beach!" },
    months: 'June, July, August',
    facts: ['It is very hot and sunny! ☀️', 'We go swimming! 🏊', 'School is out! 🎉'],
    borderColor: '#FF8C00',
  },
  {
    name: 'Fall',
    emoji: '🍂',
    color: 'linear-gradient(135deg, #FF6B35, #D2691E)',
    bg: 'linear-gradient(135deg, #fff3e0, #ffe0b2)',
    icon: '🍂🍁🎃🌰🦃🍎',
    description: 'Leaves change colors!',
    character: { emoji: '🚀', name: 'Buzz', line: "To infinity and beyond... the pumpkin patch!" },
    months: 'September, October, November',
    facts: ['Leaves turn orange and red! 🍂', 'Halloween and Thanksgiving! 🎃', 'It gets cooler! 🧣'],
    borderColor: '#D2691E',
  },
  {
    name: 'Winter',
    emoji: '❄️',
    color: 'linear-gradient(135deg, #87CEEB, #4169E1)',
    bg: 'linear-gradient(135deg, #e3f2fd, #c8e6ff)',
    icon: '❄️⛄🎿🧊🦌🎁',
    description: 'Cold and snowy!',
    character: { emoji: '👸', name: 'Elsa', line: 'The cold never bothered me anyway! ❄️' },
    months: 'December, January, February',
    facts: ['It is cold and snowy! ❄️', 'We wear coats and scarves! 🧣', 'Christmas and New Year! 🎄'],
    borderColor: '#4169E1',
  },
]

const QUESTIONS = [
  {
    type: 'identify',
    prompt: (s) => `Which season has ${s.emoji}?`,
    answer: (s) => s.name,
    hint: (s) => s.description,
  },
  {
    type: 'character',
    prompt: (s) => `Which season does ${s.character.name} love?`,
    answer: (s) => s.name,
    hint: (s) => s.character.line,
  },
  {
    type: 'month',
    prompt: (s) => `Which season has the months: ${s.months}?`,
    answer: (s) => s.name,
    hint: (s) => s.description,
  },
]

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5)
}

export default function SeasonsGame({ onBack, onCorrect }) {
  const [current, setCurrent] = useState(0)
  const [questions, setQuestions] = useState([])
  const [selected, setSelected] = useState(null)
  const [isWrong, setIsWrong] = useState(false)
  const [score, setScore] = useState(0)
  const [showLearn, setShowLearn] = useState(false)
  const [learnSeason, setLearnSeason] = useState(null)
  const [mode, setMode] = useState('learn') // 'learn' | 'quiz'

  useEffect(() => {
    const qs = shuffle(
      SEASONS.flatMap((s) =>
        QUESTIONS.map((q) => ({
          prompt: q.prompt(s),
          answer: q.answer(s),
          hint: q.hint(s),
          options: shuffle([
            s.name,
            ...shuffle(SEASONS.filter((x) => x.name !== s.name))
              .slice(0, 3)
              .map((x) => x.name),
          ]),
          season: s,
        }))
      )
    ).slice(0, 8)
    setQuestions(qs)
  }, [])

  const handleAnswer = (option) => {
    if (selected) return
    setSelected(option)
    const q = questions[current]
    if (option === q.answer) {
      setScore((s) => s + 1)
      onCorrect(`🌟 "${option}" is correct! You're a SUPERSTAR! 🌟`)
    } else {
      setIsWrong(true)
      setTimeout(() => setIsWrong(false), 600)
    }
  }

  const next = () => {
    setSelected(null)
    setIsWrong(false)
    setCurrent((c) => (c + 1 < questions.length ? c + 1 : 0))
  }

  if (mode === 'learn') {
    return (
      <div className="game-screen" style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }}>
        <div className="game-header">
          <button className="back-btn" onClick={onBack}>⬅ Home</button>
          <h2 className="game-title">🌸❄️ Seasons! ☀️🍂</h2>
          <button className="mode-btn" onClick={() => setMode('quiz')}>Quiz Time! 🎯</button>
        </div>

        <p className="learn-prompt">Tap a season to learn about it! 👆</p>

        <div className="learn-grid">
          {SEASONS.map((s) => (
            <button
              key={s.name}
              className="season-learn-card"
              style={{ background: s.color, borderColor: s.borderColor }}
              onClick={() => { setLearnSeason(s); setShowLearn(true) }}
            >
              <div className="slc-icon">{s.emoji}</div>
              <div className="slc-name">{s.name}</div>
              <div className="slc-icons">{s.icon}</div>
              <div className="slc-character">{s.character.emoji}</div>
            </button>
          ))}
        </div>

        {showLearn && learnSeason && (
          <div className="learn-modal-overlay" onClick={() => setShowLearn(false)}>
            <div
              className="learn-modal"
              style={{ background: learnSeason.bg, borderColor: learnSeason.borderColor }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="lm-header">
                <span className="lm-emoji">{learnSeason.emoji}</span>
                <h3 className="lm-title">{learnSeason.name}</h3>
                <span className="lm-char">{learnSeason.character.emoji}</span>
              </div>
              <div className="lm-icons">{learnSeason.icon}</div>
              <p className="lm-desc">{learnSeason.description}</p>
              <p className="lm-months">📅 {learnSeason.months}</p>
              <div className="lm-facts">
                {learnSeason.facts.map((f, i) => (
                  <div key={i} className="lm-fact">{f}</div>
                ))}
              </div>
              <p className="lm-quote">"{learnSeason.character.line}"</p>
              <p className="lm-char-name">— {learnSeason.character.name}</p>
              <button className="lm-close" onClick={() => setShowLearn(false)}>Got it! 👍</button>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (questions.length === 0) return <div className="game-screen loading">Loading...</div>

  const q = questions[current]
  const correctSeason = SEASONS.find((s) => s.name === q.answer)

  return (
    <div className="game-screen" style={{ background: 'linear-gradient(135deg, #1a1a2e, #16213e)' }}>
      <div className="game-header">
        <button className="back-btn" onClick={onBack}>⬅ Home</button>
        <h2 className="game-title">Seasons Quiz! 🎯</h2>
        <button className="mode-btn" onClick={() => setMode('learn')}>Learn Mode 📚</button>
      </div>

      <div className="score-row">
        <span className="score-badge">⭐ Score: {score}</span>
        <span className="progress-badge">Question {current + 1} of {questions.length}</span>
      </div>

      <div className="question-card" style={{ background: correctSeason?.color || 'linear-gradient(135deg,#667eea,#764ba2)' }}>
        <div className="q-character">{correctSeason?.character.emoji}</div>
        <div className="q-prompt">{q.prompt}</div>
        <div className="q-icon">{correctSeason?.emoji}</div>
        <div className="q-hint">{q.hint}</div>
      </div>

      <div className="options-grid">
        {q.options.map((opt) => {
          const s = SEASONS.find((x) => x.name === opt)
          let cls = 'option-btn'
          if (selected) {
            if (opt === q.answer) cls += ' correct'
            else if (opt === selected) cls += ' wrong'
          }
          if (isWrong && opt === selected) cls += ' shake'
          return (
            <button
              key={opt}
              className={cls}
              style={{ '--opt-color': s?.borderColor }}
              onClick={() => handleAnswer(opt)}
            >
              <span className="opt-emoji">{s?.emoji}</span>
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
