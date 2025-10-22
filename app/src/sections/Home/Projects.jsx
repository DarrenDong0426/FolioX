// Imports 
import React from "react";                                              // Imports React to create React component
import wordCloud from "../../assets/images/project_word_cloud.png";     // Imports wordCloud image from path ../assets/images/project_word_cloud.png
import { Link } from "react-router-dom";
import { useTheme } from '../../hooks/themeContext.jsx'; 
import { motion } from "framer-motion";

const leftSlide = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const rightSlide = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/* Defines the Project component
 *
 * Outlines what the Project page is and a link to a list of projects
 * 
 */
export default function Projects() {
    const { isWarmthMode } = useTheme(); 

    return (
        <>
            <div className={`
                min-h-screen w-screen flex flex-col items-center justify-center 
                px-4 py-6 
                transition-colors duration-500
                ${isWarmthMode
                    ? "bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,rgba(255,226,237,0.75)_60%,rgba(247,243,234,1)_100%)]"
                    : "bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,rgba(22,34,57,0.8)_60%,rgba(18,32,47,1)_100%)]"
                }
            `}>
                {/* Div component 
                  * 
                  *  bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,rgba(22,34,57,0.8)_60%,rgba(18,32,47,1)_100%)] 
                  *     - defines a radial-gradient radiating outward from the central point.  
                  *     - ellipse 80% 60% at 20% 10%: The shape of the radial and the position (here 80% wide and 60% tall from 20% from the left and 10% from the top)
                  *     - rgba(22,34,57,0.8)_60%: Defines the color at 0% until the 60% of the radius
                  *     - rgba(18,32,47,1)_100%: Defines the color at 60% until the 100% of the radius
                  * 
                  */}

                <div className={`
                    flex flex-col md:flex-row max-w-5xl w-full gap-12 
                    rounded-3xl shadow-xl border-2 p-6 my-6
                    z-10
                    ${isWarmthMode
                        ? "bg-[#FFF8F3]/90 border-[#E94E41]"
                        : "bg-[#151C26]/90 border-cyan-700"
                    }
                `}>

                     <motion.div
                        className="flex flex-col justify-center flex-[2]"
                        variants={leftSlide}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.3 }}
                        >
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
                    </motion.div>
                    
                    <motion.div
                        className="flex w-full md:w-auto flex-[1] items-center justify-center"
                        variants={rightSlide}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, amount: 0.3 }}
                        >
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
                    </motion.div>
                </div>
            </div>
        </>
    )
}