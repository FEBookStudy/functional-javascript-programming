import { useRoutes } from 'react-router-dom'

import { publicRoutes } from './routes/public'

function Router() {
  const routes = useRoutes([publicRoutes])

  return routes
}

export default Router
