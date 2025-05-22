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
            {/* Div: Context Wrapper for the profile picture
              * 
              * flex sets the layout and children elements as a flexbox
              * max-w-5xl sets the max width of the context wrapper to extra large x5
              * w-full allows the element to use up to the full parent width or the max width even if the content requires smallermwidth
              * gap-10 sets a gap for every children in the both direction of the flex (default to horizontal here). 10 * 0.25rem = 4rem
              * flex-[1] sets flex-grow = 1 (allows item to fill in available space), flex-shrink = 1 (allows item to shrink), flex-basis = 0% (start with a base size of 0%)
              * 
            */}
            <img 
                src="/path/to/image.jpg"
                alt="Profile"
                className="w-96 h-96 rounded-full object-cover shadow-2xl flex-shrink-0" 
            />
            {/* Img Element: Circular element that holds the profile image
              *
              * w-96 sets the width to a fixed size. 96 * 0.25rem = 24rem
              * h-96: sets the height to a fixed size. 96 * 0.25rem = 24rem 
              * rounded-full sets the corner of the wrapper to be completed round. Same fixed width and height results in a circle
              * object-cover sets the object (image here) cover the container entire while maintaining aspect ratio
              * shadow-2xl sets the shadow on the circular element with extra extra large shadow
              * flex-shrink-0 disables the item to shrink if the container is too small
              * 
            */}
        </div>
        <div className='flex flex-col justify-center flex-[2]'>
            {/* Div: Context Wrapper for the intro blurb
              * 
              * flex sets the layout and children elements as a flexbox
              * flex-col arranges children items vertically in a column  
              * justify-center aligns children items to start in the center rather than the default location (start)
              * flex-[2] fills 2x the available space to any elements with fill-1
              *   
            */}
            <h1 className='text-4xl font-bold mb-4 text-center'>Welcome to FolioX – My Digital Portfolio!</h1>
            {/* H1: Title of the intro blurb 
              * 
              * text-4xl sets the text size to extra large (x4)
              * font-bold sets the text as bolded
              * mb-4 sets the bottom marge. 4 * 0.25rem = 1rem
              * text-center positions the header in the center of its wrapper
              *   
            */}
            <p className="mb-4">
                I’m Darren Dong, a senior undergraduate at the University of Michigan, Ann Arbor, pursuing a Bachelor’s degree in Computer Science with a minor in Electrical Engineering. My interests lie in system design and the integration of Artificial Intelligence and Machine Learning with both software and embedded systems. I primarily work with C++ and Python in my projects, but I’m always eager to expand my toolkit and explore new technologies and methodologies.
            </p>
            <p className="mb-4">
                Here, you’ll find an overview of my work in the Projects section, downloadable resumes summarizing my skills and experience in Resume, key moments and formative experiences in Highlights, and answers to common questions about this site in FAQs. Use the navigation bar above to explore each section in more detail.
            </p>
            <p className="mb-4">
                Feel free to explore the site, reach out with any inquiries, and dive deeper into the sections that interest you. I always appreciate feedback, which will be considered for future improvements.
            </p>
            {/* p: Paragraph of the intro blurb
              * 
              * mb-4 sets the bottom marge. 4 * 0.25rem = 1rem
              *   
            */}
        </div>
    </>
    )
}