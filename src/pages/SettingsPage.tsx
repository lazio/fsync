import { useState } from 'react'
import { Save, Users } from 'lucide-react'
import { useSettingsStore } from '@/stores/settingsStore'
import { Button } from '@/components/ui/button'
import styles from './SettingsPage.module.scss'

export function SettingsPage() {
  const { partner1Name, partner2Name, setPartner1Name, setPartner2Name } = useSettingsStore()
  const [name1, setName1] = useState(partner1Name)
  const [name2, setName2] = useState(partner2Name)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setPartner1Name(name1 || 'Partner 1')
    setPartner2Name(name2 || 'Partner 2')
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>Personalize your meeting experience</p>
      </header>

      <div className={styles.form}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <Users size={20} />
            Partner Names
          </h2>
          
          <div className={styles.field}>
            <label htmlFor="partner1" className={styles.label}>
              Partner 1 Name
            </label>
            <input
              id="partner1"
              type="text"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              placeholder="Enter first partner's name"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="partner2" className={styles.label}>
              Partner 2 Name
            </label>
            <input
              id="partner2"
              type="text"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              placeholder="Enter second partner's name"
              className={styles.input}
            />
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
          
          {saved && (
            <p className={styles.savedMessage}>Settings saved successfully!</p>
          )}
        </div>
      </div>
    </div>
  )
}