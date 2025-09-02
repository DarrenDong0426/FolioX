import React from 'react';                              // Import React to allow React components to be made
import { Link } from 'react-router-dom';                // Import Link from React-router-DOM to link certain component to a path

/* Defines the Header Component 
 *
 * A reusable component that links elements to certain parts of the site
 * 
 * This component will be rendered on top of all pages as a way for user to navigate 
 * 
*/
export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-2xl">                                      
    {/* Header Element: Styles the global layout of the header relative to the page
      * 
      * sticky allows the component to remain on one side of the page even with scrolling.  
      * top-0 must be used with a type of position (sticky here) and indicate where the position should be set (top of page here)
      * z-50 sets the z-index, which determines order of overlapping components, to 50. Higher z-index components are on top of lower z-index components
      * bg-white sets the background of the header component to white
      * shadow-2xl sets a extra extra (2) large shadow based on box-shadow setting (defaults here to bottom down right) 
      * 
      */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Div Element: Style a div that acts as the content wrapper for child components
          * 
          * max-w-7xl sets the max width of the element relative to the global root element (<html>). 7xl refers to specific length. The 7 holds no relevance. 
          * mx-auto sets automatically sets the left and right margins (x directions) equally based on remaining space (container width - element width)
          * px-4 sets the padding in the x direction (left and right). 4 refers to 4 * 0.25rem = 1rem of padding. Padding does not affect the element width, but squeezes element content inwards
          * py-3 sets the padding in the y direction (up and down). 3 refers to 3 * 0.25rem = 0.75rem of padding. 
          * flex sets the element's layout to be a flexbox. Children will be set horiontally and the container will expand to fit the content unless fixed dimensions.
          * items-center sets the position children of the parent in the direction perpendicular to the flex (flex default to row so centers on the vertical axis so middle of y axis)
          * justify-between sets the position children of the parent in the direction of the flex (flex default to row so justify on the horizontal). Between puts the first item at the start and last item at the end and distribute other items evenly in between.
          * 
          */}
        
            <Link to="/" className="text-xl font-bold text-gray-800 hover:text-blue-600">
                Darren Dong
            </Link>
            {/* Link Element: Links the top left Name to the Home page via the "/" path
              * 
              * text-xl sets the text to a specific size (extra large here)
              * font-bold bolds the font 
              * text-gray-800 sets the text color to a gray shade of 800 out of a scale of 50-900. Higher means darker
              * hover:text-blue-600 sets the text color to a blue shade of 600 of a scale of 50-900 on hover.
              * 
            */}

            <nav className="space-x-4">
                <Link to="/Projects" className="text-gray-600 hover:text-blue-500">Projects</Link>
                <Link to="/Documents" className="text-gray-600 hover:text-blue-500">Documents</Link>
                <Link to="/Highlights" className="text-gray-600 hover:text-blue-500">Highlights</Link>
                <Link to="/FAQs" className="text-gray-600 hover:text-blue-500">FAQs</Link>
                <Link to="/Changelog" className="text-gray-600 hover:text-blue-500">Changelog</Link>
            </nav>
             {/* Navigation Links: Establish a nav bar that holds Link Elements to different pages
              * 
              * space-x-4 applies padding to all children in the horizonatal direction (left and right). 4 * 0.25rem = 1rem
              * text-gray-600 sets the color of the text to a shade of gray with value 600 out of a range of 50-900. 
              * hover:text-blue-500 sets the color of the text to a shade of blue with value 500 out of a range of 50-900 on hover
            */}
        </div>
    </header>
  );
}
