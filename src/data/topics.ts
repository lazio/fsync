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
  },
  {
    id: 'education-learning',
    title: 'Education & Learning',
    isFixed: false,
    description: 'Courses, books, podcasts, and skills each person is pursuing or wants support with.'
  },
  {
    id: 'social-connections',
    title: 'Friends & Social Connections',
    isFixed: false,
    description: 'Catching up with friends and relatives, scheduling calls or gatherings, and offering support.'
  },
  {
    id: 'culture-entertainment',
    title: 'Culture & Entertainment',
    isFixed: false,
    description: 'Upcoming concerts, exhibitions, family movie or game nights, and shared reading lists.'
  },
  {
    id: 'travel-adventures',
    title: 'Travel & Adventures',
    isFixed: false,
    description: 'Ideas for weekend getaways, future holidays, and the budgeting or logistics involved.'
  },
  {
    id: 'home-projects',
    title: 'Home Projects & DIY',
    isFixed: false,
    description: 'Repairs, décor updates, gardening plans, and any tools or supplies we need.'
  },
  {
    id: 'safety-security',
    title: 'Safety & Security',
    isFixed: false,
    description: 'Emergency contacts, home safety checks (alarms, first-aid), and cyber-security updates.'
  },
  {
    id: 'celebrations',
    title: 'Celebrations & Milestones',
    isFixed: false,
    description: 'Upcoming birthdays, anniversaries, gift planning, and reflecting on recent achievements.'
  },
  {
    id: 'values-traditions',
    title: 'Family Values & Traditions',
    isFixed: false,
    description: 'Reviewing traditions to keep or start, discussing our family mission, and cultural heritage.'
  },
  {
    id: 'career-development',
    title: 'Career & Professional Development',
    isFixed: false,
    description: 'Work updates, networking or mentorship opportunities, and upcoming trainings or conferences.'
  },
  {
    id: 'creative-projects',
    title: 'Creative Projects',
    isFixed: false,
    description: 'Art, music, writing or crafts we\'re working on, possible family collaborations, and show-and-tell time.'
  }
]

// Default topics that are selected when the app is first used
export const defaultSelectedTopics = [
  'home-household',
  'child-family',
  'finances-planning',
  'relationship-growth'
]

export function getTopicOrder(selectedTopicIds?: string[], shouldShuffle: boolean = true): string[] {
  // Get fixed topics
  const checkIn = topics.find(t => t.id === 'check-in')!
  const wrapUp = topics.find(t => t.id === 'wrap-up')!
  
  // Get shuffleable topics based on selection
  const availableTopics = topics.filter(t => !t.isFixed)
  const selectedTopics = selectedTopicIds 
    ? availableTopics.filter(t => selectedTopicIds.includes(t.id))
    : availableTopics.filter(t => defaultSelectedTopics.includes(t.id))
  
  // Shuffle selected topics if needed
  let orderedTopics = [...selectedTopics]
  
  if (shouldShuffle) {
    for (let i = orderedTopics.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[orderedTopics[i], orderedTopics[j]] = [orderedTopics[j], orderedTopics[i]]
    }
  }
  
  // Return ordered topic IDs
  return [
    checkIn.id,
    ...orderedTopics.map(t => t.id),
    wrapUp.id
  ]
}