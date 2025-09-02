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
    const [currentPage, setCurrentPage] = useState(1);                            // currentPage for pagination with useState hook    
    const [totalPage, setTotalPage] = useState(null);                             // totalPage for pagination with useState hook
    const [query, setQuery] = useState("")                                        // query for search bar with useState hook
    const options = ["Most Recent", "Least Recent", "A-Z", "Z-A"]                 // Option list of dropdown menu
    const [isOpen, setIsOpen] = useState(false)                                   // dropdown open flag initialized to false
    const [dropDown, setDropDown] = useState("Most Recent")                       // dropDown value initialized to "Most Recent"
    const [filters, setFilters] = useState({category: []});                       // filters state for categories with useState hook initialized to empty array
    const [filterOpen, setFilterOpen] = useState(false);                          // filter open flag initialized to false

    useEffect(() => {                                                             // useEffect to call api projects
      fetch(`http://localhost:9000/api/projects/?page=${currentPage}&query=${query}&dropDown=${dropDown}&filters=${filters.category.join(",")}`)
        .then(response => {
          if (!response.ok) throw new Error('Network response was not ok');       // Throw error if response unsuccessful             
          return response.json();                                                 // Return json response on success
        })
        .then(data => {
          setTotalPage(Math.ceil(data.totalItems / 5));
          setProjects(data.projects);                                             // set the projects as the json response 
          setLoading(false);                                                      // set loading to false
          window.scrollTo({ top: 0, behavior: 'smooth' });                        // Force to top of window on render
        })
        .catch(err => {                                                           // Error handling
          console.error('Error fetching projects:', err);   
          setError(err);                                                          // set error flag
          setLoading(false);                                                      // set loading to false
        });
    }, [currentPage, query, dropDown, filters]);                                  // useEffect renders whenevers page, search query, dropdown, or filters setting changes
  
    return { projects, loading, error, currentPage, setCurrentPage, totalPage, query, setQuery, options, dropDown, setDropDown, isOpen, setIsOpen, filters, setFilters, filterOpen, setFilterOpen };  // Return projects, loading, and error state
  };
  
  export default getProjects;
