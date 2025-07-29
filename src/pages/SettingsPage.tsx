import { useState } from 'react'
import { Save, Users, CheckSquare, Square, Shuffle } from 'lucide-react'
import { useSettingsStore } from '@/stores/settingsStore'
import { topics } from '@/data/topics'
import { Button } from '@/components/ui/button'
import styles from './SettingsPage.module.scss'

export function SettingsPage() {
  const { 
    partner1Name, 
    partner2Name, 
    selectedTopics,
    shuffleTopics,
    setPartner1Name, 
    setPartner2Name,
    toggleTopic,
    setShuffleTopics
  } = useSettingsStore()
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
        
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <CheckSquare size={20} />
            Meeting Topics
          </h2>
          <p className={styles.sectionDescription}>
            Select which topics to include in your meetings (minimum 1 required)
          </p>
          <div className={styles.topicGrid}>
            {topics
              .filter(topic => !topic.isFixed)
              .map(topic => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => toggleTopic(topic.id)}
                  className={`${styles.topicItem} ${selectedTopics.includes(topic.id) ? styles.selected : ''}`}
                  disabled={selectedTopics.length === 1 && selectedTopics.includes(topic.id)}
                >
                  <div className={styles.topicCheck}>
                    {selectedTopics.includes(topic.id) ? (
                      <CheckSquare size={20} />
                    ) : (
                      <Square size={20} />
                    )}
                  </div>
                  <div className={styles.topicContent}>
                    <h3 className={styles.topicTitle}>{topic.title}</h3>
                    <p className={styles.topicDescription}>{topic.description}</p>
                  </div>
                </button>
              ))}
          </div>
          
          <div className={styles.shuffleToggle}>
            <button
              type="button"
              onClick={() => setShuffleTopics(!shuffleTopics)}
              className={styles.toggleButton}
            >
              <div className={styles.toggleIcon}>
                <Shuffle size={20} />
              </div>
              <div className={styles.toggleContent}>
                <h3 className={styles.toggleTitle}>Shuffle Topics</h3>
                <p className={styles.toggleDescription}>
                  {shuffleTopics 
                    ? 'Topics will appear in random order each meeting' 
                    : 'Topics will appear in the same order each meeting'}
                </p>
              </div>
              <div className={styles.toggleSwitch}>
                <div className={`${styles.switch} ${shuffleTopics ? styles.active : ''}`}>
                  <div className={styles.switchHandle} />
                </div>
              </div>
            </button>
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