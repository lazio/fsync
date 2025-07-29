import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingsState {
  partner1Name: string
  partner2Name: string
  setPartner1Name: (name: string) => void
  setPartner2Name: (name: string) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      partner1Name: 'Partner 1',
      partner2Name: 'Partner 2',
      setPartner1Name: (name) => set({ partner1Name: name }),
      setPartner2Name: (name) => set({ partner2Name: name }),
    }),
    {
      name: 'wpm_settings-storage',
    }
  )
)