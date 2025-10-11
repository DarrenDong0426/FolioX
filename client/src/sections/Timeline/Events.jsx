import { useState } from "react";                                          
import { useEvents } from "../../hooks/eventsContext";                      
import Controls from "./Controls";                                          
import Card from "../../components/Card";                                   
import { useTheme } from "../../hooks/themeContext";                        

export default function Events() {
  const { events, loading, error, year } = useEvents();
  const { isWarmthMode } = useTheme();

  const jan = new Date(year, 0, 1).getTime();
  const dec = new Date(year, 11, 31).getTime();

  const timeToPercent = (time) => ((time - jan) / (dec - jan)) * 100;
  const monthLabels = Array.from({ length: 12 }, (_, i) => new Date(year, i, 1));
  const formatMonthYear = (date) => new Date(date).toLocaleString("default", { month: "short", year: "numeric" });

  function colorCodeFunc(type) {
    switch (type.toLowerCase()) {
      case "academics":
        return { bg: isWarmthMode ? "#FFF4E6" : "#0f1120", text: isWarmthMode ? "#3B185F" : "#0ff", bar: isWarmthMode ? "#EAB308" : "#0ff" }; 
      case "professional":
        return { bg: isWarmthMode ? "#E6F9F0" : "#10141c", text: isWarmthMode ? "#166534" : "#0f0", bar: isWarmthMode ? "#16A34A" : "#0f0" };  
      case "personal":
        return { bg: isWarmthMode ? "#FFF0F3" : "#1a0d1f", text: isWarmthMode ? "#BE185D" : "#f0f", bar: isWarmthMode ? "#DB2777" : "#f0f" };   
      case "projects":
        return { bg: isWarmthMode ? "#FFFBE6" : "#1c1a10", text: isWarmthMode ? "#78350F" : "#ff0", bar: isWarmthMode ? "#D97706" : "#ff0" };  
      case "research":
        return { bg: isWarmthMode ? "#F3E8FF" : "#100f1e", text: isWarmthMode ? "#6B21A8" : "#a0f", bar: isWarmthMode ? "#7C3AED" : "#a0f" };  
      default:
        return { bg: isWarmthMode ? "#F3F4F6" : "#101010", text: isWarmthMode ? "#1F2937" : "#fff", bar: isWarmthMode ? "#9CA3AF" : "#fff" };   
    }
  }

  const [hoveredEventId, setHoveredEventId] = useState(null);

  if (loading) return <p className='text-center text-gray-600'>LOADING...</p>
  if (error) return <p className='text-center text-red-600'>Error: {error.message}</p>

  return (
    <div className={`flex flex-col flex-1 min-h-0 py-2 ${isWarmthMode ? "bg-[#FFF5EE]" : "bg-[#191b22]"}`}>
      <Controls />
      <div
        className={`flex border-t-4 border-b-4 rounded-t-lg shadow-sm mb-4 transition-colors duration-300 ${
          isWarmthMode
            ? "border-[#E94E41] bg-[#FFF5EE]" // warm mode: coral thick borders
            : "border-cyan-500 bg-[#181b20]"  // dark mode: cyan thick borders
        }`}
      >
      <div className={`w-40 flex items-center justify-center text-sm font-semibold ${isWarmthMode ? "bg-[#fffaf0] text-[#8B2D2D]" : "bg-[#181b20] text-cyan-400"}`}>
          Events
        </div>
        <div className="flex-1 relative h-12 ">
        {monthLabels.map((month, idx) => {
          const percent = timeToPercent(month.getTime());

          // Choose color for the month marker (matches your other UI)
          const monthColor = isWarmthMode
            ? { bg: "#F3E8FF", text: "#6B21A8", bar: "#7C3AED" }   // Light mode gradient example
            : { bg: "#23273c", text: "#0ff", bar: "#0ff" };         // Dark mode gradient

          return (
            <div
              key={idx}
              className="absolute flex flex-col items-center text-xs"
              style={{
                left: `${percent}%`,
                transform: idx === 0 ? "none" : "translateX(-50%)",
              }}
            >
              {/* Vertical bar */}
              <div
                className={`h-6 w-px border-2 transition-colors duration-300 ${
                  isWarmthMode
                    ? "border-[#E94E41] bg-[#FFF5EE]" // warm mode: coral thick borders
                    : "border-cyan-500 bg-[#181b20]"  // dark mode: cyan thick borders
                }`}
                style={{ backgroundColor: monthColor.bar }}
              ></div>

              {/* Month label */}
              <span
                className="mt-1 px-2 py-0.5 rounded-full font-medium shadow-sm"
                style={{
                  backgroundColor: monthColor.bg,
                  color: monthColor.text,
                }}
              >
                {month.toLocaleString("default", { month: "short" })}
              </span>
            </div>
          );
        })}
      </div>

      </div>
      {events.map((event, idx) => {
        const eventStart = new Date(event.start);
        const eventEnd = new Date(event.end || event.start);

        const janOfYear = new Date(year, 0, 1).getTime();   
        const decOfYear = new Date(year, 11, 31).getTime(); 

        const clippedStart = Math.max(eventStart.getTime(), janOfYear);
        const clippedEnd = Math.min(eventEnd.getTime(), decOfYear);

        const startPercent = timeToPercent(clippedStart);
        const endPercent = timeToPercent(clippedEnd);

        const widthPercent = endPercent - startPercent || 2;

        const color = colorCodeFunc(event.tags);

        return (
           <div
              key={event.id || idx}
              className={`flex items-center transition-colors duration-300`}
              onMouseEnter={() => setHoveredEventId(event.id)}
              onMouseLeave={() => setHoveredEventId(null)}
            >
              {/* Event title */}
              <div
                className="w-40 text-center text-sm font-semibold rounded transition-colors duration-300"
                style={{
                  backgroundColor: color.bg,
                  color: color.text,
                  border: `2px solid ${isWarmthMode ? "#E94E41" : "#0ff"}`,
                  padding: "0.5rem",
                }}
              >
                {event.title}
              </div>

              {/* Event bar container */}
              <div className="flex-1 relative h-8 ml-2 rounded">
                {/* Timeline bar */}
                <div
                  className="absolute h-6 rounded shadow"
                  style={{
                    left: `${startPercent}%`,
                    width: `${widthPercent}%`,
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: color.bar,
                  }}
                />

                {/* Dates */}
                <div
                  className="absolute h-full flex items-center text-xs font-medium"
                  style={{
                    left: `${endPercent - startPercent === 0 ? startPercent + 2 : endPercent}%`,
                    transform: "translateX(4px)",
                    color: isWarmthMode ? "#4B5563" : "#0ff",
                  }}
                >
                  {formatMonthYear(event.start)} - {formatMonthYear(event.end || event.start)}
                </div>

                {/* Hover card */}
                {hoveredEventId === event.id && (
                  <div
                    className="absolute bottom-full mb-2 z-50"
                    style={{ left: `${startPercent}%` }}
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
