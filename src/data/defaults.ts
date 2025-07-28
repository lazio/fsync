import type { Prompt, Card } from '@/types'

export const defaultPrompts: Prompt[] = [
  // Connection & Intimacy
  { id: 'p1', text: "What's a small moment from this week that made you think of your partner?", category: 'connection', isDefault: true, isActive: true },
  { id: 'p2', text: "If you could relive one day from your relationship, which would it be?", category: 'connection', isDefault: true, isActive: true },
  { id: 'p3', text: "What's something your partner did recently that you haven't thanked them for yet?", category: 'connection', isDefault: true, isActive: true },
  { id: 'p4', text: "Describe your partner using only food metaphors", category: 'connection', isDefault: true, isActive: true },
  { id: 'p5', text: "What song best captures how you're feeling about your relationship right now?", category: 'connection', isDefault: true, isActive: true },
  
  // Dreams & Future
  { id: 'p6', text: "If we won the lottery tomorrow, what's the first thing we'd do together?", category: 'dreams', isDefault: true, isActive: true },
  { id: 'p7', text: "What adventure should we add to our bucket list?", category: 'dreams', isDefault: true, isActive: true },
  { id: 'p8', text: "Describe our ideal Sunday morning 5 years from now", category: 'dreams', isDefault: true, isActive: true },
  { id: 'p9', text: "What skill would you love to learn together?", category: 'dreams', isDefault: true, isActive: true },
  { id: 'p10', text: "If we could live anywhere for a year, where would it be?", category: 'dreams', isDefault: true, isActive: true },
  
  // Playful & Light
  { id: 'p11', text: "If your partner was a superhero, what would their power be?", category: 'playful', isDefault: true, isActive: true },
  { id: 'p12', text: "What's the weirdest thing you find attractive about your partner?", category: 'playful', isDefault: true, isActive: true },
  { id: 'p13', text: "If you had to describe your relationship as a movie genre, what would it be?", category: 'playful', isDefault: true, isActive: true },
  { id: 'p14', text: "What animal best represents your partner and why?", category: 'playful', isDefault: true, isActive: true },
  { id: 'p15', text: "Create a silly award to give your partner right now", category: 'playful', isDefault: true, isActive: true },
  
  // Growth & Reflection
  { id: 'p16', text: "What's one way you've grown because of your partner?", category: 'growth', isDefault: true, isActive: true },
  { id: 'p17', text: "Share a fear you haven't talked about recently", category: 'growth', isDefault: true, isActive: true },
  { id: 'p18', text: "What boundary do we need to set with the outside world?", category: 'growth', isDefault: true, isActive: true },
  { id: 'p19', text: "How have we gotten better at arguing?", category: 'growth', isDefault: true, isActive: true },
  { id: 'p20', text: "What pattern from your family are you trying not to repeat?", category: 'growth', isDefault: true, isActive: true },
  
  // Daily Life
  { id: 'p21', text: "What household task do you secretly appreciate your partner doing?", category: 'daily', isDefault: true, isActive: true },
  { id: 'p22', text: "Describe your partner's morning routine as if it were an Olympic sport", category: 'daily', isDefault: true, isActive: true },
  { id: 'p23', text: "What's one thing we could change about our bedtime routine?", category: 'daily', isDefault: true, isActive: true },
  { id: 'p24', text: "If you could magically take one chore off your partner's plate, which would it be?", category: 'daily', isDefault: true, isActive: true },
  { id: 'p25', text: "What's your partner's most endearing bad habit?", category: 'daily', isDefault: true, isActive: true },
  
  // Memories
  { id: 'p26', text: "What's a funny miscommunication we can laugh about now?", category: 'memories', isDefault: true, isActive: true },
  { id: 'p27', text: "Share your favorite photo of us and explain why", category: 'memories', isDefault: true, isActive: true },
  { id: 'p28', text: "What's a tradition we've accidentally created?", category: 'memories', isDefault: true, isActive: true },
  { id: 'p29', text: "Describe our first date from your partner's perspective", category: 'memories', isDefault: true, isActive: true },
  { id: 'p30', text: "What's a small detail from early in our relationship you still remember?", category: 'memories', isDefault: true, isActive: true },
  
  // Support & Care
  { id: 'p31', text: "How can I best support you this coming week?", category: 'support', isDefault: true, isActive: true },
  { id: 'p32', text: "What's weighing on your mind that you haven't shared yet?", category: 'support', isDefault: true, isActive: true },
  { id: 'p33', text: "What kind of comfort do you need when you're stressed?", category: 'support', isDefault: true, isActive: true },
  { id: 'p34', text: "Share a recent win you haven't celebrated yet", category: 'support', isDefault: true, isActive: true },
  { id: 'p35', text: "What's one way I've made you feel loved this week?", category: 'support', isDefault: true, isActive: true },
  
  // Creativity & Fun
  { id: 'p36', text: "Invent a holiday just for us - what would we celebrate?", category: 'creative', isDefault: true, isActive: true },
  { id: 'p37', text: "If we wrote a children's book together, what would it be about?", category: 'creative', isDefault: true, isActive: true },
  { id: 'p38', text: "Design our dream date using only things we already have at home", category: 'creative', isDefault: true, isActive: true },
  { id: 'p39', text: "What would our couple's theme song be?", category: 'creative', isDefault: true, isActive: true },
  { id: 'p40', text: "If we had a food truck, what would we serve?", category: 'creative', isDefault: true, isActive: true },
  
  // Values & Meaning
  { id: 'p41', text: "What value do we share that makes us stronger?", category: 'values', isDefault: true, isActive: true },
  { id: 'p42', text: "How do we want people to describe our relationship?", category: 'values', isDefault: true, isActive: true },
  { id: 'p43', text: "What legacy do we want to build together?", category: 'values', isDefault: true, isActive: true },
  { id: 'p44', text: "What does 'home' mean to us?", category: 'values', isDefault: true, isActive: true },
  { id: 'p45', text: "How have our priorities shifted since we met?", category: 'values', isDefault: true, isActive: true },
  
  // Seasonal
  { id: 'p46', text: "What's your favorite season to spend with me and why?", category: 'seasonal', isDefault: true, isActive: true },
  { id: 'p47', text: "Create a new tradition for the current season", category: 'seasonal', isDefault: true, isActive: true },
  { id: 'p48', text: "What outdoor activity should we try together?", category: 'seasonal', isDefault: true, isActive: true },
  { id: 'p49', text: "Plan a perfect day based on the current weather", category: 'seasonal', isDefault: true, isActive: true },
  { id: 'p50', text: "What's a seasonal food that reminds you of us?", category: 'seasonal', isDefault: true, isActive: true },
]

