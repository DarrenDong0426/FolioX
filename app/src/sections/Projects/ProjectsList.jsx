// Imports
import Tag from "../../components/Tag";
import Pagination from "../../components/Pagination";
import Controls from "./Controls";
import { useProjects } from "../../hooks/projectListContext";
import { useTheme } from "../../hooks/themeContext.jsx";
import { useTagColor } from "../../components/TagColor.jsx";
import { Link } from "react-router-dom";
import bobbyTablesImage from "../../assets/images/meme.png";

// Patterns that look like SQL injection / XSS attempts
const INJECTION_PATTERNS = [
  /['"`];?\s*--/, // ';-- variants
  /;--/, // bare ;--
  /\bOR\s+1\s*=\s*1\b/i, // OR 1=1
  /\bDROP\s+TABLE\b/i, // DROP TABLE
  /<script/i, // <script>
];

function looksLikeInjection(query) {
  if (!query) return false;
  return INJECTION_PATTERNS.some((p) => p.test(query));
}

// Display month_year robustly across browsers. iOS Safari can't parse
// "June 2025" via `new Date(...)`, so we prefer the pre-formatted string
// (which the backend already gives us as "June 2025") and fall back to
// parsing month_year_raw ("2025-06-01") if needed.
function formatProjectDate(project) {
  if (
    project.month_year &&
    typeof project.month_year === "string" &&
    project.month_year.trim()
  ) {
    return project.month_year;
  }
  if (project.month_year_raw) {
    const parts = project.month_year_raw.split("-");
    if (parts.length >= 2) {
      const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, 1);
      if (!isNaN(d.getTime())) {
        return d.toLocaleString("en-US", { month: "short", year: "numeric" });
      }
    }
  }
  return "";
}

/* Defines the ProjectsList section component
 *
 * Calls the API hook to get a list of projects.
 * Renders a list of projects with tags and descriptions.
 */
export default function ProjectsList() {
  const {
    projects,
    loading,
    error,
    currentPage,
    setCurrentPage,
    totalPage,
    query,
  } = useProjects();

  const { isWarmthMode } = useTheme();
  const colorCodeFunc = useTagColor();

  if (loading)
    return (
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

  if (error)
    return (
      <p
        className={`text-center ${isWarmthMode ? "text-red-600" : "text-[#F38BA3]"}`}
      >
        Error: {error.message}
      </p>
    );

  const showEasterEgg = looksLikeInjection(query);

  return (
    <div className="w-full pt-5 flex flex-col">
      <div className="max-w-7xl w-full mx-auto px-4 pb-10">
        <Controls />

        {showEasterEgg ? (
          <div className="flex flex-col items-center my-12">
            <img
              src={bobbyTablesImage}
              alt="XKCD 327: Exploits of a Mom — &quot;Her daughter is named Help I'm trapped in a driver's license factory&quot;"
              className="max-w-2xl w-full rounded-lg shadow-2xl bg-white p-2"
            />
            <p
              className={`
                text-sm italic mt-4 text-center
                ${isWarmthMode ? "text-[#8B2D2D]" : "text-cyan-300"}
              `}
            >
              🥚 Nice try. Parameterized queries say hi.
            </p>
            <p
              className={`
                text-[10px] mt-2 opacity-60 text-center
                ${isWarmthMode ? "text-gray-500" : "text-cyan-400"}
              `}
            >
              Image:{" "}
              <a
                href="https://xkcd.com/327/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-100"
              >
                XKCD #327 "Exploits of a Mom" by Randall Munroe
              </a>
              , licensed under CC BY-NC 2.5
            </p>
          </div>
        ) : (
          <>
            <ul className="pt-4">
              {projects.map((project) => (
                <li
                  key={project.id}
                  className={`
                  ${isWarmthMode ? "bg-white border-[#e2eafc]" : "bg-[#1b2433]/95 border-cyan-700"}
                  shadow-md rounded-2xl p-6 mb-6 border transition-colors duration-500
                `}
                >
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {project.lock && <span title="Private">🔒</span>}
                    {project.wip && <span title="Work in progress">🚧</span>}
                    <Link
                      to={`/Projects/${project.id}`}
                      className={`
                        text-xl sm:text-2xl font-bold transition-colors duration-200
                        ${isWarmthMode ? "text-[#264653] hover:text-[#E94E41]" : "text-cyan-200 hover:text-cyan-400"}
                        hover:underline hover:underline-offset-2
                      `}
                    >
                      {project.name}
                    </Link>
                    <p
                      className={`
                      ml-auto text-sm whitespace-nowrap
                      ${isWarmthMode ? "text-gray-500" : "text-cyan-400"}
                    `}
                    >
                      {formatProjectDate(project)}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`
                      mb-4 transition-colors
                      ${isWarmthMode ? "text-gray-700" : "text-cyan-100"}
                    `}
                    >
                      {project.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {(project.type || []).map((tag) => (
                        <Tag
                          key={`type-${tag}`}
                          label={tag}
                          type="type"
                          colorCodeFunc={colorCodeFunc}
                        />
                      ))}
                      {(project.language || []).map((tag) => (
                        <Tag
                          key={`lang-${tag}`}
                          label={tag}
                          type="language"
                          colorCodeFunc={colorCodeFunc}
                        />
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
          </>
        )}
      </div>
    </div>
  );
}
