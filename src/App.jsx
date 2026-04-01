import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Prebuilts from './pages/Prebuilts';
import Checkout from './pages/Checkout';
import { useStore } from './store/useStore';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  if (!isLoggedIn) return <Navigate to="/" replace />;
  return children;
};

const PublicRoute = ({ children }) => {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  if (isLoggedIn) return <Navigate to="/builder" replace />;
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/builder" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/prebuilts" element={<ProtectedRoute><Prebuilts /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
