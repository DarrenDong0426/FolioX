// Imports
import { createContext, useContext } from "react";              // Import createContext and useContext from react
import getProjects from '../hooks/getProjects';                 // Import getProjects API hook from path ../hooks/getProjects 

// Create the context object
const ProjectListContexts = createContext(); 

/* Defines the ProjectListProvider context hook
 *
 * ProjectListProvider Context Hook
 * Takes in children components as props
 * Uses getProjects to get the project state
 * Provides the project state to children components
 *  
*/
export function ProjectListProvider({ children }) {
    // Get the project state from getProjects
    const projectState = getProjects();

    // Provide the project state to children components
    return (
        <ProjectListContexts.Provider value={projectState}>
            {children}
        </ProjectListContexts.Provider>
    ); 
}


/* Defines the useProjects function
 *
 * useProjects Function
 * useContext to access the ProjectListContexts
 * Returns the project state
 *  
*/
export function useProjects() {
    return useContext(ProjectListContexts);
}

export default ProjectListContexts; 
