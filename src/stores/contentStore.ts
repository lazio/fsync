import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Prompt } from '@/types'
import { defaultPrompts } from '@/data/defaults'

interface ContentState {
  prompts: Prompt[]
  addPrompt: (prompt: Prompt) => void
  updatePrompt: (id: string, updates: Partial<Prompt>) => void
  deletePrompt: (id: string) => void
  getActivePrompts: () => Prompt[]
  resetToDefaults: () => void
}

export const useContentStore = create<ContentState>()(
  persist(
    (set, get) => ({
      prompts: defaultPrompts,
      
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
      
      getActivePrompts: () => {
        const { prompts } = get()
        return prompts.filter((p) => p.isActive)
      },
      
      resetToDefaults: () => {
        set({ prompts: defaultPrompts })
      },
    }),
    {
      name: 'wpm_content-storage',
    }
  )
)