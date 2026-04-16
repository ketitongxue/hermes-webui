import { useState, useEffect } from 'react'
import { useTheme, THEMES } from '../hooks/useTheme'
import { useI18n } from '../i18n'

export const TABS = [
  { id: 'dashboard', labelKey: 'tab.dashboard', key: '1' },
  { id: 'memory', labelKey: 'tab.memory', key: '2' },
  { id: 'skills', labelKey: 'tab.skills', key: '3' },
  { id: 'sessions', labelKey: 'tab.sessions', key: '4' },
  { id: 'cron', labelKey: 'tab.cron', key: '5' },
  { id: 'projects', labelKey: 'tab.projects', key: '6' },
  { id: 'health', labelKey: 'tab.health', key: '7' },
  { id: 'agents', labelKey: 'tab.agents', key: '8' },
  { id: 'chat', labelKey: 'tab.chat', key: '9' },
  { id: 'profiles', labelKey: 'tab.profiles', key: '0' },
  { id: 'token-costs', labelKey: 'tab.token-costs', key: null },
  { id: 'corrections', labelKey: 'tab.corrections', key: null },
  { id: 'patterns', labelKey: 'tab.patterns', key: null },
  { id: 'sudo', labelKey: 'tab.sudo', key: null },
] as const

export type TabId = typeof TABS[number]['id']

interface TopBarProps {
  activeTab: TabId
  onTabChange: (tab: TabId) => void
}

export default function TopBar({ activeTab, onTabChange }: TopBarProps) {
  const { theme, setTheme, scanlines, setScanlines } = useTheme()
  const { t, lang, setLang } = useI18n()
  const [showThemePicker, setShowThemePicker] = useState(false)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return
      if (e.metaKey || e.ctrlKey || e.altKey) return

      // 1-9 for tabs (only tabs with numeric keys)
      const num = parseInt(e.key)
      if (!isNaN(num) && num >= 1 && num <= 9) {
        const tab = TABS.find(t => t.key === String(num))
        if (tab) {
          onTabChange(tab.id)
          return
        }
      }
      // 0 for Profiles (10th tab with key '0')
      if (e.key === '0') {
        onTabChange('profiles')
        return
      }
      // T to toggle theme picker
      if (e.key === 't') {
        setShowThemePicker(p => !p)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onTabChange])

  return (
    <div
      className="flex items-center gap-3 px-4 py-2 border-b backdrop-blur-md"
      style={{
        borderColor: 'var(--hud-border)',
        background: 'var(--hud-topbar-bg)',
        boxShadow: 'var(--hud-topbar-shadow)',
      }}
    >
      <button
        type="button"
        className="flex items-center gap-2.5 shrink-0 cursor-pointer"
        onClick={() => onTabChange('dashboard')}
        title="Hermes HUD"
      >
        <span
          className="flex h-7 w-7 items-center justify-center rounded-lg text-sm font-bold"
          style={{
            background: 'var(--hud-primary)',
            color: 'var(--hud-primary-contrast)',
            boxShadow: '0 10px 24px -14px var(--hud-primary-glow)',
          }}
        >
          H
        </span>
        <span className="text-sm font-semibold tracking-tight" style={{ color: 'var(--hud-text)' }}>
          Hermes HUD
        </span>
      </button>

      <div className="flex gap-1 flex-1 overflow-x-auto" style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-150 shrink-0 cursor-pointer"
            style={{
              color: activeTab === tab.id ? 'var(--hud-text)' : 'var(--hud-text-dim)',
              background: activeTab === tab.id ? 'var(--hud-bg-hover)' : 'transparent',
              border: `1px solid ${activeTab === tab.id ? 'var(--hud-border-bright)' : 'transparent'}`,
              minHeight: '34px',
            }}
          >
            {tab.key && <span className="opacity-45 mr-1.5">{tab.key}</span>}
            {t(tab.labelKey)}
          </button>
        ))}
      </div>

      <div className="relative shrink-0">
        <button
          onClick={() => setShowThemePicker(p => !p)}
          className="px-3 py-1.5 text-sm font-medium rounded-lg cursor-pointer border"
          style={{
            color: 'var(--hud-text-dim)',
            minHeight: '34px',
            borderColor: 'var(--hud-border)',
            background: 'var(--hud-bg-panel)',
          }}
          title="Theme (t)"
        >
          {THEMES.find(themeItem => themeItem.id === theme)?.icon ?? '◐'}
        </button>
        {showThemePicker && (
          <div
            className="absolute right-0 top-full mt-2 z-50 py-1 min-w-[200px] rounded-xl"
            style={{
              background: 'var(--hud-bg-panel)',
              border: '1px solid var(--hud-border)',
              boxShadow: 'var(--hud-popover-shadow)',
            }}
          >
            {THEMES.map(themeItem => (
              <button
                key={themeItem.id}
                onClick={() => { setTheme(themeItem.id); setShowThemePicker(false) }}
                className="block w-full text-left px-3 py-2 text-sm transition-colors cursor-pointer rounded-lg mx-1"
                style={{
                  color: theme === themeItem.id ? 'var(--hud-text)' : 'var(--hud-text-dim)',
                  background: theme === themeItem.id ? 'var(--hud-bg-hover)' : 'transparent',
                  minHeight: '38px',
                }}
              >
                {themeItem.icon} {t(themeItem.labelKey as any)}
              </button>
            ))}
            <div className="border-t my-1" style={{ borderColor: 'var(--hud-border)' }} />
            <button
              onClick={() => setScanlines(!scanlines)}
              className="block w-full text-left px-3 py-2 text-sm cursor-pointer rounded-lg mx-1"
              style={{
                color: 'var(--hud-text-dim)',
                minHeight: '38px',
                background: 'transparent',
              }}
            >
              {scanlines ? '▣' : '□'} {t('theme.scanlines')}
            </button>
          </div>
        )}
      </div>

      <span className="text-sm ml-1 tabular-nums shrink-0 hidden sm:inline" style={{ color: 'var(--hud-text-dim)' }}>
        {time.toLocaleTimeString('en-US', { hour12: false })}
      </span>

      <button
        onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
        className="ml-1 px-2.5 py-1 text-xs font-semibold rounded-lg cursor-pointer shrink-0 border"
        style={{
          color: 'var(--hud-primary)',
          borderColor: 'var(--hud-border-bright)',
          background: 'var(--hud-bg-panel)',
          minHeight: '30px',
        }}
        title={lang === 'en' ? 'Switch to Chinese' : '切换到英文'}
      >
        {lang === 'en' ? '中文' : 'EN'}
      </button>
    </div>
  )
}
