import type { Prompt } from '@/types'

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
]