// Imports
import React from 'react';                              // Imports React to make React components
import Header from "../components/Header";              // Imports the Header component from the path ../components/Header.jsx
import Intro from "../sections/Home/Intro";             // Imports the Intro component from the path ../sections/Home/Intro.jsx
import Projects from '../sections/Home/Projects';       // Imports the Project component from the path ../sections/Home/Projects.jsx
import Documents from '../sections/Home/Documents';     // Imports the Documents component from the path ../sections/Home/Documents.jsx
import Timeline from '../sections/Home/Timeline';
import Information from '../sections/Home/Information'
import Footer from '../components/Footer';

/* Defines the Home component
 *
 * Sets the Home Component that will render when the path is /
 */
export default function Home(){
  return (
    <div className='min-h-screen flex flex-col'>
      {/* Div: Content Wrapper over the entire home page
        *
        * min-h-screen sets the minimum height of the element to be 100% of the viewpoint height (the entire browser window screen)
        * flex sets the children to be in a flexbox format
        * flex-col sets the flex direction to be columns so children are placed vertically
        *  
      */}
      <Header/>

      <main className='flex-1 overflow-y-auto'>
        {/* Main: Content Wrapper over all sections. Main is used to identify the "main" part of this page
          *
          * flex-1 fills in the flex direction (column here)
          * overflow-y-auto shows scrollbar if children overflow. Otherwise, no scrollbar
          *  
          */}
          <section className='h-screen flex items-center justify-center shadow-2xl'>
              <Intro/>
          </section>
          <section className='h-screen flex items-center justify-center shadow-2xl'>
              <Projects/>
          </section>
            {/* Section: Content Wrapper for each section. Section is used to group similar content together
              * 
              * h-screen sets the height of the element to be the size of the screen
              * flex sets the format to be in flexbox
              * items-center aligns items to the center in the direction perpendicular to the flex direction (flex direction is horizontal here)
              * justify-center aligns items to the center in the direction parallel to the flex direction (flex direction is horizontal here)
              * px-6 applies horizontal padding to both sides. 6 * 0.25rem = 1.5rem 
              *   
              */}
          <section className='h-screen flex items-center justify-center shadow-2xl'>
              <Documents/>
          </section>
            {/* Section: Content Wrapper for each section. Section is used to group similar content together
              * 
              * h-screen sets the height of the element to be the size of the screen
              * flex sets the format to be in flexbox
              * items-center aligns items to the center in the direction perpendicular to the flex direction (flex direction is horizontal here)
              * justify-center aligns items to the center in the direction parallel to the flex direction (flex direction is horizontal here)
              * px-6 applies horizontal padding to both sides. 6 * 0.25rem = 1.5rem 
              *   
              */}
          <section className='h-screen flex items-center justify-center shadow-2xl'>
              <Timeline/>
          </section>
          <section className='h-screen flex items-center justify-center shadow-2xl'>
              <Information/>
          </section>
      </main>
      <Footer/>
    </div>
  );
}
