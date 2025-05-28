import React from 'react';                              // Imports React to make React components
import getProjects from '../../hooks/getProjects';      // Import getProjects API hook 

/* Defines the ProjectsList section component
 *
 * Calls the API hook to get a list of projects. 
 * Uses the API hook to render a list of projects with the name and description that links to its page
 * 
*/
export default function ProjectsList(){
  const { projects, loading, error } = getProjects();   // Get projects, loading, and error state from getProjects()

  if (loading){                                         // If loading (no error and fetching daa)
    return (
        <p> LOADING...</p>
    )
  }

  if (error){                                           // If error (failed to fetch data)
    return (
        <p> Error: {error.message}</p>
    )
  }

  return (                                              // If data successfully retrieved, list out each project with map()
    <ul>
        {projects.map(project => (
            <li key={project.id}>
              <div className='flex items-baseline gap-2'>
                <h3 className='text-2xl font-bold mb-2 text-left'>
                  {project.name}
                </h3>
                <p >
                  ({project.month_year})
                </p>
              </div>
              <p className='mb-4'>
                {project.desc}
              </p>
            </li>
        ))}
    </ul>
  )

}