import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import HomePage from './pages/HomePage'
import Header from './layouts/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import JourneyTracker from './pages/JourneyTracker'
import BlogPage from './pages/BlogPage'
import BlogDetail from './pages/BlogDetail'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/journey-tracker" element={<JourneyTracker />} />
          <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
