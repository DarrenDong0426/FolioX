// Imports
import Tag from '../../components/Tag';
import Pagination from '../../components/Pagination';
import Controls from './Controls';
import { useProjects } from '../../hooks/projectListContext';
import { useTheme } from '../../hooks/themeContext.jsx';
import { useTagColor } from '../../components/TagColor.jsx';

/* Defines the ProjectsList section component
 *
 * Calls the API hook to get a list of projects. 
 * Renders a list of projects with tags and descriptions.
*/
export default function ProjectsList() {
  const { 
    projects, loading, error, 
    currentPage, setCurrentPage, 
    totalPage
  } = useProjects();

  const { isWarmthMode } = useTheme();

  // Theme-aware color code function for tags
  const colorCodeFunc = useTagColor();



  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div
        className={`w-12 h-12 rounded-full border-4 border-t-transparent animate-spin
          ${isWarmthMode ? "border-[#E94E41]" : "border-cyan-400"}
        `}
      />
      <p
        className={`font-mono tracking-widest uppercase text-sm
          ${isWarmthMode ? "text-[#8B2D2D]" : "text-cyan-200"}
        `}
      >
        Loading...
      </p>
    </div>
  );

  if (error) return <p className={`text-center ${isWarmthMode ? "text-red-600" : "text-[#F38BA3]"}`}>Error: {error.message}</p>;

  return (
    <div className="w-full pt-5 flex flex-col">
      <div className="max-w-7xl w-full mx-auto px-4 pb-10">
        <Controls />
        <ul className='pt-4'>
          {projects.map(project => (
            <li key={project.id} className={`
              ${isWarmthMode ? "bg-white border-[#e2eafc]" : "bg-[#1b2433]/95 border-cyan-700"}
              shadow-md rounded-2xl p-6 mb-6 border transition-colors duration-500
            `}>
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
                  {(() => {
                    const d = new Date(project.month_year);
                    return d.toLocaleString("en-US", { month: "short", year: "numeric" });
                  })()}
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
                  {(project.type || []).map(tag => (
                    <Tag key={`type-${tag}`} label={tag} type="type" colorCodeFunc={colorCodeFunc} />
                  ))}
                  {(project.language || []).map(tag => (
                    <Tag key={`lang-${tag}`} label={tag} type="language" colorCodeFunc={colorCodeFunc} />
                  ))}
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
  );
};
