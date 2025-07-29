import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Meeting, TopicResponse } from '@/types'
import { getTopicOrder } from '@/data/topics'
import { useSettingsStore } from './settingsStore'

interface MeetingState {
  meetings: Meeting[]
  currentMeeting: Meeting | null
  topicResponses: TopicResponse[]
  
  createMeeting: (promptId?: string) => Meeting
  updateMeeting: (id: string, updates: Partial<Meeting>) => void
  setCurrentMeeting: (meeting: Meeting | null) => void
  
  addTopicResponse: (response: TopicResponse) => void
  updateTopicResponse: (id: string, updates: Partial<TopicResponse>) => void
  getCurrentTopicResponse: (topicId: string) => TopicResponse | undefined
  
  advanceToNextTopic: () => void
  completeMeeting: () => void
  getStreak: () => number
}

export const useMeetingStore = create<MeetingState>()(
  persist(
    (set, get) => ({
      meetings: [],
      currentMeeting: null,
      topicResponses: [],
      
      createMeeting: (promptId) => {
        const { selectedTopics, shuffleTopics } = useSettingsStore.getState()
        const meeting: Meeting = {
          id: `meeting-${Date.now()}`,
          coupleId: 'default-couple',
          startedAt: new Date(),
          promptId,
          topicOrder: getTopicOrder(selectedTopics, shuffleTopics),
          currentTopicIndex: 0
        }
        set((state) => ({
          meetings: [...state.meetings, meeting],
          currentMeeting: meeting,
          topicResponses: [] // Clear responses for new meeting
        }))
        return meeting
      },
      
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
      
      addTopicResponse: (response) =>
        set((state) => ({
          topicResponses: [...state.topicResponses, response]
        })),
      
      updateTopicResponse: (id, updates) =>
        set((state) => ({
          topicResponses: state.topicResponses.map((r) =>
            r.id === id ? { ...r, ...updates } : r
          )
        })),
      
      getCurrentTopicResponse: (topicId) => {
        const { topicResponses, currentMeeting } = get()
        if (!currentMeeting) return undefined
        return topicResponses.find(
          r => r.meetingId === currentMeeting.id && r.topicId === topicId
        )
      },
      
      advanceToNextTopic: () => {
        const { currentMeeting } = get()
        if (currentMeeting && currentMeeting.currentTopicIndex !== undefined) {
          const nextIndex = currentMeeting.currentTopicIndex + 1
          set((state) => ({
            currentMeeting: {
              ...state.currentMeeting!,
              currentTopicIndex: nextIndex
            }
          }))
        }
      },
      
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
            topicResponses: []
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