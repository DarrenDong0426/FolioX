// Imports 
import React from "react";                                              // Imports React to create React component
import wordCloud from "../../assets/images/project_word_cloud.png";     // Imports wordCloud image from path ../assets/images/project_word_cloud.png
import { Link } from "react-router-dom";

/* Defines the Project component
 *
 * Outlines what the Project page is and a link to a list of projects
 * 
 */
export default function Projects(){
    return(
        <>
            {/* A React fragment that wrap multiple elements. */}
            <div className="flex flex-col justify-center flex-[2]">
                <h1 className='text-4xl font-bold mb-4 text-center'>View Projects</h1>
                <p className="mb-4">
                This section provides an overview and access point to a curated list of software projects, developed either as part of academic coursework or personal initiatives. Users can explore projects by sorting them by date or filtering based on type—such as personal or school-related—as well as by category: hardware, system design, or AI. A search bar is also available to help locate projects relevant to a specific query.</p>
                <p className="mb-4">
                    Each project listing may include labeled emoticons for quick visual indicators, the associated course name and number (if applicable), and the project title. A legend explaining the emoticons is displayed in the top-left corner of the page. Every project entry features a brief description, and clicking on it will redirect users to a detailed project page that may include source code, specifications, and—when available—a demo or video showcasing the project in action.
                </p>
                <p className="mb-4">
                    Due to academic integrity policies, some projects are restricted and cannot be accessed directly. Attempting to view the source code or specification for these protected projects will prompt a passcode request. Passcodes are granted on a case-by-case basis and require users to contact the project owner (me) with a valid reason and assurance that no honor code violations will occur. These passcodes are time-sensitive and may expire; if so, a new request will be required.
                </p>
                <p className="mb-4">
                    <Link to="/" className=" font-bold text-blue-600 hover:text-red-600">
                        View Projects
                    </Link>
                </p>
            </div>
            <div className="flex max-w-5xl w-full gap-10 flex-[1]">
                <img 
                    src={wordCloud}
                    alt="Project Word Cloud"
                    className="flex-shrink-0"/>
            </div>
        </>
    )
}