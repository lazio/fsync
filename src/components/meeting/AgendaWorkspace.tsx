import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, X, MessageSquare } from 'lucide-react'
import { useMeetingStore } from '@/stores/meetingStore'
import { useContentStore } from '@/stores/contentStore'
import { Button } from '@/components/ui/button'
import styles from './AgendaWorkspace.module.scss'

export function AgendaWorkspace() {
  const navigate = useNavigate()
  const { currentItems, updateItem } = useMeetingStore()
  const { cards } = useContentStore()
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const getCard = (cardId: string) => cards.find(c => c.id === cardId)

  const handleStatusChange = (itemId: string, status: 'discussed' | 'skipped') => {
    updateItem(itemId, { status })
  }

  const handleAddNote = (itemId: string, note: string) => {
    updateItem(itemId, { notes: note })
  }

  const handleContinue = () => {
    navigate('/meeting/gratitude')
  }

  const discussedCount = currentItems.filter(item => item.status === 'discussed').length
  const allProcessed = currentItems.every(item => item.status !== 'pending')

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Agenda Items</h1>
        <p className={styles.subtitle}>
          {discussedCount} of {currentItems.length} topics discussed
        </p>
      </header>

      <div className={styles.items}>
        {currentItems.map((item) => {
          const card = getCard(item.cardId)
          if (!card) return null

          const isExpanded = expandedItem === item.id

          return (
            <div
              key={item.id}
              className={`${styles.item} ${styles[item.status]}`}
            >
              <div className={styles.itemHeader}>
                <div className={styles.itemContent}>
                  <h3 className={styles.itemTitle}>{card.title}</h3>
                  {card.description && (
                    <p className={styles.itemDescription}>{card.description}</p>
                  )}
                </div>

                <div className={styles.itemActions}>
                  {item.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleStatusChange(item.id, 'discussed')}
                        className={`${styles.actionButton} ${styles.discussButton}`}
                        aria-label="Mark as discussed"
                      >
                        <Check size={20} />
                      </button>
                      <button
                        onClick={() => handleStatusChange(item.id, 'skipped')}
                        className={`${styles.actionButton} ${styles.skipButton}`}
                        aria-label="Skip this item"
                      >
                        <X size={20} />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setExpandedItem(isExpanded ? null : item.id)}
                    className={`${styles.actionButton} ${styles.noteButton}`}
                    aria-label="Add notes"
                  >
                    <MessageSquare size={20} />
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className={styles.noteSection}>
                  <textarea
                    value={item.notes || ''}
                    onChange={(e) => handleAddNote(item.id, e.target.value)}
                    placeholder="Add notes about this topic..."
                    className={styles.textarea}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className={styles.actions}>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleContinue}
          disabled={!allProcessed}
        >
          Continue to Gratitude
        </Button>
        {!allProcessed && (
          <p className={styles.hint}>
            Process all items to continue
          </p>
        )}
      </div>
    </div>
  )
}