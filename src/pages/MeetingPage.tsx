import { Routes, Route, Navigate } from 'react-router-dom'
import { IceBreaker } from '@/components/meeting/IceBreaker'
import { CheckIn } from '@/components/meeting/CheckIn'
import { AgendaDraw } from '@/components/meeting/AgendaDraw'
import { AgendaWorkspace } from '@/components/meeting/AgendaWorkspace'
import { Gratitude } from '@/components/meeting/Gratitude'
import { Summary } from '@/components/meeting/Summary'

export function MeetingPage() {
  return (
    <Routes>
      <Route path="ice-breaker" element={<IceBreaker />} />
      <Route path="check-in" element={<CheckIn />} />
      <Route path="agenda-draw" element={<AgendaDraw />} />
      <Route path="agenda-workspace" element={<AgendaWorkspace />} />
      <Route path="gratitude" element={<Gratitude />} />
      <Route path="summary" element={<Summary />} />
      <Route path="*" element={<Navigate to="/meeting/ice-breaker" replace />} />
    </Routes>
  )
}