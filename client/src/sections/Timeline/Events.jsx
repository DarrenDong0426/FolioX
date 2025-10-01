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

  const jan = new Date(year, 0, 1).getTime();
  const dec = new Date(year, 11, 31).getTime();
  const timeToPercent = (time) => ((time - jan) / (dec - jan)) * 100;
  const monthLabels = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));

  const formatMonthYear = (date) =>
    new Date(date).toLocaleString("default", { month: "short", year: "numeric" });

  function colorCodeFunc(type) {
    switch (type.toLowerCase()) {
      case "academics":
        return { bg: "#DBEAFE", text: "#1E40AF" };   // blue-100 / blue-800
      case "professional":
        return { bg: "#D1FAE5", text: "#166534" };   // green-100 / green-800
      case "personal":
        return { bg: "#FBCFE8", text: "#BE185D" };   // pink-100 / pink-800
      case "projects":
        return { bg: "#FEF9C3", text: "#78350F" };   // yellow-100 / yellow-800
      case "research":
        return { bg: "#E9D5FF", text: "#6B21A8" };   // purple-100 / purple-800
      default:
        return { bg: "#F3F4F6", text: "#1F2937" };   // gray-100 / gray-800
    }
  }


  const timelineWidth = 2000; // px, or dynamically from a ref/resize observer
  const itemSpacing = 16;    // px gap/padding per item
  const minWidth = 50;       // px
  const maxWidth = 140;      // px

  const labelMaxWidth = events.length
    ? Math.max(
        minWidth,
        Math.min(
          maxWidth,
          ((timelineWidth - (events.length * itemSpacing)) / events.length)
        )
      )
    : maxWidth;

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
      <div className="flex border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white rounded-t-lg shadow-sm mb-4">
        <div className="w-40 bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-700">
          Events
        </div>
        <div className="flex-1 relative h-12">
          {monthLabels.map((month, idx) => {
            const percent = timeToPercent(month.getTime());
            return (
              <div
                key={idx}
                className="absolute flex flex-col items-center text-xs"
                style={{ left: `${percent}%`, transform: "translateX(-50%)" }}
              >
                {/* Guideline */}
                <div className="h-6 w-px bg-gray-300"></div>
                {/* Month pill */}
                <span className="mt-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium shadow-sm">
                  {month.toLocaleString("default", { month: "short" })}
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

        // Define the year boundaries
        const janOfYear = new Date(year, 0, 1).getTime();   // Jan 1 of selected year
        const decOfYear = new Date(year, 11, 31).getTime(); // Dec 31 of selected year

        // Clip event times so they stay within the selected year
        const clippedStart = Math.max(eventStart.getTime(), janOfYear);
        const clippedEnd = Math.min(eventEnd.getTime(), decOfYear);

        // Convert to percentages along the timeline
        const startPercent = timeToPercent(clippedStart);
        const endPercent = timeToPercent(clippedEnd);
        const widthPercent = endPercent - startPercent || 2;

        return (
          <div key={event.id || idx} className="flex items-center border-b border-gray-300"
              onMouseEnter={() => setHoveredEventId(event.id)}
              onMouseLeave={() => setHoveredEventId(null)}>
            {/* Event name */}
            <div
              className={`w-40 text-right pr-4 text-sm font-semibold m-1`}
              style={{
                backgroundColor: colorCodeFunc(event.tags).bg,
                borderWidth: "5px",
              }}
            >
              {event.title}
            </div>
            {/* Bar container */}
            <div className="flex-1 relative h-8 border-gray-300">
              <div
                className={`absolute h-8 rounded shadow cursor-pointer`}
                style={{ left: `${startPercent}%`, 
                          width: `${widthPercent}%`,
                          backgroundColor: colorCodeFunc(event.tags).bg, }}
              ></div>

              {/* Time label */}
              <div
                className="absolute h-8 flex items-center text-xs text-gray-800 font-medium"
                style={{
                  left: `${endPercent - startPercent === 0 ? startPercent + 2 : endPercent}%`,
                  transform: "translateX(4px)",
                }}
              >
                {formatMonthYear(event.start)} - {formatMonthYear(event.end || event.start)}
              </div>

              {/* Hover Card */}
              {hoveredEventId === event.id && (
              <div
                className="absolute bottom-full mb-2 z-50"
                style={{
                  left: `${startPercent}%`,
                  transform: "translateX(0%)", // aligns exactly with start
                }}
              >
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