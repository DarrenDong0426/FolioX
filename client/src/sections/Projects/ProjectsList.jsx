import React from 'react';                              // Imports React to make React components
import getProjects from '../../hooks/getProjects';      // Import getProjects API hook 
import Tag from '../../components/Tag';                 // Import Tag component from path ../../components/Tag
import Pagination from '../../components/Pagination';   // Import Pagination component from path ../../components/Pagination


/* Defines the ProjectsList section component
 *
 * Calls the API hook to get a list of projects. 
 * Uses the API hook to render a list of projects with the name and description that links to its page
 * 
*/
export default function ProjectsList(){
  const { projects, loading, error, pagination, currentPage, setCurrentPage, totalPage } = getProjects();   // Get projects, loading, and error state from getProjects()

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
    <ul className='px-4 max-w-7xl mx-auto'>
        {/* ul: Unordered list for each project
          *
          * px-4 add horizontal padding
          * max-w-7xl sets the max width to be extra large x7 
          * mx-auto sets margins automatically based on remaining space
          *  
          */}
          {projects.map(project => (
              <li key={project.id} className='bg-white shadow-md rounded-2xl p-6 mb-6 border border-gray-200'>
                {/* li: List item as project 
                  *
                  * bg-white sets each project component as white
                  * shadow-md sets a medium shadow beneath each project component
                  * rounded-2xl makes the component edge rounded 2xl
                  * p-6 adds padding in all four directions
                  * mb-6 add margins to the bottom
                  * border adds a border around the component
                  * border-gray-200 sets the color of the border to gray
                  *  
                  */}
                <div className='flex items-center gap-2 mb-2'>
                  {/* div: context wrapper over the project component
                  *
                  * flex sets the children component to be as flexbox
                  * items-center sets the children to be centered on the flex direction (horizontal here)
                  * gap-2 adds a gap in the direction of the flex (horizontal here)
                  * mb-2 adds a margin to the bottom
                  *  
                  */}
                  {project.lock && <span title="Private">🔒</span>}
                  {project.wip && <span title="Work in progress">🚧</span>}
                  <h3 className='text-2xl font-bold hover:text-blue-600'>
                    {/* h3: project header
                      *
                      * text-2xl sets the text size to extra large 2x
                      * fond-bold sets the text emphasis to bold
                      * hover:text-blue-600 sets the text color to blue on hover
                      *  
                      */}
                    {project.name}
                  </h3>
                  <p className='ml-auto text-gray-500 text-sm'>
                    {/* p: project timeline
                      *
                      * ml-auto sets the left margin of the flex box based on remaining space in the left
                      * text-gray-500 sets the text color as gray
                      * text-sm sets the text size to small
                      *  
                      */}
                    ({project.month_year})
                  </p>
                </div>
                <div>
                  <p className='text-gray-700 mb-4'>
                    {/* p: project description
                      *
                      * text-gray-700 sets the text color as gray
                      * mb-4 sets the bottom padding 
                      *  
                      */}
                    {project.desc}
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    {/* div: context wrapper for each tag of the project
                      *
                      * flex sets the parent and children elements as a flexbox
                      * flex-wrap forces children elements to wrap around when no horizontal space left
                      * gap-2 sets a gap in the direction of the flexbox (horizontal here)
                      *  
                      */}
                    {project.type.includes("Software") && <Tag label="Software" type="type" />}
                    {project.type.includes("Hardware") && <Tag label="Hardware" type="type" />}
                    {project.type.includes("AI/ML") && <Tag label="AI/ML" type="type" />}
                    {project.language.includes("C++") && <Tag label="C++" type="language" />}
                    {project.language.includes("Java") && <Tag label="Java" type="language" />}
                    {project.language.includes("Python") && <Tag label="Python" type="language" />}
                    {project.language.includes("Shell") && <Tag label="Shell" type="language" />}
                    {project.language.includes("HTML") && <Tag label="HTML" type="language" />}
                    {project.language.includes("CSS") && <Tag label="CSS" type="language" />}
                    {project.language.includes("JavaScript") && <Tag label="JavaScript" type="language" />}
                    {project.language.includes("C") && <Tag label="C" type="language" />}
                    {project.language.includes("Dart") && <Tag label="Dart" type="language" />}
                  </div>
                </div>
              </li>
          ))}
      </ul>
      <Pagination             
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPage={totalPage}
      />
    </>
  )

}