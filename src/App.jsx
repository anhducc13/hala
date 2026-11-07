import { useEffect, useRef } from 'react'
import './App.css'

const EMOJIS = ['😘', '💋', '😘', '💋', '😍', '💕', '😘']

function createParticle(container) {
  const el = document.createElement('span')
  el.className = 'particle'
  el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)]

  const size = Math.random() * 28 + 18 // 18–46px
  const left = Math.random() * 100       // 0–100vw
  const duration = Math.random() * 6 + 6 // 6–12s
  const delay = Math.random() * 4        // 0–4s
  const drift = (Math.random() - 0.5) * 120 // sway ngang

  el.style.cssText = `
    left: ${left}vw;
    font-size: ${size}px;
    animation-duration: ${duration}s;
    animation-delay: ${delay}s;
    --drift: ${drift}px;
    opacity: 0;
  `

  container.appendChild(el)

  // Xóa sau khi animation xong
  el.addEventListener('animationend', () => el.remove())
}

export default function App() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Spawn liên tục
    const interval = setInterval(() => {
      createParticle(container)
    }, 350)

    // Spawn ngay lúc đầu
    for (let i = 0; i < 14; i++) {
      setTimeout(() => createParticle(container), i * 100)
    }

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="home">
      <div className="particles" ref={containerRef} />

      <div className="hero">
        <div className="badge">✨ Welcome</div>
        <h1 className="title">
          Hala <span className="accent">😘</span>
        </h1>
        <p className="subtitle">
          Nơi những nụ hôn nổi lên mãi mãi
        </p>
        <button className="cta">Bắt đầu ngay</button>
      </div>
    </div>
  )
}
