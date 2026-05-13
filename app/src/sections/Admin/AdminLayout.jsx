// Imports
import { Outlet, NavLink, useNavigate } from 'react-router-dom';

/**
 * AdminLayout
 *
 * Shell component for all protected admin pages. Renders a persistent
 * topbar with navigation links and a logout button, and uses <Outlet /> 
 * to render whichever nested admin route is currently active in the
 * content area.
 */
const AdminLayout = () => {
  const navigate = useNavigate();                                       // hook for programmatic navigation after logout

  const handleLogout = () => {                                          // handler for logout button click
    fetch('/api/admin/logout', {                                        // hit backend logout endpoint to clear server session
      method: 'POST',
      credentials: 'include',                                           // send cookies so backend knows which session to clear
    })
      .finally(() => {
        navigate('/Admin/Login', { replace: true });                    // redirect to login regardless of success (defensive)
      });
  };

  return (
    <div className="min-h-screen bg-neutral-50">                                                                                                  {/* shell — neutral background to differentiate from public site */}

      {/* Topbar: persistent header with brand, nav links, and logout */}
      <header className="flex items-center justify-between px-6 py-3 bg-neutral-900 text-white border-b-4 border-orange-500">                     {/* dark bar + orange stripe as a clear 'you are in admin mode' signal */}
        <span className="font-semibold tracking-wider">Admin</span>                                                                               {/* visual marker that this is the admin section */}
        <nav className="flex gap-4">
          <NavLink 
            to="/Admin" 
            end                                                                                                                                   // `end` prop ensures exact match (won't stay active on subroutes)
            className={({ isActive }) => isActive ? "text-white" : "text-neutral-400 hover:text-white"}                                           // NavLink passes isActive into a className function for conditional styling
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/Admin/Projects"
            className={({ isActive }) => isActive ? "text-white" : "text-neutral-400 hover:text-white"}
          >
            Projects
          </NavLink>
          <NavLink 
            to="/Admin/Documents"
            className={({ isActive }) => isActive ? "text-white" : "text-neutral-400 hover:text-white"}
          >
            Documents
          </NavLink>
          <NavLink 
            to="/Admin/Events"
            className={({ isActive }) => isActive ? "text-white" : "text-neutral-400 hover:text-white"}
          >
            Events
          </NavLink>
        </nav>
        <div className="flex items-center gap-4">
          <a 
            href="/" 
            target="_blank" 
            rel="noreferrer" 
            className="text-neutral-400 hover:text-white text-sm"
          >
            View site                                                                                                                              {/* opens public site in new tab for quick preview */}
          </a>
          <button 
            onClick={handleLogout}
            className="px-3 py-1 bg-neutral-700 hover:bg-neutral-600 rounded text-sm"
          >
            Log out
          </button>
        </div>
      </header>

      {/* Content area: whatever child route is active renders here */}
      <main className="p-6">
        <Outlet />
      </main>

    </div>
  );
};

export default AdminLayout;