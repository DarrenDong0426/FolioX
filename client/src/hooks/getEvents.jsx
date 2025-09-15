// Imports
import { useState, useEffect } from 'react';                                      // Imports useState from React

/* *
 * Event hook
 * 
 * Fetches event data from the backend API and returns the list.
 */
const getEvents = () => {

    const [events, setEvents] = useState([]);                                     // document state to hold list of documents 
    const [year, setYear] = useState(new Date().getFullYear());                             
    const [filters, setFilters] = useState({category: []});                       // filters state for categories with useState hook initialized to empty array
    const [filterOpen, setFilterOpen] = useState(false);                          // filter open flag initialized to false


    const [loading, setLoading] = useState(true);                                 // loading flag with useState hook initialized to true
    const [error, setError] = useState(null);                                     // error flag with useState hook

    useEffect(() => {                                                             // useEffect to call api projects
      fetch(`http://localhost:9000/api/events`)
        .then(response => {
          if (!response.ok) throw new Error('Network response was not ok');       // Throw error if response unsuccessful             
          return response.json();                                                 // Return json response on success
        })
        .then(data => {
            setEvents(data.events)                                          // Set the document to list of fetched items
            setLoading(false)                                                     // Set loading flag to false
        })
        .catch(err => {                                                           // Error handling
          console.error('Error fetching projects:', err);   
          setError(err);                                                          // set error flag
          setLoading(false);                                                      // set loading to false
        });
    }, []);                                                                       // useEffect renders once on load
    return { events, setEvents, loading, error, year, setYear, filters, setFilters, filterOpen, setFilterOpen, getEvents };                    // Return documents
  };
  
  export default getEvents;
