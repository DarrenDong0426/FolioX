import { useState, useEffect } from 'react';                                   // Imports useState from React

/**
 * Projects hook
 * 
 * Fetches project data from the backend API and returns the list.
 */
const getProjects = () => {
    const [projects, setProjects] = useState([]);                               // list of projects with useState hook
    const [loading, setLoading] = useState(true);                               // loading flag with useState hook initialized to true
    const [error, setError] = useState(null);                                   // error flag with useState hook
  
    useEffect(() => {                                                           // useEffect to call api projects
      fetch('http://localhost:9000/api/projects')
        .then(response => {
          if (!response.ok) throw new Error('Network response was not ok');     // Throw error if response unsuccessful             
          return response.json();                                               // Return json response on success
        })
        .then(data => {
          setProjects(data.projects);                                           // set the projects as the json response 
          setLoading(false);                                                    // set loading to false
        })
        .catch(err => {                                                         // Error handling
          console.error('Error fetching projects:', err);   
          setError(err);                                                        // set error flag
          setLoading(false);                                                    // set loading to false
        });
    }, []);                                                                     // useEffect renders once per page
  
    return { projects, loading, error };                                        // Return projects, loading, and error state
  };
  
  export default getProjects;
