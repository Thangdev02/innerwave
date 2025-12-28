import { Navigate } from 'react-router-dom';
import authService from '../../services/authService';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getCurrentUser();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (requireAdmin && !user?.roles?.includes('Admin')) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;