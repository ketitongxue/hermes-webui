# Changelog

All notable changes to hermes-hudui are documented here.

## [Unreleased]

### Added
- **Chat tab** — Live chat with the Hermes agent via SSE streaming
  - Multiple named sessions with independent message histories
  - Per-session client-side message cache (survives tab switches)
  - Tool call cards showing live tool invocations and results
  - Reasoning display block for agent thinking steps
  - Fixed-height layout — message thread scrolls internally, no page-level scroll
  - Session sidebar with create/switch/delete
  - Auto-selects first session on load
- **Corrections tab** — Corrections grouped by severity (critical/major/minor) with timestamps, source, and session links (panel existed, now reachable via navigation)
- **Patterns tab** — Task clusters, hourly activity heatmap, peak hour detection, repeated prompts flagged as skill candidates (panel existed, now reachable via navigation)

### Changed
- Dashboard now has 13 navigable tabs (was 10)
- `Panel.tsx` accepts `noPadding` prop for full-height children

### Fixed
- Chat sessions now display independent message histories (previously all sessions shared one message array)
- Chat output preserves whitespace and line breaks (`white-space: pre-wrap`)
- Chat tab no longer causes page-level scroll overflow

---

## [0.1.0] — Initial Release

### Added
- **Dashboard** — Agent identity, conversation stats, memory capacity bars, API key status, service health, recent skills, active projects, cron jobs, tool usage bar chart, daily message sparkline, growth delta
- **Memory** — Agent memory and user profile capacity bars, entry count by category, full entry text
- **Skills** — Category bar chart (clickable to filter), skill details with file paths, custom skill badges
- **Sessions** — Session history with message/token counts, source breakdown, daily sparklines
- **Cron** — Scheduled jobs with schedule, state, last/next run, delivery target, prompt preview
- **Projects** — Repos grouped by activity level, branch, dirty file count, language detection
- **Health** — API key presence indicators, service health with PIDs, provider/model info, DB size
- **Agents** — Live/idle processes with PID/memory/uptime, operator alert queue, recent session history with tmux jump hints
- **Profiles** — Full profile cards with model, provider, gateway status, soul summary, toolsets, API keys, aliases
- **Costs** — Per-model USD cost estimates, daily trend sparkline (last 10 days), input/output/cache token breakdown
- **WebSocket real-time updates** — File watcher broadcasts changes, frontend auto-refreshes via SWR mutation
- **Smart caching** — mtime-based cache invalidation (sessions: 30s, skills/patterns: 60s, profiles: 45s)
- **Four themes** — Neural Awakening (cyan), Blade Runner (amber), fsociety (green), Anime (purple)
- **CRT scanlines** — Optional overlay toggle
- **Command palette** — `Ctrl+K` fuzzy search across all tabs
- **Boot screen** — One-time animated initialization sequence
- **Keyboard shortcuts** — `1`–`9`, `0` for tab switching; `t` for theme picker
- **WSS support** — Secure WebSocket when served over HTTPS
