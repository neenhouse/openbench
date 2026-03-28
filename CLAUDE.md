# OpenBench

Independent AI model benchmarking platform — the Consumer Reports of AI.

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite 8, CSS custom properties
- **Styling**: Dark theme, data-dense dashboard aesthetic
- **Deploy**: Cloudflare Pages via GitHub Actions
- **Tooling**: pnpm (package manager), mise (runtime versions)

## Commands

```bash
pnpm dev        # Start dev server
pnpm build      # TypeScript check + Vite production build
pnpm lint       # ESLint
pnpm test       # Run tests
```

## Conventions

- Use **pnpm** as package manager
- Use **mise** for tool versions (see `.mise.toml`)
- CSS custom properties for theming (defined in `src/index.css`)
- No external UI libraries — all components hand-built
- 8px grid system
- Dark theme default
- Monospace for data, Inter for prose
