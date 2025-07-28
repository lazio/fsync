import { useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { useMeetingStore } from '@/stores/meetingStore'
import { topics } from '@/data/topics'
import { Button } from '@/components/ui/button'
import styles from './TopicOrder.module.scss'

export function TopicOrder() {
  const navigate = useNavigate()
  const { currentMeeting } = useMeetingStore()
  
  if (!currentMeeting || !currentMeeting.topicOrder) {
    return null
  }
  
  const handleStart = () => {
    const firstTopicId = currentMeeting.topicOrder[0]
    navigate(`/meeting/topic/${firstTopicId}`)
  }
  
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Today's Topics</h1>
        <p className={styles.subtitle}>
          We'll go through all topics in this order
        </p>
      </header>
      
      <div className={styles.topicList}>
        {currentMeeting.topicOrder.map((topicId, index) => {
          const topic = topics.find(t => t.id === topicId)
          if (!topic) return null
          
          const isFixed = topic.isFixed
          const isFirst = index === 0
          const isLast = index === currentMeeting.topicOrder.length - 1
          
          return (
            <div
              key={topicId}
              className={`${styles.topicCard} ${isFixed ? styles.fixed : styles.shuffled}`}
            >
              <div className={styles.topicNumber}>{index + 1}</div>
              <div className={styles.topicContent}>
                <h3 className={styles.topicTitle}>{topic.title}</h3>
                <div className={styles.topicPoints}>
                  {topic.points.length} discussion points
                </div>
              </div>
              {isFirst && <span className={styles.badge}>First</span>}
              {isLast && <span className={styles.badge}>Last</span>}
            </div>
          )
        })}
      </div>
      
      <div className={styles.info}>
        <CheckCircle size={16} />
        <p>The middle topics were shuffled randomly!</p>
      </div>
      
      <div className={styles.actions}>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleStart}
        >
          Start with Check-in
          <ArrowRight size={20} />
        </Button>
      </div>
    </div>
  )
}