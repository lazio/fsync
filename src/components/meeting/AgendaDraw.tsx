import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shuffle } from 'lucide-react'
import { useContentStore } from '@/stores/contentStore'
import { useMeetingStore } from '@/stores/meetingStore'
import { Button } from '@/components/ui/button'
import type { Card } from '@/types'
import styles from './AgendaDraw.module.scss'

export function AgendaDraw() {
  const navigate = useNavigate()
  const { getActiveCards } = useContentStore()
  const { currentMeeting, updateMeeting, setCurrentItems } = useMeetingStore()
  const [selectedCards, setSelectedCards] = useState<Card[]>([])
  const [isShuffling, setIsShuffling] = useState(false)

  const shuffleCards = () => {
    setIsShuffling(true)
    const activeCards = getActiveCards()
    
    // Shuffle array using Fisher-Yates algorithm
    const shuffled = [...activeCards]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    
    // Select 3 cards
    const selected = shuffled.slice(0, 3)
    setSelectedCards(selected)
    
    setTimeout(() => setIsShuffling(false), 600)
  }

  const handleContinue = () => {
    if (currentMeeting && selectedCards.length > 0) {
      const cardIds = selectedCards.map(c => c.id)
      updateMeeting(currentMeeting.id, { cardIds })
      
      // Create meeting items
      const items = selectedCards.map((card, index) => ({
        id: `item-${Date.now()}-${index}`,
        meetingId: currentMeeting.id,
        cardId: card.id,
        status: 'pending' as const,
        order: index,
      }))
      setCurrentItems(items)
    }
    navigate('/meeting/agenda-workspace')
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Agenda Draw</h1>
        <p className={styles.subtitle}>Draw 3 topics for today's meeting</p>
      </header>

      <div className={styles.content}>
        {selectedCards.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>
              Tap the button to draw your agenda cards
            </p>
          </div>
        ) : (
          <div className={`${styles.cards} ${isShuffling ? styles.shuffling : ''}`}>
            {selectedCards.map((card, index) => (
              <div
                key={card.id}
                className={styles.card}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className={styles.cardTitle}>{card.title}</h3>
                {card.description && (
                  <p className={styles.cardDescription}>{card.description}</p>
                )}
                {card.category && (
                  <span className={styles.category}>{card.category}</span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <Button
          variant="secondary"
          size="lg"
          fullWidth
          onClick={shuffleCards}
          className={styles.shuffleButton}
        >
          <Shuffle size={20} />
          {selectedCards.length > 0 ? 'Shuffle Again' : 'Draw Cards'}
        </Button>

        {selectedCards.length > 0 && (
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleContinue}
          >
            Continue with These Topics
          </Button>
        )}
      </div>
    </div>
  )
}