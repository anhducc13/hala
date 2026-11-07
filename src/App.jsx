import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

const KISSES = ['😘', '💋', '😘', '💕', '😚', '💋']
const MAX_PARTICLES = 28

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

function spawn(container, { burst = false, x } = {}) {
  if (container.childElementCount >= MAX_PARTICLES) return

  const el = document.createElement('span')
  el.className = burst ? 'kiss kiss--burst' : 'kiss'
  el.textContent = KISSES[Math.floor(Math.random() * KISSES.length)]
  el.setAttribute('aria-hidden', 'true')

  const size = burst ? 28 + Math.random() * 20 : 18 + Math.random() * 22
  const duration = burst ? 2.6 + Math.random() * 1.6 : 9 + Math.random() * 7
  const left = x ?? Math.random() * 100

  el.style.setProperty('--x', `${left}%`)
  el.style.setProperty('--size', `${size}px`)
  el.style.setProperty('--dur', `${duration}s`)
  el.style.setProperty('--sway', `${(Math.random() - 0.5) * 90}px`)
  el.style.setProperty('--tilt', `${(Math.random() - 0.5) * 36}deg`)

  container.appendChild(el)
  el.addEventListener('animationend', () => el.remove(), { once: true })
}

export default function App() {
  const sky = useRef(null)
  const [sent, setSent] = useState(0)

  useEffect(() => {
    const container = sky.current
    if (!container || prefersReducedMotion()) return

    for (let i = 0; i < 6; i++) setTimeout(() => spawn(container), i * 500)

    const timer = setInterval(() => {
      if (!document.hidden) spawn(container)
    }, 1100)
    return () => clearInterval(timer)
  }, [])

  const sendKiss = useCallback(() => {
    setSent((n) => n + 1)
    const container = sky.current
    if (!container || prefersReducedMotion()) return
    for (let i = 0; i < 5; i++) {
      setTimeout(() => spawn(container, { burst: true, x: 30 + Math.random() * 40 }), i * 90)
    }
  }, [])

  return (
    <main className="page">
      <div className="sky" ref={sky} aria-hidden="true" />

      <article className="note">
        <span className="tape" aria-hidden="true" />
        <p className="note__to">Gửi Hala,</p>
        <h1 className="note__title">
          có một người đang nhớ Hala
          <span className="note__heart" aria-hidden="true"> ♥</span>
        </h1>
        <p className="note__body">
          Không có gì to tát đâu. Chỉ là một góc nhỏ để nói rằng
          hôm nay, và những ngày sau nữa, Hala vẫn luôn được thương.
        </p>

        <button type="button" className="kiss-btn" onClick={sendKiss}>
          Gửi một nụ hôn <span aria-hidden="true">💋</span>
        </button>

        <p className="note__count" aria-live="polite">
          {sent === 0 ? 'Bấm thử xem…' : `Đã gửi ${sent} nụ hôn`}
        </p>
      </article>
    </main>
  )
}
