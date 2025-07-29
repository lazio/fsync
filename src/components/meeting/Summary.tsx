import { useNavigate } from 'react-router-dom'
import { CheckCircle, Home } from 'lucide-react'
import { useMeetingStore } from '@/stores/meetingStore'
import { useContentStore } from '@/stores/contentStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { topics } from '@/data/topics'
import { Button } from '@/components/ui/button'
import styles from './Summary.module.scss'

export function Summary() {
  const navigate = useNavigate()
  const { meetings, topicResponses } = useMeetingStore()
  const { prompts } = useContentStore()
  const { partner1Name, partner2Name } = useSettingsStore()
  
  // Get the most recent completed meeting
  const lastMeeting = meetings
    .filter(m => m.completedAt)
    .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime())[0]
  
  if (!lastMeeting) {
    return null
  }
  
  const meetingResponses = topicResponses.filter(r => r.meetingId === lastMeeting.id)
  const prompt = prompts.find(p => p.id === lastMeeting.promptId)
  
  const handleBackHome = () => {
    navigate('/')
  }
  
  // Get check-in response for mood
  const checkInResponse = meetingResponses.find(r => r.topicId === 'check-in')
  const avgMood = checkInResponse?.mood1 && checkInResponse?.mood2
    ? Math.round((checkInResponse.mood1 + checkInResponse.mood2) / 2)
    : null
  
  // Get wrap-up response for takeaways and gratitude
  const wrapUpResponse = meetingResponses.find(r => r.topicId === 'wrap-up')
  
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
        {prompt && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Ice Breaker</h2>
            <p className={styles.sectionContent}>{prompt.text}</p>
          </div>
        )}
        
        {avgMood && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Check-in</h2>
            <div className={styles.moodSummary}>
              <span>Average Mood: </span>
              <strong>{avgMood}/10</strong>
            </div>
          </div>
        )}
        
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Topics Covered</h2>
          <ul className={styles.topicsList}>
            {lastMeeting.topicOrder.map(topicId => {
              const topic = topics.find(t => t.id === topicId)
              const response = meetingResponses.find(r => r.topicId === topicId)
              if (!topic) return null
              
              return (
                <li key={topicId} className={styles.topic}>
                  <span className={styles.topicTitle}>{topic.title}</span>
                  {response?.notes && (
                    <span className={styles.pointsCount}>
                      Notes added
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
        
        {wrapUpResponse?.keyTakeaways && wrapUpResponse.keyTakeaways.length > 0 && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Key Takeaways</h2>
            <ul className={styles.takeaways}>
              {wrapUpResponse.keyTakeaways.map((takeaway, index) => (
                <li key={index}>{takeaway}</li>
              ))}
            </ul>
          </div>
        )}
        
        {(wrapUpResponse?.gratitude1 || wrapUpResponse?.gratitude2) && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Gratitude Shared</h2>
            <div className={styles.gratitudes}>
              {wrapUpResponse.gratitude1 && (
                <div className={styles.gratitudeItem}>
                  <strong>{partner1Name}:</strong>
                  <p>{wrapUpResponse.gratitude1}</p>
                </div>
              )}
              {wrapUpResponse.gratitude2 && (
                <div className={styles.gratitudeItem}>
                  <strong>{partner2Name}:</strong>
                  <p>{wrapUpResponse.gratitude2}</p>
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
          onClick={handleBackHome}
          className={styles.homeButton}
        >
          <Home size={20} />
          Back to Home
        </Button>
      </div>
    </div>
  )
}