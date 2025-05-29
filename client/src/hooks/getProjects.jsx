// Imports
import { useState, useEffect } from 'react';                                      // Imports useState from React

/**
 * Projects hook
 * 
 * Fetches project data from the backend API and returns the list.
 */
const getProjects = () => {
    const [projects, setProjects] = useState([]);                                 // list of projects with useState hook
    const [loading, setLoading] = useState(true);                                 // loading flag with useState hook initialized to true
    const [error, setError] = useState(null);                                     // error flag with useState hook
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(null);
    const [pages, setPages] = useState([])

    useEffect(() => {                                                             // useEffect to call api projects
      fetch(`http://localhost:9000/api/projects/?page=${currentPage}`)
        .then(response => {
          if (!response.ok) throw new Error('Network response was not ok');       // Throw error if response unsuccessful             
          return response.json();                                                 // Return json response on success
        })
        .then(data => {
          if (totalPage == null){
            setTotalPage(Math.ceil(data.totalItems / 5));
          }
          setProjects(data.projects);                                             // set the projects as the json response 
          setLoading(false);                                                      // set loading to false
          window.scrollTo({ top: 0, behavior: 'smooth' });                        // Force to top of window on render
        })
        .catch(err => {                                                           // Error handling
          console.error('Error fetching projects:', err);   
          setError(err);                                                          // set error flag
          setLoading(false);                                                      // set loading to false
        });
    }, [currentPage]);                                                            // useEffect renders once per page
  
    return { projects, loading, error, currentPage, setCurrentPage, totalPage };  // Return projects, loading, and error state
  };
  
  export default getProjects;
