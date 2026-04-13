import type { ReactNode } from 'react'

interface PanelProps {
  title: string
  children: ReactNode
  className?: string
  noPadding?: boolean
}

export default function Panel({ title, children, className = '', noPadding = false }: PanelProps) {
  return (
    <div className={`hud-panel ${className}`}>
      <div className="hud-panel-title">{title}</div>
      <div className={noPadding ? 'flex-1 overflow-hidden flex flex-col' : 'hud-panel-content'}>
        {children}
      </div>
    </div>
  )
}

export function CapacityBar({ value, max, label }: { value: number; max: number; label: string }) {
  const pct = max > 0 ? (value / max) * 100 : 0
  const level = pct > 90 ? 'critical' : pct > 70 ? 'warn' : 'ok'
  return (
    <div className="mb-2">
      <div className="flex justify-between text-[13px] mb-1">
        <span style={{ color: 'var(--hud-text-dim)' }}>{label}</span>
        <span>
          <span style={{ color: 'var(--hud-primary)' }}>{value.toLocaleString()}</span>
          <span style={{ color: 'var(--hud-text-dim)' }}>/{max.toLocaleString()} ({pct.toFixed(0)}%)</span>
        </span>
      </div>
      <div className="capacity-bar">
        <div className={`capacity-bar-fill ${level}`} style={{ width: `${Math.min(pct, 100)}%` }} />
      </div>
    </div>
  )
}

export function Sparkline({ values, width = 100, height = 20 }: { values: number[]; width?: number; height?: number }) {
  if (!values.length) return null

  const max = Math.max(...values, 1)
  const min = Math.min(...values, 0)
  const range = Math.max(max - min, 1)
  const paddingX = Math.min(12, width * 0.03)
  const paddingY = Math.min(6, height * 0.12)
  const innerWidth = Math.max(width - paddingX * 2, 1)
  const innerHeight = Math.max(height - paddingY * 2, 1)

  const pointCoords = values.map((v, i) => {
    const x = paddingX + (i / Math.max(values.length - 1, 1)) * innerWidth
    const y = paddingY + (1 - (v - min) / range) * innerHeight
    return { x, y, value: v }
  })

  const points = pointCoords.map(({ x, y }) => `${x},${y}`).join(' ')
  const lastPoint = pointCoords[pointCoords.length - 1]
  const pointRadius = Math.max(1.1, Math.min(1.8, height * 0.035))

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className="block"
    >
      <polyline
        points={points}
        fill="none"
        stroke="var(--hud-primary)"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {lastPoint && (
        <circle
          cx={lastPoint.x}
          cy={lastPoint.y}
          r={pointRadius}
          fill="var(--hud-primary)"
          vectorEffect="non-scaling-stroke"
        />
      )}
    </svg>
  )
}
