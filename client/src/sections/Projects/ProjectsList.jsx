// Imports
import Tag from '../../components/Tag';
import Pagination from '../../components/Pagination';
import Controls from './Controls';
import { useProjects } from '../../hooks/projectListContext';
import { useTheme } from '../../hooks/themeContext.jsx';

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
  const colorCodeFunc = (type, label) => {
  const t = type?.toLowerCase();
  const l = label?.toLowerCase();

  // Handle project categories (types)
  if (t === "type") {
    switch (l) {
      case "ai/ml":
        return { bg: isWarmthMode ? "#E0F7FA" : "#1c2a2f", text: isWarmthMode ? "#006064" : "#0ff" };
      case "hardware":
        return { bg: isWarmthMode ? "#FEF3C7" : "#3b2f1c", text: isWarmthMode ? "#78350F" : "#ff0" };
      case "software":
        return { bg: isWarmthMode ? "#E0F2FE" : "#2c2d3f", text: isWarmthMode ? "#0369a1" : "#0ff" };
      default:
        return { bg: isWarmthMode ? "#CCF9F0" : "#2d3c45", text: isWarmthMode ? "#166534" : "#0f0" };
    }
  }

  // Handle languages
  if (t === "language") {
    switch (l) {
      case "c":
      case "c++":
        return { bg: isWarmthMode ? "#E0F2FE" : "#2c2d3f", text: isWarmthMode ? "#0369a1" : "#0ff" };
      case "java":
        return { bg: isWarmthMode ? "#FEF3C7" : "#3b2f1c", text: isWarmthMode ? "#78350F" : "#ff0" };
      case "python":
        return { bg: isWarmthMode ? "#E0F2F1" : "#1f2a2f", text: isWarmthMode ? "#065f46" : "#0f0" };
      case "javascript":
        return { bg: isWarmthMode ? "#FEF9C3" : "#3b351f", text: isWarmthMode ? "#78350F" : "#ff0" };
      case "html":
        return { bg: isWarmthMode ? "#FFE6E6" : "#3a1f1f", text: isWarmthMode ? "#b91c1c" : "#f0f" };
      case "css":
        return { bg: isWarmthMode ? "#DBEAFE" : "#1e2c3b", text: isWarmthMode ? "#1e40af" : "#0ff" };
      case "dart":
        return { bg: isWarmthMode ? "#E0F7FA" : "#1c2a2f", text: isWarmthMode ? "#006064" : "#0ff" };
      case "shell":
        return { bg: isWarmthMode ? "#F3F4F6" : "#2a2a2a", text: isWarmthMode ? "#374151" : "#fff" };
      default:
        return { bg: isWarmthMode ? "#F3F4F6" : "#2a2a2a", text: isWarmthMode ? "#1F2937" : "#fff" };
    }
  }

  // Fallback for unknown type
  return { bg: isWarmthMode ? "#F3F4F6" : "#2a2a2a", text: isWarmthMode ? "#1F2937" : "#fff" };
};


  if (loading) return <p className={`text-center ${isWarmthMode ? "text-gray-600" : "text-cyan-200"}`}>LOADING...</p>;
  if (error) return <p className={`text-center ${isWarmthMode ? "text-red-600" : "text-[#F38BA3]"}`}>Error: {error.message}</p>;

  return (
    <div className={`
      min-h-screen w-screen transition-colors duration-500 pt-5 flex flex-col
      ${isWarmthMode
        ? "bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,rgba(255,226,237,0.7)_60%,#fff8f3_100%)]"
        : "bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,rgba(32,46,65,0.96)_48%,rgba(16,28,44,0.93)_75%,rgba(9,16,29,0.97)_90%,#101727_100%)]"
      }
    `}>
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
                  {project.type.includes("Hardware") && <Tag label="Hardware" type="type" colorCodeFunc={colorCodeFunc} />}
                  {project.type.includes("AI/ML") && <Tag label="AI/ML" type="type" colorCodeFunc={colorCodeFunc} />}
                  {project.language.includes("C++") && <Tag label="C++" type="language" colorCodeFunc={colorCodeFunc} />}
                  {project.language.includes("Java") && <Tag label="Java" type="language" colorCodeFunc={colorCodeFunc} />}
                  {project.language.includes("Python") && <Tag label="Python" type="language" colorCodeFunc={colorCodeFunc} />}
                  {project.language.includes("Shell") && <Tag label="Shell" type="language" colorCodeFunc={colorCodeFunc} />}
                  {project.language.includes("HTML") && <Tag label="HTML" type="language" colorCodeFunc={colorCodeFunc} />}
                  {project.language.includes("CSS") && <Tag label="CSS" type="language" colorCodeFunc={colorCodeFunc} />}
                  {project.language.includes("JavaScript") && <Tag label="JavaScript" type="language" colorCodeFunc={colorCodeFunc} />}
                  {project.language.includes("C") && <Tag label="C" type="language" colorCodeFunc={colorCodeFunc} />}
                  {project.language.includes("Dart") && <Tag label="Dart" type="language" colorCodeFunc={colorCodeFunc} />}
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
}
