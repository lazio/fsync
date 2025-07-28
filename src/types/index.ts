export interface Couple {
  id: string
  name: string
  createdAt: Date
  timezone?: string
}

export interface User {
  id: string
  coupleId: string
  name: string
  email?: string
}

export interface Prompt {
  id: string
  text: string
  category?: string
  isDefault: boolean
  isActive: boolean
}

export interface Card {
  id: string
  title: string
  description?: string
  category?: string
  isDefault: boolean
  isActive: boolean
}

export interface Meeting {
  id: string
  coupleId: string
  startedAt: Date
  completedAt?: Date
  mood1?: number
  mood2?: number
  notes1?: string
  notes2?: string
  promptId?: string
  cardIds: string[]
  gratitude1?: string
  gratitude2?: string
  actionItems?: string[]
}

export interface MeetingItem {
  id: string
  meetingId: string
  cardId: string
  status: 'pending' | 'discussed' | 'actionItem' | 'skipped'
  notes?: string
  order: number
}