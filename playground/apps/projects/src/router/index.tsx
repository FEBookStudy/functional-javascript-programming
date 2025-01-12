import { Routes, Route } from 'react-router-dom'
import { EntrancePage, DashboardPage } from '@/pages'

function Router() {
  return (
    <Routes>
      <Route index element={<EntrancePage />} />
      <Route path="/dashboard/*" element={<DashboardPage />} />
      <Route path="*" element={<>Other...</>} />
    </Routes>
  )
}

export default Router
