import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'
import './Celebration.css'

const BALLOONS = ['🎈', '🎉', '🎊', '⭐', '🌟', '💫', '✨', '🎀', '🦋', '🌈']

export default function Celebration({ message }) {
  const fired = useRef(false)

  useEffect(() => {
    if (fired.current) return
    fired.current = true

    const fire = (particleRatio, opts) => {
      confetti({
        origin: { y: 0.6 },
        ...opts,
        particleCount: Math.floor(200 * particleRatio),
      })
    }

    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#FF6B9D', '#FFD700', '#4ECDC4'] })
    fire(0.2, { spread: 60, colors: ['#A855F7', '#FF8E53', '#44A8B3'] })
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#FFD700', '#FF6B9D', '#7C3AED'] })
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
    fire(0.1, { spread: 120, startVelocity: 45 })

    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.65 },
        colors: ['#FF6B9D', '#FFD700', '#4ECDC4', '#A855F7'],
      })
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.65 },
        colors: ['#FF6B9D', '#FFD700', '#4ECDC4', '#A855F7'],
      })
    }, 400)
  }, [])

  const balloons = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    emoji: BALLOONS[i % BALLOONS.length],
    left: Math.random() * 90 + 5,
    delay: Math.random() * 1.5,
    size: 28 + Math.random() * 28,
  }))

  return (
    <div className="celebration-overlay">
      {balloons.map((b) => (
        <div
          key={b.id}
          className="balloon"
          style={{
            left: `${b.left}%`,
            animationDelay: `${b.delay}s`,
            fontSize: `${b.size}px`,
          }}
        >
          {b.emoji}
        </div>
      ))}

      <div className="celebration-box">
        <div className="celebration-stars">⭐⭐⭐</div>
        <div className="celebration-character">🎉</div>
        <div className="celebration-title">AMAZING!</div>
        <div className="celebration-message">{message}</div>
        <div className="celebration-chars">
          <span>👸</span>
          <span>🤠</span>
          <span>🐭</span>
          <span>🚀</span>
        </div>
      </div>
    </div>
  )
}
