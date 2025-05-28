// Imports
import React from 'react';                              // Imports React to make React components
import Header from "../components/Header";              // Imports the Header component from the path ../components/Header.jsx
import ProjectsList from '../sections/Projects/ProjectsList';   // Import Projects component from the path ../sections/Projects/Projects.jsx



/* Defines the Project page component
 *
 * Sets the Project page Component that will render when the path is /Projects
 * Include a search bar component to search for a specific project based on title
 * Include filter option box that filters on type of project, if the project is for school or personal, or by time
 * Include a legend for labels on projects. 
 */
export default function Projects(){
  return (
    <div className='min-h-screen flex flex-col bg-gray-50'>
      {/* Div: Content Wrapper over the entire home page
        *
        * min-h-screen sets the minimum height of the element to be 100% of the viewpoint height (the entire browser window screen)
        * flex sets the children to be in a flexbox format
        * flex-col sets the flex direction to be columns so children are placed vertically
        * bg-gray-50 sets the background of the project page to gray
        *  
      */}
      <Header/>

      <main className='flex-1 overflow-y-auto px-4 py-8'>
        {/* Main: Content Wrapper over all sections. Main is used to identify the "main" part of this page
          *
          * flex-1 fills in the flex direction (column here)
          * overflow-y-auto shows scrollbar if children overflow. Otherwise, no scrollbar
          * px-4 sets the horizontal padding 
          * py-8 sets the vertical padding 
          *  
          */}
        <h1 className='text-4xl font-bold mb-8 text-center'>Projects</h1>
        {/* h1: Overall project heading of the page
          *
          * text-4xl sets the text size of the heading to extra large 4x
          * font-bold sets the text emphasis to bold
          * mb-8 adds a margin to the bottom of the component
          * text-center puts the text in the center of the flex direction (horizontal here)
          *  
          */}
        <ProjectsList/>
      </main>
    </div>
  );
}
