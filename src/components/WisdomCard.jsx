import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { wisdomQuotes } from '../data/wisdom'

export default function WisdomCard() {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * wisdomQuotes.length))
  const [visible, setVisible] = useState(true)

  const rotate = () => {
    setVisible(false)
    setTimeout(() => {
      setIndex((i) => (i + 1) % wisdomQuotes.length)
      setVisible(true)
    }, 300)
  }

  const quote = wisdomQuotes[index]

  return (
    <div className="wisdom-card">
      <div className="wisdom-card-label">
        <span className="wisdom-card-icon">🔮</span>
        Wisdom
      </div>
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            <blockquote className="wisdom-quote">"{quote.text}"</blockquote>
            <cite className="wisdom-author">— {quote.author}</cite>
          </motion.div>
        )}
      </AnimatePresence>
      <button className="wisdom-rotate" onClick={rotate} title="Next quote">
        ↻
      </button>
    </div>
  )
}
