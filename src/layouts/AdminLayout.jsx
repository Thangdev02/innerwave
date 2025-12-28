import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import authService from '../services/authService';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/auth');
  };

  const menuItems = [
    { path: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/admin/posts', icon: '📝', label: 'Posts Management' },
    { path: '/admin/users', icon: '👥', label: 'Users Management' },
    { path: '/admin/orders', icon: '🛒', label: 'Orders Management' },
    { path: '/admin/chat', icon: '💬', label: 'Chat Dashboard' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        className={`fixed left-0 top-0 h-full bg-gradient-to-b from-[#449C65] to-[#5cd9aa] text-white w-64 shadow-2xl z-50 ${
          sidebarOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="text-xl font-bold">InnerWave</h2>
              <p className="text-xs text-white/80">Admin Panel</p>
            </div>
          </div>

          {/* User Info */}
          <div className="bg-white/10 rounded-2xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
                {user?.firstName?.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-sm">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-white/70">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive(item.path)
                    ? 'bg-white text-[#449C65] shadow-lg'
                    : 'hover:bg-white/10'
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full mt-8 flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 transition-all"
          >
            <span className="text-2xl">🚪</span>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
        {/* Top Bar */}
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="flex items-center gap-4">
              <Link to="/" className="text-sm text-gray-600 hover:text-[#5cd9aa] transition">
                View Site
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;