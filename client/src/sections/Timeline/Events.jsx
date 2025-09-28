// Imports
import { useEvents } from "../../hooks/eventsContext";                      // Imports useState from React
import Controls from "./Controls";                                          // Imports Controls component 


/* *
 * Event Compoment
 * 
 * Renders the timeline with controls and event markers.
 * 
 */
export default function Events(){
  // Retrieve relevant state and functions from the useEvents hook
  const {
    events, setEvents, loading,
    error, year, setYear,
    filters, setFilters, filterOpen,
    setFilterOpen, getEvents
  } = useEvents(); 

  // Handles loading and error state for page
  if (loading){
    return <p className='text-center text-gray-600'>LOADING...</p>
  }
  if (error){
    return <p className='text-center text-red-600'>Error: {error.message}</p>
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Context wrapper for controls and timeline
        *  
        * flex: Use flexbox layout
        * flex-col: Arrange children in a column
        * flex-1: Allow to grow and fill available space
        * min-h-0: Prevent overflow issues with flex children
        * 
        */}
      <Controls />
      <div className="flex-1 flex items-center justify-center min-h-0">
        {/* Timeline container
          * 
          * flex: Use flexbox layout
          * items-center: Vertically center children
          * justify-center: Horizontally center children
          * min-h-0: Prevent overflow issues with flex children
          */}
        <div className="flex items-center w-full max-w-screen-xl px-8 mx-auto">
          {/* Context wrapper for timeline line and markers
            * flex: Use flexbox layout
            * items-center: Vertically center children
            * w-full: Full width
            * max-w-screen-xl: Limit max width to screen-xl size
            * px-8: Horizontal padding
            * mx-auto: Center horizontally with auto margins
            * 
            */}
          <span className="text-black text-lg mr-2">←</span>
          {/* Span wrapper for left arrow 
            * 
            * text-black: Black text color
            * text-lg: Large text size
            * mr-2: Right margin
            * 
            */}
          <div className="flex-1 h-0.5 bg-black relative">
            {/* Timeline line container
              *
              * flex-1: Allow to grow and fill available space
              * h-0.5: Height of 0.5 (2px)
              * bg-black: Black background color  
              * relative: Position relative for absolute children
              * 
              */}
            {events && events.length > 0 && events.map((event, idx) => {
              let left;
              if (events.length === 1) {
                left = '50%';
              } else {
                left = `${(idx / (events.length - 1)) * 100}%`;
              }
              return (
                <div
                  key={event.id || idx}
                  className="absolute"
                  style={{
                    left: `calc(${left} - 0.5rem)`,
                    top: "50%",
                    transform: "translateY(-50%)"
                  }}
                >
                {/* Container for each event marker
                  * 
                  * absolute: Position absolute within relative parent
                  * left: Position from left based on index
                  * top: Center vertically
                  * transform: Translate up by 50% of its height to center
                  * 
                  */}
                  <div
                    className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow"
                    title={event.name}
                  />
                  {/* Event marker
                    * 
                    * w-4: Width of 1rem (16px)
                    * h-4: Height of 1rem (16px)
                    * bg-blue-600: Blue background color
                    * rounded-full: Fully rounded (circle)
                    * border-2: Border width of 2
                    * border-white: White border color
                    * shadow: Apply shadow for depth
                    * 
                    */}
                </div>
              );
            })}
          </div>

          <span className="text-black text-lg ml-2">→</span>
          {/* Span wrapper for right arrow 
            * 
            * text-black: Black text color
            * text-lg: Large text size
            * ml-2: Left margin
            * 
            */}
        </div>
      </div>
    </div>
  );
}