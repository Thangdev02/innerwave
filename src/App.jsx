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
import AuthPage from './pages/AuthPage'
import ProtectedRoute from './pages/admin/ProtectedRoute'
import AdminLayout from './layouts/AdminLayout'
import PostManagement from './pages/admin/PostManagement'
import UserManagement from './pages/admin/UserManagement'
import OrderManagement from './pages/admin/OrderManagement'
import Dashboard from './pages/admin/Dashboard'
import AdminChat from './pages/admin/AdminChat'

function App() {
  return (
    <BrowserRouter>
        <Header/>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/journey-tracker" element={<JourneyTracker />} />
        <Route path="/inner-space" element={<InnerSpace />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<ShopNow />} />
        <Route path="/blog/:id" element={<BlogDetail />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="posts" element={<PostManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="chat" element={<AdminChat />} />
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;