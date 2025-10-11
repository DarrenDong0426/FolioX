// Imports
import Tag from '../../components/Tag';                 // Import Tag component from path ../../components/Tag
import Pagination from '../../components/Pagination';   // Import Pagination component from path ../../components/Pagination
import Controls from './Controls';                      // Import Controls component from path ./Controls
import { useProjects } from '../../hooks/projectListContext';   // Import useProjects hook from path ../../hooks/projectListContext
import { useTheme } from '../../hooks/themeContext.jsx';        // Import theme context

/* Defines the ProjectsList section component
 *
 * Calls the API hook to get a list of projects. 
 * Uses the API hook to render a list of projects with the name and description that links to its page
 * 
*/
export default function ProjectsList(){

  // ColorCode Function for filter (tag) background/text
  function colorCodeFunc(type) {
    // Add theme-AWARE colors if you do tags here
    return type === "type"
      ? isWarmthMode
        ? "bg-blue-100 text-blue-800"
        : "bg-cyan-900 text-cyan-200"
      : isWarmthMode
        ? "bg-green-100 text-green-800"
        : "bg-green-900 text-green-200";
  }

  const { 
    projects, loading, error, 
    currentPage, setCurrentPage, 
    totalPage
  } = useProjects();   // Get projects, loading, error state, and pagination data from useProjects() from projectListContext 

  const { isWarmthMode } = useTheme(); // Get theme switch

  if (loading){ // If loading (no error and fetching daa)
    return (
      <p className={`text-center ${isWarmthMode ? "text-gray-600" : "text-cyan-200"}`}>
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

  if (error){ // If error (failed to fetch data)
    return (
      <p className={`text-center ${isWarmthMode ? "text-red-600" : "text-[#F38BA3]"}`}>
        {/* p: Paragraph for the text
        *
        * text-center puts the element at the center 
        * text-red-600 sets the color of the text to red (or pink for dark mode)
        *  
        */}
         Error: {error.message}
      </p>
    )
  }

  return ( 
   <>
    <div className={`
      min-h-screen w-screen transition-colors duration-500 pt-5
      flex flex-col
      ${isWarmthMode
        ? "bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,rgba(255,226,237,0.7)_60%,#fff8f3_100%)]"
        : "bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,rgba(32,46,65,0.96)_48%,rgba(16,28,44,0.93)_75%,rgba(9,16,29,0.97)_90%,#101727_100%)]"
      }
    `}>

      <div className="max-w-7xl w-full mx-auto px-4 pb-10">
        <Controls/>

        <ul className='pt-4'>

          {projects.map(project => (
              <li key={project.id} className={`
                ${isWarmthMode
                  ? "bg-white border-[#e2eafc]"
                  : "bg-[#1b2433]/95 border-cyan-900"
                }
                shadow-md rounded-2xl p-6 mb-6 border transition-colors duration-500
              `}>
                {/* li: List item as project 
                  *
                  * bg color themes to mode
                  * border changes theme too
                  */}
                <div className='flex items-center gap-2 mb-2'>
                  {project.lock && <span title="Private">🔒</span>}
                  {project.wip && <span title="Work in progress">🚧</span>}
                  <h3 className={`
                    text-2xl font-bold transition-colors duration-200
                    ${isWarmthMode ? "text-[#264653] hover:text-[#E94E41]" : "text-cyan-200 hover:text-cyan-400"}
                    hover:underline hover:underline-offset-2
                  `}>
                    {project.name}
                  </h3>
                  <p className={`
                    ml-auto text-sm
                    ${isWarmthMode ? "text-gray-500" : "text-cyan-400"}
                  `}>
                    ({project.month_year})
                  </p>
                </div>
                <div>
                  <p className={`
                    mb-4 transition-colors
                    ${isWarmthMode ? "text-gray-700" : "text-cyan-100"}
                  `}>
                    {project.desc}
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    {project.type.includes("Software") && <Tag label="Software" type="type" colorCodeFunc={colorCodeFunc} />}
                    {project.type.includes("Hardware") && <Tag label="Hardware" type="type" colorCodeFunc={colorCodeFunc}/>}
                    {project.type.includes("AI/ML") && <Tag label="AI/ML" type="type" colorCodeFunc={colorCodeFunc}/>}
                    {project.language.includes("C++") && <Tag label="C++" type="language" colorCodeFunc={colorCodeFunc}/>}
                    {project.language.includes("Java") && <Tag label="Java" type="language" colorCodeFunc={colorCodeFunc}/>}
                    {project.language.includes("Python") && <Tag label="Python" type="language" colorCodeFunc={colorCodeFunc}/>}
                    {project.language.includes("Shell") && <Tag label="Shell" type="language" colorCodeFunc={colorCodeFunc}/>}
                    {project.language.includes("HTML") && <Tag label="HTML" type="language" colorCodeFunc={colorCodeFunc}/>}
                    {project.language.includes("CSS") && <Tag label="CSS" type="language" colorCodeFunc={colorCodeFunc}/>}
                    {project.language.includes("JavaScript") && <Tag label="JavaScript" type="language" colorCodeFunc={colorCodeFunc}/>}
                    {project.language.includes("C") && <Tag label="C" type="language" colorCodeFunc={colorCodeFunc}/>}
                    {project.language.includes("Dart") && <Tag label="Dart" type="language" colorCodeFunc={colorCodeFunc}/>}
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
      </div>
    </div>
   </>
  )

}