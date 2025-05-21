// Imports 
import React from "react";                                  // Imports React to create React component

/* Defines the Intro component
 *
 * Give an overview of the website
 * Contains an profile picture and a introductory blurb. 
 * 
 */
export default function Intro(){
    return(
        <>
        {/* A React fragment that wrap multiple elements. <div> can also be used but since there is no CSS styling, fragment is enough as it is simplier on the DOM */}
        <div className='flex max-w-5xl w-full gap-10 flex-[1]'>
            <img 
                src="/path/to/image.jpg"
                alt="Profile"
                className="w-96 h-96 rounded-full object-cover shadow-2xl flex-shrink-0" 
            />
        </div>
        <div className='flex flex-col justify-center flex-[2]'>
            <h1 className='text-4xl font-bold mb-4 text-center'>Welcome to FolioX – My Digital Portfolio!</h1>
            <p className="mb-4">
                I’m Darren Dong, a senior undergraduate at the University of Michigan, Ann Arbor, pursuing a Bachelor’s degree in Computer Science with a minor in Electrical Engineering. My interests lie in system design and the integration of Artificial Intelligence and Machine Learning with both software and embedded systems. I primarily work with C++ and Python in my projects, but I’m always eager to expand my toolkit and explore new technologies and methodologies.
            </p>
            <p className="mb-4">
                Here, you’ll find an overview of my work in the Projects section, downloadable resumes summarizing my skills and experience in Resume, key moments and formative experiences in Highlights, and answers to common questions about this site in FAQs. Use the navigation bar above to explore each section in more detail.
            </p>
            <p className="mb-4">
                Feel free to explore the site, reach out with any inquiries, and dive deeper into the sections that interest you. I always appreciate feedback, which will be considered for future improvements.
            </p>
        </div>
    </>
    )
}