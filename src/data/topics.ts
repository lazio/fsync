export interface TopicPoint {
  id: string
  text: string
}

export interface Topic {
  id: string
  title: string
  order?: number // Used for fixed position topics
  isFixed: boolean
  points: TopicPoint[]
}

export const topics: Topic[] = [
  {
    id: 'check-in',
    title: 'Check-in',
    order: 0,
    isFixed: true,
    points: [
      { id: 'ci1', text: 'How are we feeling? (Energy, stress, achievements, challenges)' },
      { id: 'ci2', text: 'Is there anything we need to share?' }
    ]
  },
  {
    id: 'home-household',
    title: 'Home & Household',
    isFixed: false,
    points: [
      { id: 'hh1', text: 'Groceries and meal planning' },
      { id: 'hh2', text: 'House chores and responsibilities' },
      { id: 'hh3', text: 'Upcoming trips and major purchases' }
    ]
  },
  {
    id: 'child-family',
    title: 'Child & Family',
    isFixed: false,
    points: [
      { id: 'cf1', text: "Child's needs: schooling, health, clubs, behaviour" },
      { id: 'cf2', text: 'Time together: family activities, walks, traditions' },
      { id: 'cf3', text: 'Discussing parenting approaches' }
    ]
  },
  {
    id: 'finances-planning',
    title: 'Finances & Planning',
    isFixed: false,
    points: [
      { id: 'fp1', text: 'Budget: expenses, savings, upcoming payments' },
      { id: 'fp2', text: 'Long-term goals: travel, home improvements, investments' },
      { id: 'fp3', text: 'Administrative tasks and documents' }
    ]
  },
  {
    id: 'relationship-growth',
    title: 'Relationship & Personal Growth',
    isFixed: false,
    points: [
      { id: 'rg1', text: 'How are we feeling in the relationship?' },
      { id: 'rg2', text: 'Time for ourselves and for each other' },
      { id: 'rg3', text: 'Personal goals and self-care' }
    ]
  },
  {
    id: 'wrap-up',
    title: 'Wrap-up',
    order: 5,
    isFixed: true,
    points: [
      { id: 'wu1', text: 'Key takeaways and actions for the week' },
      { id: 'wu2', text: 'Gratitude and support' }
    ]
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