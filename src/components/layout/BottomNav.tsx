import { Home, Heart, Settings } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import styles from './BottomNav.module.scss'

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/meeting', icon: Heart, label: 'Meeting' },
  { path: '/settings', icon: Settings, label: 'Settings' },
]

export function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav className={styles.nav}>
      <div className={styles.navContent}>
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path || 
            (path === '/meeting' && location.pathname.startsWith('/meeting'))
          
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={cn(styles.navItem, isActive && styles.active)}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={24} />
              <span className={styles.label}>{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}