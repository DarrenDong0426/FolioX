import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React-router-DOM to link certain component to a path
import { useTheme } from '../hooks/themeContext'; // Adjust path as needed

/* 
 * Defines the Header Component 
 *
 * A reusable component that links elements to certain parts of the site
 *
 * This component will be rendered on top of all pages as a way for user to navigate 
 * 
 */
export default function Header() {
  // Controls the theme mode state: true = warmth, false = tech
  const { isWarmthMode, setIsWarmthMode } = useTheme();

  return (
    <header className={`
      sticky top-0 z-50
      ${isWarmthMode
        ? "bg-[#FAF3E3] border-b-4 border-[#E94E41] shadow-xl"
        : "bg-neutral-900 border-b-4 border-cyan-500 shadow-xl"
      }
      backdrop-blur-md
      transition-colors duration-300
    `}>
      {/* Header component 
        * 
        * Sticky: Makes the component fixed until it reaches a position in which it becomes movable with scroll
        * top-0: Makes the component movable when it reaches trhe top due to sticky
        * backdrop-blur-md: Blurs the background
        * transition-colors duration-300: Sets the duration for color transition when changing color
        *  
        */}
      <div className="max-w-7xl mx-auto px-6 py-2 lg:py-3 flex items-center justify-between">
        <Link 
          to="/"
          className={`
            text-2xl lg:text-3xl font-extrabold font-serif tracking-wide select-none
            ${isWarmthMode ? "text-[#E94E41] hover:text-[#264653]" : "text-cyan-400 hover:text-white"}
            transition-colors duration-200
            drop-shadow-sm
          `}
          style={{
            fontFamily: `'Noto Serif JP', serif`,
          }}
        >
          Darren Dong
        </Link>

        {/* Navigation Bar with Toggle to the Right */}
        <nav className="flex items-center gap-4 lg:gap-6">
          <Link 
            to="/Projects"
            className={`
              text-sm lg:text-base font-medium 
              font-sans 
              tracking-wide uppercase
              px-2 py-1 rounded transition-colors duration-200
              ${isWarmthMode
                ? "text-[#39536B] hover:text-[#E94E41] hover:bg-[#ffe2ed]/60"
                : "text-cyan-200 hover:text-white hover:bg-[#044064]/60"}
            `}
          >Projects</Link>
          {/* Link component 
            *
            * hover:bg-[#044064]/60: Defines the background hexcode color. The number refers to the opacity percantage (60% here)
            */}
          <Link 
            to="/Documents"
            className={`
              text-sm lg:text-base font-medium 
              font-sans 
              tracking-wide uppercase
              px-2 py-1 rounded transition-colors duration-200
              ${isWarmthMode
                ? "text-[#39536B] hover:text-[#E94E41] hover:bg-[#ffe2ed]/60"
                : "text-cyan-200 hover:text-white hover:bg-[#044064]/60"}
            `}
          >Documents</Link>
          <Link 
            to="/Timeline"
            className={`
              text-sm lg:text-base font-medium 
              font-sans 
              tracking-wide uppercase
              px-2 py-1 rounded transition-colors duration-200
              ${isWarmthMode
                ? "text-[#39536B] hover:text-[#E94E41] hover:bg-[#ffe2ed]/60"
                : "text-cyan-200 hover:text-white hover:bg-[#044064]/60"}
            `}
          >Timeline</Link>
          <Link 
            to="/FAQs"
            className={`
              text-sm lg:text-base font-medium 
              font-sans 
              tracking-wide uppercase
              px-2 py-1 rounded transition-colors duration-200
              ${isWarmthMode
                ? "text-[#39536B] hover:text-[#E94E41] hover:bg-[#ffe2ed]/60"
                : "text-cyan-200 hover:text-white hover:bg-[#044064]/60"}
            `}
          >FAQs</Link>
          <Link 
            to="/Changelog"
            className={`
              text-sm lg:text-base font-medium 
              font-sans 
              tracking-wide uppercase
              px-2 py-1 rounded transition-colors duration-200
              ${isWarmthMode
                ? "text-[#39536B] hover:text-[#E94E41] hover:bg-[#ffe2ed]/60"
                : "text-cyan-200 hover:text-white hover:bg-[#044064]/60"}
            `}
          >Changelog</Link>
          
          <button
            onClick={() => setIsWarmthMode(!isWarmthMode)}
            aria-pressed={!isWarmthMode}
            className={`
              relative w-16 h-8 flex items-center rounded-full mx-2 border-2 overflow-hidden
              transition-colors duration-300 focus:outline-none
              ${isWarmthMode 
                ? "bg-gradient-to-r from-[#FFE2ED] to-[#FAF3E3] border-[#e94e41]"
                : "bg-gradient-to-l from-[#073047] to-[#222B3A] border-cyan-500"}
              p-0
            `}
            tabIndex={0}
            title={isWarmthMode ? "Switch to Tech Mode" : "Switch to Warmth Mode"}
          >
            {/* Moon icon on left in the track */}
            <span className="
              absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center pointer-events-none
            ">
              <svg
                className={`w-5 h-5 transition-opacity duration-300
                  ${isWarmthMode ? "opacity-60" : "opacity-100"}
                `}
                viewBox="0 0 24 24" fill="none"
              >
                {/* SVG component
                * 
                * svg is scalable graphic vector that describes graphic using XML-based markup
                * viewBox: Sets the dimensions of the svg with the box going from (0, 0) to (24 24). They are unitless and are on an abstract plane that scales to the browser size
                * fill: Fills the box with a color, none in this case 
                * 
                */}
                <path
                  d="M17.75 15.61A7.5 7.5 0 0 1 8.39 6.25c.28 0 .36-.37.12-.49A7.501 7.501 0 1 0 18.24 16.37c-.13-.13-.5-.16-.49.12Z"
                  fill="#7DE3FC" />
                {/* Path component
                  * 
                  * Path is a component used within svg to draw complex shapes
                  * d: Draw attribute to give directions to the drawing. Each direction contains a letter for type of drawing follow by the dimensions from the preivous coordinate
                  *   - M (move) to coordinate (x, y). Move doesnt draw anything
                  *   - A (arc) draw an arc using (rx, ry, xrot, large, sweep, x, y) defining x radius and y radius of ellipse, the angle to rotate the ellipse's x-axis, drawing the large arc flag, the sweep direction where 1 is position, and the final ending (x, y) location
                  *   - c (relative cubic Bézier curve) draws a bezier curve defined the relative control points for three points. Each point gives the x and y direction to move from current point to define the next control point.
                  *   - Z (closepath) Draws a line from the current location to the previous M coordinate. If there are multiple M, it goes to the most recent M, creating a subpath
                  * fill: Sets the folow of the drawing
                  * 
                  */}
              </svg>
              
            </span>
            {/* Sun icon on right in the track */}
            <span className="
              absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center pointer-events-none
            ">
              <svg
                className={`w-5 h-5 transition-opacity duration-300
                  ${isWarmthMode ? "opacity-100" : "opacity-60"}
                `}
                viewBox="0 0 24 24" fill="none"
              >
                <circle cx="12" cy="12" r="5" fill="#FFC66D" />
                {/* Circle component
                  *  
                  * cx and cy: defines the center of the circle in the svg
                  * r: Defines the radius of the circle
                  * fill: Fills in the color of the circle
                  *   
                  */}
                <g stroke="#FFC66D" strokeWidth={2} strokeLinecap="round">
                  <line x1="12" y1="2.5" x2="12" y2="5" />
                  {/* line component
                    * 
                    * Line component draws a line from (x1, y1) to (x2, y2)
                    * 
                    */}
                  <line x1="12" y1="19" x2="12" y2="21.5" />
                  <line x1="4.93" y1="4.93" x2="6.76" y2="6.76" />
                  <line x1="17.24" y1="17.24" x2="19.07" y2="19.07" />
                  <line x1="2.5" y1="12" x2="5" y2="12" />
                  <line x1="19" y1="12" x2="21.5" y2="12" />
                  <line x1="4.93" y1="19.07" x2="6.76" y2="17.24" />
                  <line x1="17.24" y1="6.76" x2="19.07" y2="4.93" />
                </g>
                  {/* g components
                    * 
                    * g: Group container that affects the syling of children components
                    * 
                    */}
                  
              </svg>
            </span>

            <span
              className={`
                absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full shadow-md flex items-center justify-center
                border-2 z-10 bg-white transition-all duration-300
                ${isWarmthMode
                  ? "right-0 border-[#E94E41]"
                  : "left-0 border-cyan-600"}
              `}
            >
              {isWarmthMode ? (
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                  <circle cx="12" cy="12" r="5" fill="#FFC66D" />
                  <g stroke="#FFC66D" strokeWidth={2} strokeLinecap="round">
                    <line x1="12" y1="2.5" x2="12" y2="5" />
                    <line x1="12" y1="19" x2="12" y2="21.5" />
                    <line x1="4.93" y1="4.93" x2="6.76" y2="6.76" />
                    <line x1="17.24" y1="17.24" x2="19.07" y2="19.07" />
                    <line x1="2.5" y1="12" x2="5" y2="12" />
                    <line x1="19" y1="12" x2="21.5" y2="12" />
                    <line x1="4.93" y1="19.07" x2="6.76" y2="17.24" />
                    <line x1="17.24" y1="6.76" x2="19.07" y2="4.93" />
                  </g>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                  <path
                    d="M17.75 15.61A7.5 7.5 0 0 1 8.39 6.25c.28 0 .36-.37.12-.49A7.501 7.501 0 1 0 18.24 16.37c-.13-.13-.5-.16-.49.12Z"
                    fill="#7DE3FC" />
                </svg>
              )}
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}