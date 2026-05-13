// Imports
import { ThemeProvider } from './hooks/themeContext';                   
import { 
  BrowserRouter, Routes, Route                    // Import React Router components for client-side routing
} from 'react-router-dom';
import Home from './pages/Home';                  // Import custom "Home" component from ./pages/Home
import Projects from './pages/Projects';          // Import custom "Projects" component from ./pages/Projects
import Documents from './pages/Documents';        // Import custom "Documents" component from ./pages/Documents
import Timeline from './pages/Timeline';          // Import custom "Timeline" component from ./pages/Timeline
import FaQs from './pages/FaQs';
import Changelog from './pages/Changelog';

// Admin imports
import Admin from './pages/Admin';                                          // Import custom "Admin" dashboard component from ./pages/Admin
import Login from './sections/Admin/Login';                                 // Import "Login" component for admin magic-link login
import Logout from './sections/Admin/Logout';                               // Import "Logout" component for admin logout
import AdminRoute from './sections/Admin/AdminRoute';                       // Import "AdminRoute" auth wrapper that protects admin pages
import AdminLayout from './sections/Admin/AdminLayout';                     // Import "AdminLayout" shell with topbar/sidebar for admin pages
import AdminProjects from './sections/Admin/projects/Projects';             // Import admin "Projects" list component
import NewProject from './sections/Admin/projects/NewProject';              // Import admin "NewProject" form component
import EditProject from './sections/Admin/projects/EditProject';            // Import admin "EditProject" form component
import AdminDocuments from './sections/Admin/documents/Documents';
import NewDocument from './sections/Admin/documents/NewDocument';
import EditDocument from './sections/Admin/documents/EditDocument';
import AdminEvents from './sections/Admin/events/Events';
import NewEvent from './sections/Admin/events/NewEvent';
import EditEvent from './sections/Admin/events/EditEvent';

/* Defines the App component
 *
 * Sets up all routing paths so that the correct component is rendered based on the URL path.
 * This component is rendered by index.jsx, which mounts it at the React root element in the DOM.
 * 
 * Note: React routing differs from Flask routing in that React routes client-side, 
 * while Flask routes server-side. React handles page navigation without full reloads,
 * while Flask handles API requests and responses.
 * 
 */
export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>                                           {/* Enables browser history API for routing and navigation */}         
        <Routes>                                                {/* Container for all Route components */} 
          <Route path="/" element={<Home />} />                 {/* Maps the root path "/" to render the Home component */}
          <Route path="/Projects" element={<Projects />} />     {/* Maps the path "/Projects" to render the Projects component */}
          <Route path="/Documents" element={<Documents />} />   {/* Maps the path "/Documents" to render the Documents component */}
          <Route path="/Timeline" element={<Timeline/>}/>       {/* Maps the path "/Timeline" to render the Timeline component */}
          <Route path="/FaQs" element={<FaQs/>}/>       {/* Maps the path "/Timeline" to render the Timeline component */}
          <Route path="/Changelog" element={<Changelog/>}/>       {/* Maps the path "/Timeline" to render the Timeline component */}

          {/* Admin auth routes — public, no auth wrapper since user is logging in */}
          <Route path="/Admin/Login" element={<Login />} />       {/* Maps the path "/Admin/Login" to render the Login component */}
          <Route path="/Admin/Logout" element={<Logout />} />     {/* Maps the path "/Admin/Logout" to render the Logout component */}

          {/* Admin protected routes — wrapped in AdminRoute (auth gate) and AdminLayout (shell) */}
          <Route element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/Admin" element={<Admin />} />
              
              <Route path="/Admin/Projects" element={<AdminProjects />} />
              <Route path="/Admin/Projects/New" element={<NewProject />} />
              <Route path="/Admin/Projects/:id/Edit" element={<EditProject />} />
              
              <Route path="/Admin/Documents" element={<AdminDocuments />} />
              <Route path="/Admin/Documents/New" element={<NewDocument />} />
              <Route path="/Admin/Documents/:id/Edit" element={<EditDocument />} />
              
              <Route path="/Admin/Events" element={<AdminEvents />} />
              <Route path="/Admin/Events/New" element={<NewEvent />} />
              <Route path="/Admin/Events/:id/Edit" element={<EditEvent />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}