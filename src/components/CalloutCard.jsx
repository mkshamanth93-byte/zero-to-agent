import { motion } from 'framer-motion'

const config = {
  welcome: { icon: '🚀', label: null, className: 'callout--welcome' },
  aha: { icon: '⚡', label: 'Aha Moment', className: 'callout--aha' },
  tip: { icon: '💡', label: 'Power Tip', className: 'callout--tip' },
  wisdom: { icon: '🔮', label: 'Words of Wisdom', className: 'callout--wisdom' },
  warning: { icon: '⚠️', label: 'Watch Out', className: 'callout--warning' },
}

export default function CalloutCard({ section }) {
  const { icon, label, className } = config[section.variant] || config.tip

  return (
    <motion.div
      className={`callout ${className}`}
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className="callout-header">
        <span className="callout-icon">{icon}</span>
        <span className="callout-label">{section.title || label}</span>
      </div>
      <p className="callout-text">{section.text}</p>
    </motion.div>
  )
}
