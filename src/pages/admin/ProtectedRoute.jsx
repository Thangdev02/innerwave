import { Navigate } from 'react-router-dom';
import authService from '../../services/authService';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getCurrentUser();

  // Debug log để xem tại sao bị redirect
  console.log('ProtectedRoute check:', {
    isAuthenticated,
    user: user ? `${user.email} (roles: ${user.roles?.join(',')})` : 'null',
    tokenExists: !!Cookies.get('token'),
  });

  if (!isAuthenticated) {
    console.log('Redirecting to /auth because not authenticated');
    return <Navigate to="/auth" replace />;
  }

  if (requireAdmin && !user?.roles?.includes('Admin')) {
    console.log('Redirecting to / because not admin');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;