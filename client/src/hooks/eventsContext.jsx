// Imports
import { createContext, useContext } from "react";              // Import createContext and useContext from react
import getEvents from '../hooks/getEvents';                 // Import getProjects API hook from path ../hooks/getProjects 

// Create the context object
const EventContext = createContext(); 

/* Defines the ProjectListProvider context hook
 *
 * ProjectListProvider Context Hook
 * Takes in children components as props
 * Uses getProjects to get the project state
 * Provides the project state to children components
 *  
*/
export function EventProvider({ children }) {
    // Get the project state from getProjects
    const eventState = getEvents();

    // Provide the project state to children components
    return (
        <EventContext.Provider value={eventState}>
            {children}
        </EventContext.Provider>
    ); 
}


/* Defines the useProjects function
 *
 * useProjects Function
 * useContext to access the ProjectListContexts
 * Returns the project state
 *  
*/
export function useEvents() {
    return useContext(EventContext);
}

export default EventContext; 
