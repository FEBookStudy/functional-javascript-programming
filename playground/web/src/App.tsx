import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import Router from './router'

function App() {
  return (
    <React.Suspense fallback={null}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </React.Suspense>
  )
}

export default App
