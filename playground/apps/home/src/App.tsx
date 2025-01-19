import { BrowserRouter } from 'react-router-dom'

import './App.css'
import Router from './router'

interface Props {
  hello?: string
}

function App({ hello }: Props) {
  console.log('hello:', hello)

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  )
}

export default App
