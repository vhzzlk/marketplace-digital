import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import OrdersPage from './pages/OrdersPage';
import SellerDashboard from './pages/SellerDashboard';
import ConsumerDashboard from './pages/ConsumerDashboard';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/seller-dashboard" element={<SellerDashboard />} />
          <Route path="/consumer-dashboard" element={<ConsumerDashboard />} />
        </Routes>
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(0, 0, 0, 0.9)',
              color: '#fff',
              border: '1px solid rgba(0, 212, 255, 0.3)',
            },
          }}
        />
      </div>
    </Router>
  );
};

export default App;