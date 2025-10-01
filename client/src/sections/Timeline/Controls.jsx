// Imports
import { useState, useRef } from 'react';                       // Import useState and useRef from React       
import Filter from '../../components/Filter';                   // Import Filter component
import { useEvents } from '../../hooks/eventsContext';         // Import custom hook to fetch events      

{/* Controls component for the Timeline page
  *
  * A navigation bar with the current date
  * Arrows on both sides to toggle to previous and future years limited by 2020 and the current year
  * Click on the year to edit it directly
  * A filter button to open the filter menu
  *  
  */}
export default function Controls() {
  
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


  // ColorCode Function for filter
  function colorCodeFunc(type) {
    switch (type.toLowerCase()) {
      case "academics":
        return "bg-blue-100 text-blue-800";
      case "professional":
        return "bg-green-100 text-green-800";
      case "personal":
        return "bg-pink-100 text-pink-800";
      case "projects":
        return "bg-yellow-100 text-yellow-800";
      case "research":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

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
    <div className="w-full max-w-screen-xl mx-auto mb-6 px-4 flex justify-center">
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
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 font-semibold transition-colors duration-200"
        >
          {/* Button to Go to previous year
            * px-3 : Adds horizontal padding inside the button
            * py-1 : Adds vertical padding inside the button
            * bg-gray-200 : Sets the background color to light gray
            * hover:bg-gray-300 : Darkens the background on hover for interactivity
            * rounded-md : Applies medium border radius for rounded corners
            * text-gray-700 : Sets the text color to dark gray
            * font-semibold : Uses semi-bold font weight for better readability
            * transition-colors : Smoothly transitions color changes on hover
            * duration-200 : Sets the transition duration to 200 milliseconds
            * 
            */}
          ←
        </button>
        {editing ? (
          // Input field for editing year
          // ref sets the input field reference
          // type is text to allow numeric input
          // value is bound to temp state
          // onChange updates temp state with numeric input only using regex
          // onBlur and onKeyDown handle finishing edit
          // className styles the input field
          <input
            ref={inputRef}
            type="text"
            value={temp}
            onChange={e => setTemp(e.target.value.replace(/[^0-9]/g, ""))}
            onBlur={finishEdit}
            onKeyDown={e => e.key === "Enter" && finishEdit()}
            className="px-4 py-1 bg-white rounded-md font-medium text-gray-800 shadow-sm w-20 text-center"
          />
        ) : (
          <div className="px-4 py-1 bg-gray-100 rounded-md font-medium text-gray-800 shadow-sm"
            onDoubleClick={startEdit}
            title="Double-click to edit">
          {/* Context Wrapper for year display
            * 
            * px-4 : Adds horizontal padding inside the container
            * py-1 : Adds vertical padding inside the container
            * bg-gray-100 : Sets a very light gray background color
            * rounded-md : Applies medium border radius for rounded corners
            * font-medium : Uses medium font weight for better readability
            * text-gray-800 : Sets the text color to very dark gray for contrast
            * shadow-sm : Adds a small shadow for subtle depth effect
            *
          */}
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
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md text-gray-700 font-semibold transition-colors duration-200"
        >
          {/* Button to go to next year
            * px-3 : Adds horizontal padding inside the button
            * py-1 : Adds vertical padding inside the button
            * bg-gray-200 : Sets the background color to light gray
            * hover:bg-gray-300 : Darkens the background on hover for interactivity
            * rounded-md : Applies medium border radius for rounded corners
            * text-gray-700 : Sets the text color to dark gray
            * font-semibold : Uses semi-bold font weight for better readability
            * transition-colors : Smoothly transitions color changes on hover
            * duration-200 : Sets the transition duration to 200 milliseconds
            *
          */}
          →
        </button>
        <div className="ml-4">
          {/* Filter component wrapper
            * 
            * ml-4 : Adds left margin to separate from previous elements
            *
          */}
          <Filter
            filters={filters}
            setFilters={setFilters}
            filterOpen={filterOpen}
            setFilterOpen={setFilterOpen}
            filterSections={filterSections}
            colorCode={colorCodeFunc}
          />
        </div>
      </div>
    </div>
  );
}