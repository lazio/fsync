import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useContentStore } from '@/stores/contentStore'
import { Button } from '@/components/ui/button'
import styles from './LibraryPage.module.scss'

export function LibraryPage() {
  const [activeTab, setActiveTab] = useState<'prompts' | 'cards'>('prompts')
  const { prompts, cards } = useContentStore()

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Content Library</h1>
        <p className={styles.subtitle}>Customize your meeting content</p>
      </header>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'prompts' ? styles.active : ''}`}
          onClick={() => setActiveTab('prompts')}
        >
          Ice Breakers ({prompts.length})
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'cards' ? styles.active : ''}`}
          onClick={() => setActiveTab('cards')}
        >
          Agenda Cards ({cards.length})
        </button>
      </div>

      <div className={styles.content}>
        <Button variant="primary" className={styles.addButton}>
          <Plus size={20} />
          Add {activeTab === 'prompts' ? 'Prompt' : 'Card'}
        </Button>

        <div className={styles.list}>
          {activeTab === 'prompts' ? (
            prompts.map(prompt => (
              <div key={prompt.id} className={styles.item}>
                <div className={styles.itemContent}>
                  <p className={styles.itemText}>{prompt.text}</p>
                  {prompt.category && (
                    <span className={styles.category}>{prompt.category}</span>
                  )}
                </div>
                <div className={styles.itemActions}>
                  {prompt.isDefault && <span className={styles.badge}>Default</span>}
                  <input
                    type="checkbox"
                    checked={prompt.isActive}
                    onChange={() => {}}
                    className={styles.checkbox}
                  />
                </div>
              </div>
            ))
          ) : (
            cards.map(card => (
              <div key={card.id} className={styles.item}>
                <div className={styles.itemContent}>
                  <h3 className={styles.itemTitle}>{card.title}</h3>
                  {card.description && (
                    <p className={styles.itemDescription}>{card.description}</p>
                  )}
                  {card.category && (
                    <span className={styles.category}>{card.category}</span>
                  )}
                </div>
                <div className={styles.itemActions}>
                  {card.isDefault && <span className={styles.badge}>Default</span>}
                  <input
                    type="checkbox"
                    checked={card.isActive}
                    onChange={() => {}}
                    className={styles.checkbox}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}