import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { defaultSelectedTopics } from '@/data/topics'

interface SettingsState {
  partner1Name: string
  partner2Name: string
  selectedTopics: string[]
  setPartner1Name: (name: string) => void
  setPartner2Name: (name: string) => void
  setSelectedTopics: (topics: string[]) => void
  toggleTopic: (topicId: string) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      partner1Name: 'Partner 1',
      partner2Name: 'Partner 2',
      selectedTopics: defaultSelectedTopics,
      setPartner1Name: (name) => set({ partner1Name: name }),
      setPartner2Name: (name) => set({ partner2Name: name }),
      setSelectedTopics: (topics) => set({ selectedTopics: topics }),
      toggleTopic: (topicId) => set((state) => ({
        selectedTopics: state.selectedTopics.includes(topicId)
          ? state.selectedTopics.filter(id => id !== topicId)
          : [...state.selectedTopics, topicId]
      })),
    }),
    {
      name: 'wpm_settings-storage',
    }
  )
)