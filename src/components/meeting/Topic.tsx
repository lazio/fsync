import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckSquare, Square } from 'lucide-react'
import { useMeetingStore } from '@/stores/meetingStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { topics } from '@/data/topics'
import { Button } from '@/components/ui/button'
import type { TopicResponse } from '@/types'
import styles from './Topic.module.scss'

interface TopicProps {
  topicId: string
}

export function Topic({ topicId }: TopicProps) {
  const navigate = useNavigate()
  const { 
    currentMeeting, 
    addTopicResponse, 
    updateTopicResponse,
    getCurrentTopicResponse,
    advanceToNextTopic,
    completeMeeting 
  } = useMeetingStore()
  const { partner1Name, partner2Name } = useSettingsStore()
  
  const topic = topics.find(t => t.id === topicId)
  const existingResponse = getCurrentTopicResponse(topicId)
  
  const [notes, setNotes] = useState(existingResponse?.notes || '')
  const [checkedPoints, setCheckedPoints] = useState<string[]>(
    existingResponse?.checkedPoints || []
  )
  
  // Check-in specific state
  const [mood1, setMood1] = useState(existingResponse?.mood1 || 5)
  const [mood2, setMood2] = useState(existingResponse?.mood2 || 5)
  const [checkInNotes1, setCheckInNotes1] = useState(existingResponse?.checkInNotes1 || '')
  const [checkInNotes2, setCheckInNotes2] = useState(existingResponse?.checkInNotes2 || '')
  
  // Wrap-up specific state
  const [keyTakeaways, setKeyTakeaways] = useState(existingResponse?.keyTakeaways?.join('\n') || '')
  const [gratitude1, setGratitude1] = useState(existingResponse?.gratitude1 || '')
  const [gratitude2, setGratitude2] = useState(existingResponse?.gratitude2 || '')
  
  if (!topic || !currentMeeting) return null
  
  const togglePoint = (pointId: string) => {
    setCheckedPoints(prev => 
      prev.includes(pointId) 
        ? prev.filter(id => id !== pointId)
        : [...prev, pointId]
    )
  }
  
  const handleContinue = () => {
    const response: TopicResponse = {
      id: existingResponse?.id || `response-${Date.now()}`,
      meetingId: currentMeeting.id,
      topicId,
      notes,
      checkedPoints
    }
    
    // Add topic-specific data
    if (topicId === 'check-in') {
      response.mood1 = mood1
      response.mood2 = mood2
      response.checkInNotes1 = checkInNotes1
      response.checkInNotes2 = checkInNotes2
    } else if (topicId === 'wrap-up') {
      response.keyTakeaways = keyTakeaways.split('\n').filter(t => t.trim())
      response.gratitude1 = gratitude1
      response.gratitude2 = gratitude2
    }
    
    if (existingResponse) {
      updateTopicResponse(existingResponse.id, response)
    } else {
      addTopicResponse(response)
    }
    
    // Navigate to next topic or complete
    if (currentMeeting.currentTopicIndex !== undefined && 
        currentMeeting.currentTopicIndex < currentMeeting.topicOrder.length - 1) {
      advanceToNextTopic()
      const nextTopicId = currentMeeting.topicOrder[currentMeeting.currentTopicIndex + 1]
      navigate(`/meeting/topic/${nextTopicId}`)
    } else {
      completeMeeting()
      navigate('/meeting/summary')
    }
  }
  
  const currentIndex = currentMeeting.currentTopicIndex || 0
  const totalTopics = currentMeeting.topicOrder.length
  
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.progress}>
          Topic {currentIndex + 1} of {totalTopics}
        </div>
        <h1 className={styles.title}>{topic.title}</h1>
      </header>
      
      <div className={styles.content}>
        {topicId === 'check-in' ? (
          <div className={styles.checkInContent}>
            <div className={styles.partner}>
              <h3>{partner1Name}</h3>
              <div className={styles.moodSection}>
                <label>Mood (1-10)</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={mood1}
                  onChange={(e) => setMood1(Number(e.target.value))}
                  className={styles.slider}
                />
                <span className={styles.moodValue}>{mood1}</span>
              </div>
              <textarea
                value={checkInNotes1}
                onChange={(e) => setCheckInNotes1(e.target.value)}
                placeholder="How are you feeling?"
                className={styles.textarea}
              />
            </div>
            
            <div className={styles.partner}>
              <h3>{partner2Name}</h3>
              <div className={styles.moodSection}>
                <label>Mood (1-10)</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={mood2}
                  onChange={(e) => setMood2(Number(e.target.value))}
                  className={styles.slider}
                />
                <span className={styles.moodValue}>{mood2}</span>
              </div>
              <textarea
                value={checkInNotes2}
                onChange={(e) => setCheckInNotes2(e.target.value)}
                placeholder="How are you feeling?"
                className={styles.textarea}
              />
            </div>
          </div>
        ) : topicId === 'wrap-up' ? (
          <div className={styles.wrapUpContent}>
            <div className={styles.section}>
              <h3>Key Takeaways</h3>
              <textarea
                value={keyTakeaways}
                onChange={(e) => setKeyTakeaways(e.target.value)}
                placeholder="Enter key actions for the week (one per line)"
                className={styles.textarea}
                rows={4}
              />
            </div>
            
            <div className={styles.gratitudeSection}>
              <h3>Gratitude & Support</h3>
              <div className={styles.gratitudeItem}>
                <label>{partner1Name} → {partner2Name}</label>
                <textarea
                  value={gratitude1}
                  onChange={(e) => setGratitude1(e.target.value)}
                  placeholder="What do you appreciate?"
                  className={styles.textarea}
                />
              </div>
              <div className={styles.gratitudeItem}>
                <label>{partner2Name} → {partner1Name}</label>
                <textarea
                  value={gratitude2}
                  onChange={(e) => setGratitude2(e.target.value)}
                  placeholder="What do you appreciate?"
                  className={styles.textarea}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.points}>
              {topic.points.map(point => (
                <button
                  key={point.id}
                  className={styles.pointItem}
                  onClick={() => togglePoint(point.id)}
                >
                  {checkedPoints.includes(point.id) ? (
                    <CheckSquare size={20} className={styles.checkIcon} />
                  ) : (
                    <Square size={20} className={styles.checkIcon} />
                  )}
                  <span>{point.text}</span>
                </button>
              ))}
            </div>
            
            <div className={styles.notesSection}>
              <label>Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any notes or decisions..."
                className={styles.textarea}
              />
            </div>
          </>
        )}
      </div>
      
      <div className={styles.actions}>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}