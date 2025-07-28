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

export interface Meeting {
  id: string
  coupleId: string
  startedAt: Date
  completedAt?: Date
  promptId?: string
  topicOrder: string[] // Ordered list of topic IDs
  currentTopicIndex?: number
}

export interface TopicResponse {
  id: string
  meetingId: string
  topicId: string
  notes?: string
  checkedPoints?: string[] // IDs of checked discussion points
  // For check-in topic specifically
  mood1?: number
  mood2?: number
  checkInNotes1?: string
  checkInNotes2?: string
  // For wrap-up topic
  keyTakeaways?: string[]
  gratitude1?: string
  gratitude2?: string
}