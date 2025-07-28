import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import { IceBreaker } from '@/components/meeting/IceBreaker'
import { TopicOrder } from '@/components/meeting/TopicOrder'
import { Topic } from '@/components/meeting/Topic'
import { Summary } from '@/components/meeting/Summary'

export function MeetingPage() {
  return (
    <Routes>
      <Route path="ice-breaker" element={<IceBreaker />} />
      <Route path="topic-order" element={<TopicOrder />} />
      <Route path="topic/:topicId" element={<TopicRoute />} />
      <Route path="summary" element={<Summary />} />
      <Route path="*" element={<Navigate to="/meeting/ice-breaker" replace />} />
    </Routes>
  )
}

// Helper component to pass topicId as prop
function TopicRoute() {
  const { topicId } = useParams<{ topicId: string }>()
  return <Topic topicId={topicId || ''} />
}