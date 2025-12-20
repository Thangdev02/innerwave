import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import HomePage from './pages/HomePage'
import Header from './layouts/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import JourneyTracker from './pages/JourneyTracker'
import BlogPage from './pages/BlogPage'
import BlogDetail from './pages/BlogDetail'
import InnerSpace from './pages/InnerSpace'
import Footer from './layouts/Footer'
import About from './pages/About'
import ShopNow from './pages/ShopNow'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/journey-tracker" element={<JourneyTracker />} />
        <Route path="/inner-space" element={<InnerSpace />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<ShopNow />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App