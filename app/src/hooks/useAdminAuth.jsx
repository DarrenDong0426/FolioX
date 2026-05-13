// Imports
import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

/**
 * AdminRoute
 *
 * Wrapper component that guards all protected admin routes.
 * Checks whether the current visitor has a valid admin session by calling
 * the backend. If yes, renders the nested admin route. If no, redirects to
 * the admin login page.
 */
const AdminRoute = () => {
  const [authed, setAuthed] = useState(null);   // null = checking, true = authed, false = not

  useEffect(() => {
    fetch('/api/admin/me', { credentials: 'include' })   // include cookies in the request
      .then(response => {
        if (response.ok) {
          setAuthed(true);                               // backend says session is valid
        } else {
          setAuthed(false);                              // 401 or anything else means no
        }
      })
      .catch(() => {
        setAuthed(false);                                // network error → treat as not authed
      });
  }, []);

  if (authed === null) return <div>Checking session...</div>;   // loading state while fetch is in flight
  if (authed === false) return <Navigate to="/Admin/Login" replace />;   // redirect to login

  return <Outlet />;   // authed — render the nested admin route
};

export default AdminRoute;