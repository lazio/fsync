import { useState } from 'react'
import { Save, Users, Clock, Trash2 } from 'lucide-react'
import { useCoupleStore } from '@/stores/coupleStore'
import { Button } from '@/components/ui/button'
import styles from './SettingsPage.module.scss'

export function SettingsPage() {
  const { couple, user, setCouple, setUser, reset } = useCoupleStore()
  const [coupleName, setCoupleName] = useState(couple?.name || '')
  const [userName, setUserName] = useState(user?.name || '')
  const [timezone, setTimezone] = useState(couple?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone)

  const handleSave = () => {
    const coupleId = couple?.id || `couple-${Date.now()}`
    const userId = user?.id || `user-${Date.now()}`

    setCouple({
      id: coupleId,
      name: coupleName || 'Our Family',
      createdAt: couple?.createdAt || new Date(),
      timezone,
    })

    setUser({
      id: userId,
      coupleId,
      name: userName || 'Partner 1',
    })
  }

  const handleReset = () => {
    if (confirm('This will clear all data including meeting history. Are you sure?')) {
      reset()
      localStorage.clear()
      window.location.reload()
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>Manage your couple profile</p>
      </header>

      <div className={styles.form}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Users size={20} />
            Couple Information
          </h2>
          
          <div className={styles.field}>
            <label htmlFor="coupleName" className={styles.label}>
              Couple Name
            </label>
            <input
              id="coupleName"
              type="text"
              value={coupleName}
              onChange={(e) => setCoupleName(e.target.value)}
              placeholder="e.g., The Smiths, John & Jane"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="userName" className={styles.label}>
              Your Name
            </label>
            <input
              id="userName"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your name"
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Clock size={20} />
            Preferences
          </h2>
          
          <div className={styles.field}>
            <label htmlFor="timezone" className={styles.label}>
              Timezone
            </label>
            <select
              id="timezone"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className={styles.select}
            >
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
              <option value="Europe/London">London</option>
              <option value="Europe/Paris">Paris</option>
              <option value="Asia/Tokyo">Tokyo</option>
              <option value="Australia/Sydney">Sydney</option>
            </select>
          </div>
        </div>

        <div className={styles.actions}>
          <Button
            variant="primary"
            fullWidth
            onClick={handleSave}
          >
            <Save size={20} />
            Save Settings
          </Button>
        </div>

        <div className={styles.danger}>
          <h2 className={styles.sectionTitle}>Danger Zone</h2>
          <Button
            variant="ghost"
            onClick={handleReset}
            className={styles.resetButton}
          >
            <Trash2 size={20} />
            Clear All Data
          </Button>
        </div>
      </div>
    </div>
  )
}