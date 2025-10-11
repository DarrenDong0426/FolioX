// Imports
import timeline from "../../assets/images/timeline.png";              // Imports documents image from path ../assets/images/documents.png
import { Link } from "react-router-dom";
import { useTheme } from '../../hooks/themeContext.jsx';                // Import theme context

export default function Timeline() {
    const { isWarmthMode } = useTheme();

    return (
        <>
            <div className={`
                min-h-screen w-screen flex items-center justify-center px-4 py-6
                transition-colors duration-500
                ${isWarmthMode
                  ? "bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,rgba(255,226,237,0.8)_60%,rgba(247,243,234,1)_100%)]"
                  : "bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,rgba(17,26,34,0.8)_60%,rgba(18,32,47,1)_100%)]"
                }
            `}>
                <div className={`
                    flex flex-col md:flex-row max-w-6xl w-full gap-10 rounded-3xl shadow-xl border-2 p-6 my-6 z-10
                    ${isWarmthMode
                        ? "bg-[#FFF8F3]/90 border-[#E94E41]"
                        : "bg-[#151C26]/90 border-cyan-700"
                    }
                `}>
                    <div className="flex flex-col justify-center flex-[2]">
                        <h1 className={`
                            text-3xl lg:text-4xl font-bold mb-4 text-center tracking-wide
                            ${isWarmthMode ? "text-[#E94E41]" : "text-cyan-400"}
                        `}>
                            View Timeline
                        </h1>
                        <p className={`mb-4 ${isWarmthMode ? "text-[#264653]" : "text-gray-200"}`}>
                            This timeline feature provides users with a comprehensive, chronological overview of significant achievements and events, organized by year. The timeline displays a wide range of milestones, including academic accomplishments such as major projects, admissions, and degree completions; professional development experiences, such as research appointments, internships, and conference participation; as well as notable personal events, including travel and other meaningful activities. Each event is represented as a distinct point on the timeline for its respective year.
                        </p>
                        <p className={`mb-4 ${isWarmthMode ? "text-[#39536B]" : "text-gray-400"}`}>
                            When users hover over an event point, it expands into a detailed information box that summarizes the event, allowing for quick insights at a glance. For further exploration, clicking on an event directs users to a dedicated page containing comprehensive details, supporting resources, and related content.    
                        </p>
                        <p className={`mb-4 ${isWarmthMode ? "text-[#39536B]" : "text-gray-400"}`}>
                            The feature also includes robust filtering options, allowing users to tailor their view based on event categories such as Academic, Professional Development, or Personal. Users can select one or multiple categories simultaneously, enabling a customized and focused timeline experience. Navigational controls support both sequential and direct access to timeline entries, with buttons to move to the previous or next year, as well as to jump directly to the present or the last year in the timeline. Additionally, a scrollbar provides efficient access to any specific year within the timeline.
                        </p>
                        <p className="mb-4">
                            <Link
                                to="/Timeline"
                                className={`
                                    font-bold underline underline-offset-2 transition-colors duration-200
                                    ${isWarmthMode
                                      ? "text-blue-600 hover:text-[#E94E41]"
                                      : "text-cyan-300 hover:text-cyan-100"}
                                `}
                            >
                                View Timeline
                            </Link>
                        </p>
                    </div>
                    <div className="flex w-full md:w-auto flex-[1] items-center justify-center">
                        <img
                            src={timeline}
                            alt="Timeline"
                            className={`
                                max-w-xs sm:max-w-sm md:max-w-md
                                rounded-xl shadow-lg ring-2
                                ${isWarmthMode ? "ring-[#e2eafc]" : "ring-cyan-900"}
                                bg-white/70
                            `}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}