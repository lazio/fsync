import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useMeetingStore } from '@/stores/meetingStore'
import styles from './CheckIn.module.scss'

export function CheckIn() {
  const navigate = useNavigate()
  const { currentMeeting, updateMeeting } = useMeetingStore()
  const [mood1, setMood1] = useState(5)
  const [mood2, setMood2] = useState(5)
  const [notes1, setNotes1] = useState('')
  const [notes2, setNotes2] = useState('')

  const handleContinue = () => {
    if (currentMeeting) {
      updateMeeting(currentMeeting.id, {
        mood1,
        mood2,
        notes1,
        notes2,
      })
    }
    navigate('/meeting/agenda-draw')
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Check-in</h1>
        <p className={styles.subtitle}>How are you feeling today?</p>
      </header>

      <div className={styles.partners}>
        <div className={styles.partner}>
          <h3 className={styles.partnerTitle}>Partner 1</h3>
          
          <div className={styles.moodSection}>
            <label className={styles.label}>Mood (1-10)</label>
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

          <div className={styles.notesSection}>
            <label className={styles.label}>Notes (optional)</label>
            <textarea
              value={notes1}
              onChange={(e) => setNotes1(e.target.value)}
              placeholder="How are you feeling? What's on your mind?"
              className={styles.textarea}
            />
          </div>
        </div>

        <div className={styles.partner}>
          <h3 className={styles.partnerTitle}>Partner 2</h3>
          
          <div className={styles.moodSection}>
            <label className={styles.label}>Mood (1-10)</label>
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

          <div className={styles.notesSection}>
            <label className={styles.label}>Notes (optional)</label>
            <textarea
              value={notes2}
              onChange={(e) => setNotes2(e.target.value)}
              placeholder="How are you feeling? What's on your mind?"
              className={styles.textarea}
            />
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleContinue}
        >
          Continue to Agenda
        </Button>
      </div>
    </div>
  )
}