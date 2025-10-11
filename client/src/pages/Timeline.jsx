// Imports
import Header from "../components/Header";                               // Imports the Header component from the path ../components/Header.jsx
import { EventProvider } from "../hooks/eventsContext";                  // Import EventProvider from the path ../hooks/eventsContext.jsx
import Events from "../sections/Timeline/Events";                        // Import Events component from the path ../sections/Timeline/Events.jsx
import { useTheme } from '../hooks/themeContext.jsx';                   // Import theme context

/* *
 * Timeline page
 * 
 * Displays project/events in chronological order.
 * 
 */
export default function Timeline(){
  const { isWarmthMode } = useTheme();

  // Compute dynamic background
  const bgGradient = isWarmthMode
    ? "radial-gradient(ellipse 80% 60% at 20% 10%,rgba(255,226,237,0.7) 60%,#fff8f3 100%)"
    : "radial-gradient(ellipse 80% 60% at 20% 10%,rgba(22,34,57,0.88) 60%,#1b2432 100%)";

  return (
    <div className="relative min-h-screen">
      {/* Overlay background: covers the entire page regardless of content or z-index */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          zIndex: 0,
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          background: bgGradient,
        }}
      />
      {/* Div: Content Wrapper over the entire home page
        *
        * min-h-screen sets the minimum height of the element to be 100% of the viewpoint height (the entire browser window screen)
        * flex sets the children to be in a flexbox format
        * flex-col sets the flex direction to be columns so children are placed vertically
        * The background color is now force-overlaid underneath all content by an absolutely positioned/fixed div
        *  
      */}
      <div className="flex flex-col min-h-screen relative z-10 transition-colors duration-500">
        <Header/>
        <main className='flex flex-col flex-1 min-h-0'> {/* Removed px-4 to remove left/right gap */}
          {/* Main: Content Wrapper over all sections. Main is used to identify the "main" part of this page
            *
            * flex-1 fills in the flex direction (column here)
            * overflow-y-auto shows scrollbar if children overflow. Otherwise, no scrollbar
            * py-3 sets the vertical padding 
            * min-h-0 ensures that the main can shrink below its content size when inside a flex container
            *  
            */}
          <h1
            style={{ fontFamily: "'Orbitron', 'Arial', sans-serif" }}
            className={`
              text-4xl font-bold mb-3 mt-3 text-center transition-colors tracking-wide uppercase drop-shadow-sm
              ${isWarmthMode ? "text-[#E94E41]" : "text-cyan-300"}
            `}
          >
            Timeline
          </h1>
          {/* h1: Overall project heading of the page
            *
            * text-4xl sets the text size of the heading to extra large 4x
            * font-bold sets the text emphasis to bold
            * mb-8 adds a margin to the bottom of the component
            * text-center puts the text in the center of the flex direction (horizontal here)
            * transition-colors for smooth theme transitions
            * tracking-wide for wider letters
            * uppercase for all caps
            * drop-shadow-sm for subtle shadow
            * dynamic color per theme
            *  
            */}
            
          <EventProvider>
            {/* Wrap the Events component with EventProvider to provide context */}
            <Events/>
          </EventProvider>
        </main>
      </div>
    </div>
  );
}
