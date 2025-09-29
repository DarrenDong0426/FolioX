// Imports
import { useState } from "react";                                           // Import useState from react
import { useEvents } from "../../hooks/eventsContext";                      // Import custom hook to fetch events    
import Controls from "./Controls";                                          // Import Controls component     
import Card from "../../components/Card";                                   // Import Card component      

{/* Event Sections of the Timeline page  
  * 
  * Renders a horizontal timeline of events with interactive markers.
  * Each event marker can be hovered or focused to display a detailed card above it.
  *
  */}
export default function Events() {
  // Fetch events using custom hook
  const { events, loading, error } = useEvents();

  // State to track which event is currently hovered or focused
  const [hoveredEventId, setHoveredEventId] = useState(null);

  // Handle loading and error states
  if (loading) return <p className='text-center text-gray-600'>LOADING...</p>
  if (error) return <p className='text-center text-red-600'>Error: {error.message}</p>

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-gray-50 py-8">
      {/* Container over control and timeline
        * 
        * flex: Set the layout as a flexbox
        * flex-col: Arrange children in a column
        * flex-1: Allow the container to grow and fill available space
        * min-h-0: Ensure the container can shrink properly within flex layouts
        * bg-gray-50: Light gray background color for the section
        * py-8: Vertical padding for spacing
        * 
        */}
      <Controls />
      <div className="flex-1 flex items-center justify-center min-h-0">
        {/* Context wrapper over timeline
          *  
          * flex-1: Allow the timeline to grow and fill available space
          * flex: Set the layout as a flexbox
          * items-center: Vertically center the timeline within the container
          * justify-center: Horizontally center the timeline within the container
          * min-h-0: Ensure the timeline can shrink properly within flex layouts
          * 
          */}
        <div className="flex items-center w-full max-w-screen-xl px-8 mx-auto">
          {/* Context wrapper over the line and marker
            *  
            * flex: Set the layout as a flexbox
            * items-center: Vertically center the line and markers
            * w-full: Make the timeline take the full width of its container
            * max-w-screen-xl: Limit the maximum width for better readability on large screens
            * px-8: Horizontal padding for spacing
            * mx-auto: Center the timeline horizontally within its container
            * 
            */}
          <span className="text-black text-lg mr-2 select-none">←</span>
          {/* Span context wrapper for left arrow
            * 
            * text-black: Set the arrow color to black
            * text-lg: Make the arrow larger for better visibility
            * mr-2: Add right margin to space it from the timeline
            * select-none: Prevent text selection on the arrow
            * 
            */}
          <div className="flex-1 h-0.5 bg-black relative overflow-visible">
            {/* Div context wrapper for the timeline line
              *
              * flex-1: Allow the line to grow and fill available horizontal space
              * h-0.5: Set a thin height for the line
              * bg-black: Make the line black for high contrast
              * relative: Set positioning context for absolute children (markers)\
              * overflow-visible: Allow markers and cards to overflow outside the line container
              *
              */}
            {events && events.length > 0 && events.map((event, idx) => {
              const percent = events.length === 1
                ? 50
                : (idx / (events.length - 1)) * 100;
              return (
                <div
                  key={event.id || idx}
                  className="absolute"
                  style={{
                    left: `${percent}%`,
                    width: 0,
                  }}
                >
                  {/* Div context wrapper for each event marker and label
                    *
                    * absolute: Position the marker absolutely within the timeline line
                    * 
                    */}
                  <div
                    className="flex flex-col items-center"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {/* Div context wrapper over marker and card
                      * 
                      * flex: Set the layout as a flexbox
                      * flex-col: Arrange children in a column
                      * items-center: Center children horizontally
                      *
                      */}
                    {hoveredEventId === event.id && (
                      <div
                        className="absolute left-1/2 z-50"
                        style={{
                          bottom: '2.5rem',
                          transform: 'translateX(-50%)',
                        }}
                      >
                        {/* Div context wrapper for the card
                          *  
                          * absolute: Position the card absolutely relative to the marker
                          * left-1/2: Center the card horizontally relative to the marker
                          * z-50: Ensure the card appears above other elements
                          * bottom: Position the card above the marker with some spacing
                          * transform translateX(-50%): translate the card left by 50% of its width to center it
                          *  
                          */}
                        <Card
                          title={event.title}
                          desc={event.description}
                          tags={event.tags}
                          date={event.date}
                          images={event.images}
                        />
                      </div>
                    )}
                    <div
                      className="w-5 h-5 bg-blue-600 rounded-full border-2 border-white shadow-md cursor-pointer transition outline-none"
                      tabIndex={0}
                      onMouseEnter={() => setHoveredEventId(event.id)}
                      onMouseLeave={() => setHoveredEventId(null)}
                      onFocus={() => setHoveredEventId(event.id)}
                      onBlur={() => setHoveredEventId(null)}
                    />
                    {/* Div context wrapper for the marker
                      * 
                      * w-5 h-5: Set the size of the marker
                      * bg-blue-600: Blue background color for the marker
                      * rounded-full: Make the marker circular
                      * border-2 border-white: White border for contrast against the line
                      * shadow-md: Add shadow for depth
                      * cursor-pointer: Change cursor to pointer on hover
                      * transition: Smooth transitions for hover/focus effects
                      * 
                      */}
                  </div>
                  <div
                    className="absolute left-1/2 w-max pointer-events-none"
                    style={{
                      top: "calc(50% + 1.7rem)",
                      transform: "translateX(-50%)",
                    }}
                  >
                    {/* Div context wrapper for the event title label 
                      * 
                      * absolute: Position the label absolutely relative to the marker
                      * left-1/2: Center the label horizontally relative to the marker
                      * w-max: Allow the label to take up only as much width as needed
                      * pointer-events-none: Prevent the label from interfering with mouse events on the marker
                      * 
                      */}
                    <div
                      className="absolute left-1/2 w-max pointer-events-none select-none"
                      style={{
                        top: "calc(50% + 2.2rem)",
                        transform: "translateX(-50%)",
                      }}
                    >
                      {/* Div context wrapper for the title span
                        *
                        * absolute: Position the title absolutely relative to the marker
                        * left-1/2: Center the title horizontally relative to the marker
                        * w-max: Allow the title to take up only as much width as needed
                        * pointer-events-none: Prevent the title from interfering with mouse events on the marker
                        * select-none: Prevent text selection on the title
                        * 
                        */}
                      <span
                        className="
                          inline-block
                          px-3 py-1
                          rounded-full
                          bg-gradient-to-r from-blue-100 via-white to-yellow-100
                          text-blue-700
                          font-semibold
                          text-sm
                          shadow
                          border border-blue-200
                          tracking-wide
                          transition
                          duration-150
                          hover:scale-105
                        "
                        style={{
                          filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.07))",
                        }}
                      >
                        {/* Span for the event title
                          * 
                          * inline-block: Allow padding and margin to be applied
                          * px-3 py-1: Padding for spacing around the text
                          * rounded-full: Rounded edges for a pill-shaped appearance
                          * bg-gradient-to-r from-blue-100 via-white to-yellow-100: Gradient background for visual interest
                          * text-blue-700: Blue text color for readability
                          * font-semibold: Semi-bold font weight for emphasis
                          * text-sm: Smaller text size for the label
                          * shadow: Subtle shadow for depth
                          * border border-blue-200: Light blue border for definition
                          * tracking-wide: Slightly increased letter spacing for readability
                          * transition duration-150: Smooth transition effects on hover
                          * hover:scale-105: Slightly enlarge the label on hover for interactivity
                          * filter drop-shadow: Add a subtle drop shadow for better visibility against various backgrounds
                          * 
                          */}
                        {event.title}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <span className="text-black text-lg ml-2 select-none">→</span>
        </div>
      </div>
    </div>
  );
}