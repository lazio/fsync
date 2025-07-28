import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { HomePage } from '@/pages/HomePage'
import { MeetingPage } from '@/pages/MeetingPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/meeting/*" element={<Layout showNav={false}><MeetingPage /></Layout>} />
      </Routes>
    </Router>
  )
}

export default App