# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Weekly Parents' Meeting – A mobile-first web app that guides couples through structured weekly family meetings with a playful, friction-free approach. The flow includes: Random Story Ice-Breaker → Personal Check-in → Shuffled Agenda → Gratitude.

## Tech Stack

- **Frontend**: React + Vite
- **State Management**: Zustand
- **Database**: LocalStorage
- **Styling**: SCSS + shadcn components library
- **Target**: Mobile-first web app

## Common Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run linting
npm run test         # Run tests
```

## Architecture Overview

### Core User Flow
1. **Home/Dashboard** → Start Meeting, view streak, past meetings
2. **Ice-Breaker** → Random prompt, both partners confirm completion
3. **Check-in** → Mood slider + notes/voice
4. **Agenda Draw** → Shuffle and reveal 3 cards from deck
5. **Agenda Workspace** → Swipe/drag/reorder cards, add notes
6. **Gratitude** → Partner appreciation with confetti
7. **Summary** → Meeting recap with actions
8. **Libraries** → CRUD for prompts and agenda cards

### Key Components Structure
```
src/
├── components/
│   ├── meeting/          # Meeting flow components
│   ├── libraries/        # Content management
│   └── shared/           # Reusable UI elements
├── stores/               # Zustand stores
├── hooks/                # Custom React hooks
└── utils/                # Helper functions
```

### Data Model
- **Couple**: couple_id, name, timezone
- **User**: user_id, couple_id, email
- **Prompt**: Ice-breaker prompts (50 defaults)
- **Card**: Agenda cards (customizable)
- **Meeting**: Session tracking
- **Item**: Meeting items with status/notes
- **Gratitude**: Partner appreciation entries

### Key Features
- Pastel UI (lilac/teal/yellow)
- Accessibility: reduced-motion support
- Local storage fallback for offline

### Development Guidelines
- Minimum tap targets: 14px
- Bottom navigation for main actions
- Optimize for thumb-friendly interactions
- Test on actual mobile devices
- Keep bundle size minimal for mobile networks
