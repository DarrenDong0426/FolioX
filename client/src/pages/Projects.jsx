// Imports
import Header from "../components/Header";                          // Imports the Header component from the path ../components/Header.jsx
import ProjectsList from '../sections/Projects/ProjectsList';       // Import Projects component from the path ../sections/Projects/Projects.jsx
import { ProjectListProvider } from '../hooks/projectListContext';  // Import ProjectListProvider from the path ../hooks/projectListContext.jsx
import { useTheme } from '../hooks/themeContext.jsx';               // Import theme context

/* Defines the Project page component
 *
 * Sets the Project page Component that will render when the path is /Projects
 * Include a search bar component to search for a specific project based on title
 * Include filter option box that filters on type of project, if the project is for school or personal, or by time
 * Include a legend for labels on projects. 
 */
export default function Projects(){
  const { isWarmthMode } = useTheme(); 

  return (
    <div className={`
      min-h-screen flex flex-col transition-colors duration-500
      ${isWarmthMode
        ? "bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,rgba(255,226,237,0.7)_60%,#fff8f3_100%)]"
        : "bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,rgba(22,34,57,0.88)_60%,#1b2432_100%)]"
      }
    `}>
      {/* Div: Content Wrapper over the entire home page
        *
        * min-h-screen sets the minimum height of the element to be 100% of the viewpoint height (the entire browser window screen)
        * flex sets the children to be in a flexbox format
        * flex-col sets the flex direction to be columns so children are placed vertically
        * bg (theme-adaptive) sets the background of the project page
        *  
      */}
      <Header/>

      <main className='flex-1 overflow-y-auto py-4'>
        {/* Main: Content Wrapper over all sections. Main is used to identify the "main" part of this page
          *
          * flex-1 fills in the flex direction (column here)
          * overflow-y-auto shows scrollbar if children overflow. Otherwise, no scrollbar
          * px-4 sets the horizontal padding 
          * py-4 sets the vertical padding 
          *  
         */}
        <h1 className={`
          text-4xl font-bold mb-8 text-center
          transition-colors
          ${isWarmthMode ? "text-[#E94E41]" : "text-cyan-300"}
        `}>
          {/* h1: Overall project heading of the page 
           *
           * color adapts to theme for best readability/accent
           */}
          Projects
        </h1>
        {/* Wrap the ProjectsList component with ProjectListProvider to provide context */}
        <ProjectListProvider>
          <ProjectsList/>
        </ProjectListProvider>
      </main>
    </div>
  );
}