// Imports
import { useState, useEffect } from 'react';                                      // Imports useState from React

/* *
 * Projects hook
 * 
 * Fetches project data from the backend API and returns the list.
 */
const getDocuments = () => {

    const [documents, setDocuments] = useState([]);                               // document state to hold list of documents 
    const [currDoc, setCurrDoc] = useState(0)                                     // curDoc state to hold the index value of the current doc, initialized to 0
    const [loading, setLoading] = useState(true);                                 // loading flag with useState hook initialized to true
    const [error, setError] = useState(null);                                     // error flag with useState hook

    useEffect(() => {                                                             // useEffect to call api projects
      fetch(`/api/documents`)
        .then(response => {
          if (!response.ok) throw new Error('Network response was not ok');       // Throw error if response unsuccessful             
          return response.json();                                                 // Return json response on success
        })
        .then(data => {
            setDocuments(data.documents)                                          // Set the document to list of fetched items
            setLoading(false)                                                     // Set loading flag to false
            setCurrDoc(0)                                                         // Set the current document index to 0
        })
        .catch(err => {                                                           // Error handling
          console.error('Error fetching projects:', err);   
          setError(err);                                                          // set error flag
          setLoading(false);                                                      // set loading to false
        });
    }, []);                                                                       // useEffect renders once on load
    return { documents, currDoc, setCurrDoc, loading, error };                    // Return documents
  };
  
  export default getDocuments;
