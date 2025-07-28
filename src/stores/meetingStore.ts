import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Meeting, MeetingItem } from '@/types'

interface MeetingState {
  meetings: Meeting[]
  currentMeeting: Meeting | null
  currentItems: MeetingItem[]
  addMeeting: (meeting: Meeting) => void
  updateMeeting: (id: string, updates: Partial<Meeting>) => void
  setCurrentMeeting: (meeting: Meeting | null) => void
  setCurrentItems: (items: MeetingItem[]) => void
  updateItem: (id: string, updates: Partial<MeetingItem>) => void
  completeMeeting: () => void
  getStreak: () => number
}

export const useMeetingStore = create<MeetingState>()(
  persist(
    (set, get) => ({
      meetings: [],
      currentMeeting: null,
      currentItems: [],
      
      addMeeting: (meeting) => 
        set((state) => ({ meetings: [...state.meetings, meeting] })),
      
      updateMeeting: (id, updates) =>
        set((state) => ({
          meetings: state.meetings.map((m) =>
            m.id === id ? { ...m, ...updates } : m
          ),
          currentMeeting:
            state.currentMeeting?.id === id
              ? { ...state.currentMeeting, ...updates }
              : state.currentMeeting,
        })),
      
      setCurrentMeeting: (meeting) => set({ currentMeeting: meeting }),
      
      setCurrentItems: (items) => set({ currentItems: items }),
      
      updateItem: (id, updates) =>
        set((state) => ({
          currentItems: state.currentItems.map((item) =>
            item.id === id ? { ...item, ...updates } : item
          ),
        })),
      
      completeMeeting: () => {
        const { currentMeeting } = get()
        if (currentMeeting) {
          set((state) => ({
            meetings: state.meetings.map((m) =>
              m.id === currentMeeting.id
                ? { ...m, completedAt: new Date() }
                : m
            ),
            currentMeeting: null,
            currentItems: [],
          }))
        }
      },
      
      getStreak: () => {
        const { meetings } = get()
        const sortedMeetings = [...meetings]
          .filter((m) => m.completedAt)
          .sort((a, b) => 
            new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime()
          )
        
        if (sortedMeetings.length === 0) return 0
        
        let streak = 1
        const oneWeek = 7 * 24 * 60 * 60 * 1000
        
        for (let i = 0; i < sortedMeetings.length - 1; i++) {
          const current = new Date(sortedMeetings[i].completedAt!)
          const next = new Date(sortedMeetings[i + 1].completedAt!)
          const diff = current.getTime() - next.getTime()
          
          if (diff <= oneWeek) {
            streak++
          } else {
            break
          }
        }
        
        return streak
      },
    }),
    {
      name: 'wpm_meeting-storage',
    }
  )
)