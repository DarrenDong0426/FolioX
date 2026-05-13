import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const [status, setStatus] = useState('loading'); // 'loading', 'authorized', 'unauthorized'

  useEffect(() => {
    fetch('/api/admin/me', { credentials: 'include' })
      .then(res => {
        if (res.ok) setStatus('authorized');
        else setStatus('unauthorized');
      })
      .catch(() => setStatus('unauthorized'));
  }, []);

  if (status === 'loading') {
    // Show a blank screen or a spinner while checking the cookie
    return <div className="min-h-screen bg-[#111]" />; 
  }

  // If authorized, render the child (Outlet). Otherwise, go to login.
  return status === 'authorized' ? <Outlet /> : <Navigate to="/Admin/Login" replace />;
};

export default AdminRoute;