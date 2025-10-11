// Imports 
import React from "react";                                              // Imports React to create React component
import wordCloud from "../../assets/images/project_word_cloud.png";     // Imports wordCloud image from path ../assets/images/project_word_cloud.png
import { Link } from "react-router-dom";
import { useTheme } from '../../hooks/themeContext.jsx'; // Adjust path as necessary

/* Defines the Project component
 *
 * Outlines what the Project page is and a link to a list of projects
 * 
 */
export default function Projects() {
    const { isWarmthMode } = useTheme(); // <-- Get theme from context

    return (
        <>
            {/* Outermost container with theme-aware background */}
            <div className={`
                min-h-screen w-screen flex flex-col items-center justify-center 
                px-4 py-6 
                transition-colors duration-500
                ${isWarmthMode
                    ? "bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,rgba(255,226,237,0.75)_60%,rgba(247,243,234,1)_100%)]"
                    : "bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,rgba(22,34,57,0.8)_60%,rgba(18,32,47,1)_100%)]"
                }
            `}>
                {/* Main card area */}
                <div className={`
                    flex flex-col md:flex-row max-w-5xl w-full gap-12 
                    rounded-3xl shadow-xl border-2 p-6 my-6
                    z-10
                    ${isWarmthMode
                        ? "bg-[#FFF8F3]/90 border-[#E94E41]"
                        : "bg-[#151C26]/90 border-cyan-700"
                    }
                `}>
                    {/* Project Text Block */}
                    <div className="flex flex-col justify-center flex-[2]">
                        <h1 className={`
                            text-3xl lg:text-4xl font-bold mb-4 text-center tracking-wide
                            ${isWarmthMode ? "text-[#E94E41]" : "text-cyan-400"}
                        `}>
                            View Projects
                        </h1>
                        <p className={`mb-4 ${isWarmthMode ? "text-[#264653]" : "text-gray-200"}`}>
                            This section provides an overview and access point to a curated list of software projects, developed either as part of academic coursework or personal initiatives. Users can explore projects by sorting them by date or filtering based on type—such as personal or school-related—as well as by category: hardware, system design, or AI. A search bar is also available to help locate projects relevant to a specific query.
                        </p>
                        <p className={`mb-4 ${isWarmthMode ? "text-[#39536B]" : "text-gray-400"}`}>
                            Each project listing may include labeled emoticons for quick visual indicators, the associated course name and number (if applicable), and the project title. A legend explaining the emoticons is displayed in the top-left corner of the page. Every project entry features a brief description, and clicking on it will redirect users to a detailed project page that may include source code, specifications, and—when available—a demo or video showcasing the project in action.
                        </p>
                        <p className={`mb-4 ${isWarmthMode ? "text-[#39536B]" : "text-gray-400"}`}>
                            Due to academic integrity policies, some projects are restricted and cannot be accessed directly. Attempting to view the source code or specification for these protected projects will prompt a passcode request. Passcodes are granted on a case-by-case basis and require users to contact the project owner (me) with a valid reason and assurance that no honor code violations will occur. These passcodes are time-sensitive and may expire; if so, a new request will be required.
                        </p>
                        <p className="mb-4">
                            <Link
                                to="/Projects"
                                className={`
                                    font-bold
                                    transition-colors duration-200
                                    underline underline-offset-2
                                    ${isWarmthMode
                                        ? "text-blue-600 hover:text-[#E94E41]"
                                        : "text-cyan-300 hover:text-cyan-100"}
                                `}
                            >
                                View Projects
                            </Link>
                        </p>
                    </div>
                    {/* Project Word Cloud Image Block */}
                    <div className="flex w-full md:w-auto flex-[1] items-center justify-center">
                        <img
                            src={wordCloud}
                            alt="Project Word Cloud"
                            className={`
                                max-w-xs sm:max-w-sm md:max-w-md 
                                rounded-xl shadow-lg 
                                ring-2
                                ${isWarmthMode
                                    ? "ring-[#e2eafc]"
                                    : "ring-cyan-900"
                                }
                                bg-white/70
                            `}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}