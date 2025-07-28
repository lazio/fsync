import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Prompt, Card } from '@/types'
import { defaultPrompts, defaultCards } from '@/data/defaults'

interface ContentState {
  prompts: Prompt[]
  cards: Card[]
  addPrompt: (prompt: Prompt) => void
  updatePrompt: (id: string, updates: Partial<Prompt>) => void
  deletePrompt: (id: string) => void
  addCard: (card: Card) => void
  updateCard: (id: string, updates: Partial<Card>) => void
  deleteCard: (id: string) => void
  getActivePrompts: () => Prompt[]
  getActiveCards: () => Card[]
  resetToDefaults: () => void
}

export const useContentStore = create<ContentState>()(
  persist(
    (set, get) => ({
      prompts: defaultPrompts,
      cards: defaultCards,
      
      addPrompt: (prompt) =>
        set((state) => ({ prompts: [...state.prompts, prompt] })),
      
      updatePrompt: (id, updates) =>
        set((state) => ({
          prompts: state.prompts.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),
      
      deletePrompt: (id) =>
        set((state) => ({
          prompts: state.prompts.filter((p) => p.id !== id && !p.isDefault),
        })),
      
      addCard: (card) =>
        set((state) => ({ cards: [...state.cards, card] })),
      
      updateCard: (id, updates) =>
        set((state) => ({
          cards: state.cards.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        })),
      
      deleteCard: (id) =>
        set((state) => ({
          cards: state.cards.filter((c) => c.id !== id && !c.isDefault),
        })),
      
      getActivePrompts: () => {
        const { prompts } = get()
        return prompts.filter((p) => p.isActive)
      },
      
      getActiveCards: () => {
        const { cards } = get()
        return cards.filter((c) => c.isActive)
      },
      
      resetToDefaults: () => {
        set({ prompts: defaultPrompts, cards: defaultCards })
      },
    }),
    {
      name: 'wpm_content-storage',
    }
  )
)