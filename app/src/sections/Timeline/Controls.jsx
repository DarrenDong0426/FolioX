// Imports
import { useState, useRef } from 'react';                       // Import useState and useRef from React       
import Filter from '../../components/Filter';                   // Import Filter component
import { useEvents } from '../../hooks/eventsContext';         // Import custom hook to fetch events      
import { useTheme } from "../../hooks/themeContext";           // Add: Import theme context

{/* Controls component for the Timeline page
  *
  * A navigation bar with the current date
  * Arrows on both sides to toggle to previous and future years limited by 2020 and the current year
  * Click on the year to edit it directly
  * A filter button to open the filter menu
  *  
  */}
export default function Controls() {

  const { isWarmthMode } = useTheme(); // Add: Get theme state

  // Get the current year for upper bound
  const currentYear = new Date().getFullYear();

  // Get for timeline states from context 
  const {
    year, setYear, filters, setFilters, filterOpen, setFilterOpen,
  } = useEvents();

  const [editing, setEditing] = useState(false);            // State to track if the year is being edited 
  const [temp, setTemp] = useState(year);                     // Temporary state to hold the year input value     
  const inputRef = useRef();                                // Ref for the year input field    

  // Function to update year and temp value on edit 
  const startEdit = () => {
    setYear(year);
    setEditing(true);
    setTimeout(() => inputRef.current && inputRef.current.focus(), 0);
  };

  // Function to save clamped year on exit or timeout
  const finishEdit = () => {
    setEditing(false);
    let clamped = Math.max(2020, Math.min(currentYear, Number(temp)));
    setTemp(clamped.toString());
    if (clamped.toString() !== year && temp) setYear(clamped.toString());
    setTimeout(() => inputRef.current && inputRef.current.focus(), 0);     //  Refocus the input field after updating the year
  };


  // Get filter sections
  const filterSections = [
    {
      title: "Categories",
      options: [
        { label: "Personal",  type: "Personal"   },
        { label: "Projects",  type: "Projects"      },
        { label: "Professional", type: "Professional" },
        { label: "Research", type: "Research" }
      ]
    }
  ];

  return (
    <div className={`w-full max-w-screen-xl mx-auto mb-6 px-4 flex justify-center ${
      isWarmthMode
        ? "bg-[#fff7f7]"
        : "bg-[#181b20]"
    }`}>
      {/* Context wrapper for Controls for the Timeline Page
        * 
        * w-full: Component takes up the full width of the container
        * m-wax-screen-xl: Maximum width is set to extra-large screen size
        * mx-auto: Horizontally centers the component within its parent
        * mb-6: Adds margin below the component for spacing
        * px-4: Adds horizontal padding inside the component
        * flex: Uses Flexbox layout for arranging child elements
        * justify-center: Centers child elements horizontally within the component
        * 
        */}
      <div className="flex items-center space-x-4">
        {/* Navigation controls 
          *
          * flex : Uses Flexbox layout for arranging child elements
          * items-center : Vertically centers child elements within the container
          * space-x-4 : Adds horizontal spacing between child elements
          * 
          */}
        <button
          onClick={() => {
            setYear(prev => {
              const newYear = Math.max(2020, prev - 1);
              setYear(newYear);
              setTemp(newYear.toString());
              return newYear;
            });
          }}
          className={`px-3 py-1 rounded-md font-semibold transition-colors duration-200 border ${
            isWarmthMode
              ? "bg-[#ffeaea] hover:bg-[#fae1e1] text-[#d45d5d] border-[#ffd0d0]"
              : "bg-[#23272e] hover:bg-[#32373f] text-cyan-300 border-cyan-900"
          }`}
        >
          {/* Button to Go to previous year */}
          ←
        </button>
        {editing ? (
          // Input field for editing year
          <input
            ref={inputRef}
            type="text"
            value={temp}
            onChange={e => setTemp(e.target.value.replace(/[^0-9]/g, ""))}
            onBlur={finishEdit}
            onKeyDown={e => e.key === "Enter" && finishEdit()}
            className={`px-4 py-1 rounded-md font-semibold shadow-sm w-20 text-center border-2 transition-colors duration-200 focus:outline-none ${
              isWarmthMode
                ? "bg-white text-[#E94E41] border-[#ffd9cf] focus:border-[#E94E41]"
                : "bg-[#23272e] text-cyan-300 border-cyan-800 focus:border-cyan-400"
            }`}
          />
        ) : (
          <div
            className={`px-4 py-1 rounded-md font-semibold shadow-sm cursor-pointer border transition-colors duration-200 ${
              isWarmthMode
                ? "bg-[#fff3ea] text-[#e94e41] border-[#ffd8d7] hover:border-[#E94E41]"
                : "bg-[#1c2232] text-cyan-300 border-cyan-900 hover:border-cyan-300"
            }`}
            onDoubleClick={startEdit}
            title="Double-click to edit"
          >
          {/* Context Wrapper for year display */}
          {year}
          </div>
        )}

        <button
          onClick={() => {
            setYear(prev => {
              const newYear = Math.min(currentYear, prev + 1);
              setYear(newYear);
              setTemp(newYear.toString());
              return newYear;
            });
          }}
          className={`px-3 py-1 rounded-md font-semibold transition-colors duration-200 border ${
            isWarmthMode
              ? "bg-[#ffeaea] hover:bg-[#fae1e1] text-[#d45d5d] border-[#ffd0d0]"
              : "bg-[#23272e] hover:bg-[#32373f] text-cyan-300 border-cyan-900"
          }`}
        >
          {/* Button to go to next year */}
          →
        </button>
        <div className="ml-4">
          {/* Filter component wrapper */}
          <Filter
            filters={filters}
            setFilters={setFilters}
            filterOpen={filterOpen}
            setFilterOpen={setFilterOpen}
            filterSections={filterSections}
          />
        </div>
      </div>
    </div>
  );
}