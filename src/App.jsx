import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import HomePage from './pages/HomePage'
import Header from './layouts/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
      <HomePage />
    </>
  )
}

export default App
