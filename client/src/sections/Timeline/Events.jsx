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
  const { events, loading, error, year } = useEvents();

  // Constants to get first month and last month
  const jan = new Date(year, 0, 1).getTime();
  const dec = new Date(year, 11, 31).getTime();

  // Get percentage of the year 
  const timeToPercent = (time) => ((time - jan) / (dec - jan)) * 100;

  // Get month labels
  const monthLabels = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));

  // Function to format Date as month's shorten name and the numeric year
  const formatMonthYear = (date) =>
    new Date(date).toLocaleString("default", { month: "short", year: "numeric" });

  // Function to get color based on the tag
  function colorCodeFunc(type) {
    switch (type.toLowerCase()) {
      case "academics":
        return { bg: "#DBEAFE", text: "#1E40AF" }; 
      case "professional":
        return { bg: "#D1FAE5", text: "#166534" };  
      case "personal":
        return { bg: "#FBCFE8", text: "#BE185D" };   
      case "projects":
        return { bg: "#FEF9C3", text: "#78350F" };  
      case "research":
        return { bg: "#E9D5FF", text: "#6B21A8" };  
      default:
        return { bg: "#F3F4F6", text: "#1F2937" };   
    }
  }

  // State to track which event is currently hovered or focused
  const [hoveredEventId, setHoveredEventId] = useState(null);

  // Handle loading and error states
  if (loading) return <p className='text-center text-gray-600'>LOADING...</p>
  if (error) return <p className='text-center text-red-600'>Error: {error.message}</p>

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-gray-50 py-2">
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
      <div className="flex border-b border-gray-200 rounded-t-lg shadow-sm mb-4">
        {/* Div context wrapper over the month labels of the timeline
          * 
          * flex: Set the container in flexbox 
          * border-b: Adds a bottom border
          * border-gray-200: Sets the border color as gray
          * rounded-t-lg: Set the top corner to rounded
          * shadow-sm: Add a small shadow
          * mb-4: Adds a margin to the bottom
          * 
          */}
        <div className="w-40 bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-700">
          {/* Div context wrapper over the Events label
            * 
            * w-40: Sets the width to 40
            * bg-gray-100: Sets the background color to gray
            * flex: Set the container to flexbox
            * items-center: Move the item in the container to the center on the cross axis
            * justify-center: Move the item in the container to the center on the axis
            * text-sm: Sets the text size to small
            * font-semibold: Sets the font to be bold
            * text-gray-700: Sets the text color to gray 
            * 
            */}
          Events
        </div>
        <div className="flex-1 relative h-12">
          {/* Div Context wrapper 
            *
            * flex-1: Allows the container to take up the entire space
            * relative: Sets the container to relative so childrne components can use this as a reference point
            * h-12: Adds a height
            * 
            */}
          {monthLabels.map((month, idx) => {
            const percent = timeToPercent(month.getTime());
            return (
              <div
                key={idx}
                className="absolute flex flex-col items-center text-xs"
                style={{ left: `${percent}%`, transform: "translateX(-50%)" }}
              >
                {/* Div context wrapper 
                  *
                  * absolute: Set each of the month to be absolute positioning relative to the Event labels
                  * flex: Sets this container as flexbox
                  * flex-col: Sets the children to be in a columns
                  * items-center: Sets the component to be centered on the cross-axis
                  * text-xs: Sets the text size to extra small
                  * 
                  */}
                <div className="h-6 w-px bg-gray-300"></div>
                {/*  Div Container for the pillar for each month
                  *
                  * h-6: Sets the container height
                  * w-px: Sets the container width to 1 px
                  * bg-gray-300: Sets the background of the container to gray
                  * 
                  */}
                <span className="mt-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium shadow-sm">
                  {/* Span context wrapper for each month label 
                    * 
                    * mt-1: Adds a margin to the top
                    * px-2: Adds a padding in the x-direction
                    * py-0.5: Adds a padding in the y-direction
                    * rounded-full: Sets the container to have rounded corners
                    * bg-blue-50: Sets the background to blue 
                    * text-blue-700: Sets the text color to blue
                    * font-medium: Sets the text to bold
                    * shadow-sm: Adds a small shadow  
                    * 
                    */}
                  {month.toLocaleString("default", { month: "short" })}
                  {/* Sets the month to its shortened form in the format set by toLocaleString */}
                </span>
              </div>
            );
          })}
        </div>
      </div>
       {events.map((event, idx) => {

        // Convert event start/end to Date 
        const eventStart = new Date(event.start);
        const eventEnd = new Date(event.end || event.start);

        // Define the year boundaries as Jan and Dec (0-indexed)
        const janOfYear = new Date(year, 0, 1).getTime();   
        const decOfYear = new Date(year, 11, 31).getTime(); 

        // Clip event times so they stay within the selected year
        const clippedStart = Math.max(eventStart.getTime(), janOfYear);
        const clippedEnd = Math.min(eventEnd.getTime(), decOfYear);

        // Convert to percentages along the timeline. 
        const startPercent = timeToPercent(clippedStart);
        const endPercent = timeToPercent(clippedEnd);

        // Get the size of the width in percents. Default to 2 if start = end
        const widthPercent = endPercent - startPercent || 2;

        return (
          <div key={event.id || idx} className="flex items-center border-b border-gray-300"
              onMouseEnter={() => setHoveredEventId(event.id)}
              onMouseLeave={() => setHoveredEventId(null)}>
            {/* Div context wrapper for each Event row 
              * 
              * flex: Sets the container as a flexbox
              * items-center: Centers the event name on the cross-axis
              * border-b: Adds a bottom border
              * border-gray-300: Sets the border color to gray
              * 
              */}

            
            {/* Event Title */}
            <div
              className={`w-40 text-center pr-4 text-sm font-semibold m-1`}
              style={{
                backgroundColor: colorCodeFunc(event.tags).bg,
                borderWidth: "5px",
              }}
            >
              {/* Div context wrapper for each event title
                * 
                * w-40: Sets the width
                * text-center: Positions the event title to the center
                * pr-4: Adds a padding to the right
                * text-sm: Sets the text size to small
                * font-semibold: Sets the text to be bolded
                * m-1: Adds a margin to all sides
                * 
                */}
              {event.title}
            </div>
            <div className="flex-1 relative h-8 border-gray-300">
              {/* Div container for the line component of each event
                *  
                * flex-1: Allows the container to take up the rest of the space
                * relative: Sets the container as relative for reference by children components
                * h-8: Sets the height
                * border-gray-300: Sets the border color to gray  
                * 
                */}

              {/* Timeline Block */}
              <div
                className={`absolute h-8 rounded shadow cursor-pointer`}
                style={{ left: `${startPercent}%`, 
                          width: `${widthPercent}%`,
                          backgroundColor: colorCodeFunc(event.tags).bg, }}
              ></div>
              {/* Div context wrapper for the block on the line for each event 
                * 
                * absolute: Sets the container to an absolute positioning
                * h-8: Sets the height 
                * rounded: Sets the container to have rounded corners
                * shadow: Adds a shadow
                * cursor-pointer: Sets the cursor to a pointer when on container
                * 
                */}

              {/* Time Label */}
              <div
                className="absolute h-8 flex items-center text-xs text-gray-800 font-medium"
                style={{
                  left: `${endPercent - startPercent === 0 ? startPercent + 2 : endPercent}%`,
                  transform: "translateX(4px)",
                }}
              >
                {formatMonthYear(event.start)} - {formatMonthYear(event.end || event.start)}
              </div>
              {/* Div context wrapper over the time span label 
                *  
                * absolute: sets the container to have absolute positioning
                * h-8: Sets a height to the container
                * flex: Sets the container as a flexbox
                * items-center: Sets the items to be centered on the cross-axis
                * text-xs: Sets the text size to extra small
                * text-gray-800: Sets the color of the text to gray
                * font-medium: Sets the text to be bolded
                * 
                */}

              {/* Hover Card */}
              {hoveredEventId === event.id && (
              <div
                className="absolute bottom-full mb-2 z-50"
                style={{
                  left: `${startPercent}%`,
                }}
              >
                {/* Div context wrapper for the hover card
                  * 
                  * absolute: Sets the container to absolute positioning
                  * bottom-full: Moves the container up by full size of the parent container
                  * mb-2: Adds a margin to the bottom
                  * z-50: Sets the z-scale to 50 to be above other containers
                  * left: `${startPercent}%`: Start the card above the line block by moving it left the same percent
                  * 
                  */}
                <Card
                  title={event.title}
                  desc={event.desc}
                  tags={event.tags}
                  date={event.start}
                  images={event.images}
                />
              </div>
            )}
            </div>
          </div>
        );
      })}
    </div>
  );
}