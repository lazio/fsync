import { useNavigate } from 'react-router-dom'
import { CheckCircle, Home } from 'lucide-react'
import { useMeetingStore } from '@/stores/meetingStore'
import { useContentStore } from '@/stores/contentStore'
import { Button } from '@/components/ui/button'
import styles from './Summary.module.scss'

export function Summary() {
  const navigate = useNavigate()
  const { currentMeeting, currentItems, completeMeeting } = useMeetingStore()
  const { prompts, cards } = useContentStore()

  const handleComplete = () => {
    completeMeeting()
    navigate('/')
  }

  if (!currentMeeting) {
    return null
  }

  const prompt = prompts.find(p => p.id === currentMeeting.promptId)
  const discussedItems = currentItems.filter(item => item.status === 'discussed')
  const avgMood = currentMeeting.mood1 && currentMeeting.mood2
    ? Math.round((currentMeeting.mood1 + currentMeeting.mood2) / 2)
    : null

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.checkIcon}>
          <CheckCircle size={48} color="var(--teal)" />
        </div>
        <h1 className={styles.title}>Meeting Complete!</h1>
        <p className={styles.subtitle}>Great job connecting today</p>
      </header>

      <div className={styles.summary}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Ice Breaker</h2>
          <p className={styles.sectionContent}>
            {prompt?.text || 'No prompt selected'}
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Check-in</h2>
          <div className={styles.moodSummary}>
            <span>Average Mood: </span>
            <strong>{avgMood || 'N/A'}/10</strong>
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Topics Discussed</h2>
          <ul className={styles.topicsList}>
            {discussedItems.map(item => {
              const card = cards.find(c => c.id === item.cardId)
              return (
                <li key={item.id} className={styles.topic}>
                  <span className={styles.topicTitle}>{card?.title}</span>
                  {item.notes && (
                    <p className={styles.topicNotes}>{item.notes}</p>
                  )}
                </li>
              )
            })}
          </ul>
        </div>

        {(currentMeeting.gratitude1 || currentMeeting.gratitude2) && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Gratitude Shared</h2>
            <div className={styles.gratitudes}>
              {currentMeeting.gratitude1 && (
                <div className={styles.gratitudeItem}>
                  <strong>Partner 1:</strong>
                  <p>{currentMeeting.gratitude1}</p>
                </div>
              )}
              {currentMeeting.gratitude2 && (
                <div className={styles.gratitudeItem}>
                  <strong>Partner 2:</strong>
                  <p>{currentMeeting.gratitude2}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleComplete}
          className={styles.homeButton}
        >
          <Home size={20} />
          Back to Home
        </Button>
      </div>
    </div>
  )
}