// Imports
import React from 'react';                              // Imports React to make React components
import Header from "../components/Header";              // Imports the Header component from the path ../components/Header.jsx

/* Defines the Project page component
 *
 * Sets the Project page Component that will render when the path is /Projects
 * Include a search bar component to search for a specific project based on title
 * Include filter option box that filters on type of project, if the project is for school or personal, or by time
 * Include a legend for labels on projects. 
 */
export default function Projects(){
  return (
    <div className='min-h-screen flex flex-col'>
      {/* Div: Content Wrapper over the entire home page
        *
        * min-h-screen sets the minimum height of the element to be 100% of the viewpoint height (the entire browser window screen)
        * flex sets the children to be in a flexbox format
        * flex-col sets the flex direction to be columns so children are placed vertically
        *  
      */}
      <Header/>

      <main className='flex-1 overflow-y-auto'>
        {/* Main: Content Wrapper over all sections. Main is used to identify the "main" part of this page
          *
          * flex-1 fills in the flex direction (column here)
          * overflow-y-auto shows scrollbar if children overflow. Otherwise, no scrollbar
          *  
          */}
        
      </main>
    </div>
  );
}
