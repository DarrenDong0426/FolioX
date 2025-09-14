// Imports
import React from 'react';                        // Import React to enable creation of React components                          
import { 
  BrowserRouter, Routes, Route                    // Import React Router components for client-side routing
} from 'react-router-dom';
import Home from './pages/Home';                  // Import custom "Home" component from ./pages/Home
import Projects from './pages/Projects';          // Import custom "Projects" component from ./pages/Projects
import Documents from './pages/Documents';        // Import custom "Documents" component from ./pages/Documents
import Timeline from './pages/Timeline';          // Import custom "Timeline" component from ./pages/Timeline

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
    <BrowserRouter>                                           {/* Enables browser history API for routing and navigation */}         
      <Routes>                                                {/* Container for all Route components */} 
        <Route path="/" element={<Home />} />                 {/* Maps the root path "/" to render the Home component */}
        <Route path="/Projects" element={<Projects />} />     {/* Maps the path "/Projects" to render the Projects component */}
        <Route path="/Documents" element={<Documents />} />   {/* Maps the path "/Documents" to render the Documents component */}
        <Route path="/Timeline" element={<Timeline/>}/>       {/* Maps the path "/Timeline" to render the Timeline component */}
      </Routes>
    </BrowserRouter>
  );
}
