export interface Topic {
  id: string
  title: string
  order?: number // Used for fixed position topics
  isFixed: boolean
  description: string
}

export const topics: Topic[] = [
  {
    id: 'check-in',
    title: 'Check-in',
    order: 0,
    isFixed: true,
    description: 'How are we feeling? (Energy, stress, achievements, challenges). Is there anything we need to share?'
  },
  {
    id: 'home-household',
    title: 'Home & Household',
    isFixed: false,
    description: 'Speak how to plan groceries and meals, House chores and responsibilities. Possibly upcoming trips and big purchases.'
  },
  {
    id: 'child-family',
    title: 'Child & Family',
    isFixed: false,
    description: "Child's needs: schooling, health, clubs, behaviour. Time together: family activities, walks, traditions. Discussing parenting approaches."
  },
  {
    id: 'finances-planning',
    title: 'Finances & Planning',
    isFixed: false,
    description: 'Budget: expenses, savings, upcoming payments. Long-term goals: travel, home improvements, investments. Administrative tasks and documents.'
  },
  {
    id: 'relationship-growth',
    title: 'Relationship & Personal Growth',
    isFixed: false,
    description: 'How are we feeling in the relationship? Time for ourselves and for each other. Personal goals and self-care.'
  },
  {
    id: 'wrap-up',
    title: 'Wrap-up',
    order: 5,
    isFixed: true,
    description: 'Key takeaways and actions for the week. Gratitude and support.'
  }
]

export function getShuffledTopicOrder(): string[] {
  // Get fixed topics
  const checkIn = topics.find(t => t.id === 'check-in')!
  const wrapUp = topics.find(t => t.id === 'wrap-up')!
  
  // Get shuffleable topics
  const middleTopics = topics.filter(t => !t.isFixed)
  
  // Shuffle middle topics
  const shuffled = [...middleTopics]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  
  // Return ordered topic IDs
  return [
    checkIn.id,
    ...shuffled.map(t => t.id),
    wrapUp.id
  ]
}