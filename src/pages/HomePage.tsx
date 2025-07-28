import { useNavigate } from 'react-router-dom'
import { Heart, Calendar, TrendingUp } from 'lucide-react'
import { useMeetingStore } from '@/stores/meetingStore'
import { Button } from '@/components/ui/button'
import styles from './HomePage.module.scss'

export function HomePage() {
  const navigate = useNavigate()
  const { meetings, getStreak } = useMeetingStore()
  const streak = getStreak()

  const lastMeeting = meetings
    .filter(m => m.completedAt)
    .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime())[0]

  const daysSinceLastMeeting = lastMeeting
    ? Math.floor((Date.now() - new Date(lastMeeting.completedAt!).getTime()) / (1000 * 60 * 60 * 24))
    : null

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Weekly Parents Meeting</h1>
        <p className={styles.subtitle}>Connect, plan, and grow together</p>
      </header>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <TrendingUp className={styles.statIcon} />
          <div className={styles.statContent}>
            <span className={styles.statValue}>{streak}</span>
            <span className={styles.statLabel}>Week Streak</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <Calendar className={styles.statIcon} />
          <div className={styles.statContent}>
            <span className={styles.statValue}>{meetings.length}</span>
            <span className={styles.statLabel}>Total Meetings</span>
          </div>
        </div>
      </div>

      {daysSinceLastMeeting !== null && daysSinceLastMeeting >= 7 && (
        <div className={styles.reminder}>
          <p>It's been {daysSinceLastMeeting} days since your last meeting!</p>
        </div>
      )}

      <div className={styles.actions}>
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => navigate('/meeting/ice-breaker')}
          className={styles.startButton}
        >
          <Heart size={20} />
          Start Meeting
        </Button>
      </div>

      {meetings.length > 0 && (
        <section className={styles.recentSection}>
          <h2 className={styles.sectionTitle}>Recent Meetings</h2>
          <div className={styles.meetingList}>
            {meetings
              .filter(m => m.completedAt)
              .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime())
              .slice(0, 3)
              .map(meeting => (
                <div key={meeting.id} className={styles.meetingCard}>
                  <div className={styles.meetingDate}>
                    {new Date(meeting.completedAt!).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}
    </div>
  )
}