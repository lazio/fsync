import type { ReactNode } from 'react'
import { BottomNav } from './BottomNav'
import styles from './Layout.module.scss'

interface LayoutProps {
  children: ReactNode
  showNav?: boolean
}

export function Layout({ children, showNav = true }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <main className={styles.main}>{children}</main>
      {showNav && <BottomNav />}
    </div>
  )
}