import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'
import { MeetingPage } from '@/pages/MeetingPage'
import { SettingsPage } from '@/pages/SettingsPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/meeting/*" element={<Layout showNav={false}><MeetingPage /></Layout>} />
        <Route path="/settings" element={<Layout><SettingsPage /></Layout>} />
      </Routes>
    </Router>
  )
}

export default App