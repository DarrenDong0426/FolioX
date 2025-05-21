// Imports
import React from 'react';                  // Import React to enable creation of React components
import ReactDOM from 'react-dom/client';    // Import ReactDOM for rendering React components to the DOM
import App from './App';                    // Import the root App component
import './index.css';                       // Import global CSS (includes Tailwind for this project)

const root = ReactDOM.createRoot(           // Create a root React rendering target by selecting the HTML element with id "root"
    document.getElementById('root')
);

root.render(<App />);                       // Render the App component into the root DOM node