export const defaultCards: Card[] = [
  // Practical Matters
  { id: 'c1', title: 'Budget Check-in', description: 'Review spending, savings goals, and financial priorities', category: 'practical', isDefault: true, isActive: true },
  { id: 'c2', title: 'Household Tasks', description: 'Discuss chore distribution and home maintenance needs', category: 'practical', isDefault: true, isActive: true },
  { id: 'c3', title: 'Calendar Sync', description: 'Align schedules, plan upcoming events and commitments', category: 'practical', isDefault: true, isActive: true },
  { id: 'c4', title: 'Health & Wellness', description: 'Check in on physical and mental health, exercise, appointments', category: 'practical', isDefault: true, isActive: true },
  { id: 'c5', title: 'Meal Planning', description: 'Plan weekly meals, grocery lists, and cooking responsibilities', category: 'practical', isDefault: true, isActive: true },
  
  // Relationship
  { id: 'c6', title: 'Quality Time', description: 'Plan date nights, activities, and connection rituals', category: 'relationship', isDefault: true, isActive: true },
  { id: 'c7', title: 'Intimacy Check', description: 'Discuss physical and emotional intimacy needs', category: 'relationship', isDefault: true, isActive: true },
  { id: 'c8', title: 'Love Languages', description: 'Share how you prefer to give and receive love', category: 'relationship', isDefault: true, isActive: true },
  { id: 'c9', title: 'Conflict Resolution', description: 'Address any unresolved tensions or recurring issues', category: 'relationship', isDefault: true, isActive: true },
  { id: 'c10', title: 'Appreciation Practice', description: 'Share specific things you appreciate about each other', category: 'relationship', isDefault: true, isActive: true },
  
  // Family & Social
  { id: 'c11', title: 'Family Dynamics', description: 'Discuss extended family relationships and boundaries', category: 'family', isDefault: true, isActive: true },
  { id: 'c12', title: 'Parenting Alignment', description: 'Sync on parenting decisions and child-related topics', category: 'family', isDefault: true, isActive: true },
  { id: 'c13', title: 'Social Calendar', description: 'Plan time with friends and social commitments', category: 'family', isDefault: true, isActive: true },
  { id: 'c14', title: 'Pet Care', description: 'Discuss pet needs, vet visits, and care responsibilities', category: 'family', isDefault: true, isActive: true },
  { id: 'c15', title: 'Holiday Planning', description: 'Coordinate holiday celebrations and family visits', category: 'family', isDefault: true, isActive: true },
  
  // Personal Growth
  { id: 'c16', title: 'Individual Goals', description: "Support each other's personal aspirations and growth", category: 'growth', isDefault: true, isActive: true },
  { id: 'c17', title: 'Career Development', description: 'Discuss work situations, career goals, and support needs', category: 'growth', isDefault: true, isActive: true },
  { id: 'c18', title: 'Learning Together', description: 'Choose skills or topics to explore as a couple', category: 'growth', isDefault: true, isActive: true },
  { id: 'c19', title: 'Habits & Routines', description: 'Review and adjust daily/weekly routines', category: 'growth', isDefault: true, isActive: true },
  { id: 'c20', title: 'Mental Load', description: 'Discuss invisible labor and emotional responsibilities', category: 'growth', isDefault: true, isActive: true },
  
  // Fun & Adventure
  { id: 'c21', title: 'Adventure Planning', description: 'Dream up and plan future trips or experiences', category: 'fun', isDefault: true, isActive: true },
  { id: 'c22', title: 'Hobby Time', description: 'Share interests and plan activities together', category: 'fun', isDefault: true, isActive: true },
  { id: 'c23', title: 'Entertainment', description: 'Choose shows, books, or games to enjoy together', category: 'fun', isDefault: true, isActive: true },
  { id: 'c24', title: 'Spontaneity Check', description: 'Plan something unexpected or break routine', category: 'fun', isDefault: true, isActive: true },
  { id: 'c25', title: 'Celebration Planning', description: 'Plan how to celebrate upcoming milestones', category: 'fun', isDefault: true, isActive: true },
  
  // Home & Environment
  { id: 'c26', title: 'Home Projects', description: 'Plan improvements, decorating, or organizing projects', category: 'home', isDefault: true, isActive: true },
  { id: 'c27', title: 'Space Needs', description: 'Discuss personal space and shared space needs', category: 'home', isDefault: true, isActive: true },
  { id: 'c28', title: 'Sustainability', description: 'Review eco-friendly practices and goals', category: 'home', isDefault: true, isActive: true },
  { id: 'c29', title: 'Emergency Planning', description: 'Update emergency contacts and preparedness plans', category: 'home', isDefault: true, isActive: true },
  { id: 'c30', title: 'Digital Life', description: 'Organize shared digital accounts and data', category: 'home', isDefault: true, isActive: true },
]