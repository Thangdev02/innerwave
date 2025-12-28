import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Header from './layouts/Header'
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

// Layout cho public pages
function PublicLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes với Header & Footer */}
        <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
        <Route path="/journey-tracker" element={<PublicLayout><JourneyTracker /></PublicLayout>} />
        <Route path="/inner-space" element={<PublicLayout><InnerSpace /></PublicLayout>} />
        <Route path="/blog" element={<PublicLayout><BlogPage /></PublicLayout>} />
        <Route path="/blog/:id" element={<PublicLayout><BlogDetail /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/shop" element={<PublicLayout><ShopNow /></PublicLayout>} />
        
        {/* Auth page - không có Header & Footer */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Admin Routes - có layout riêng trong AdminLayout */}
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
    </BrowserRouter>
  );
}

export default App;