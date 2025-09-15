// Imports

import { useEvents } from "../../hooks/eventsContext";
import Controls from "./Controls";



export default function Events(){
  const { 
    events, setEvents, loading, 
    error, year, setYear, 
    filters, setFilters, filterOpen, 
    setFilterOpen, getEvents
  } = useEvents();                                                      // Get projects, loading, error state, and pagination data from useProjects() from from projectListContext 

  if (loading){                                                           // If loading (no error and fetching daa)
    return (
      <p className='text-center text-gray-600'>
        {/* p: Paragraph for the text
        *
        * text-center puts the element at the center  
        * text-gray-600 sets the color of the text to gray
        *  
        */}
        LOADING...
      </p>
    )
  }

  if (error){                                                            // If error (failed to fetch data)
    return (
        <p className='text-center text-red-600'>
        {/* p: Paragraph for the text
        *
        * text-center puts the element at the center 
        * text-red-600 sets the color of the text to red
        *  
        */}
         Error: {error.message}
        </p>
    )
  }

  return (                                                              // If data successfully retrieved, list out each project with map()
   <>
    <Controls/>
    
    </>
  )

}