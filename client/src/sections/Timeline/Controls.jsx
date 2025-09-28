import Filter from '../../components/Filter';
import { useEvents } from '../../hooks/eventsContext';

export default function Controls() {
  // Get the current year for upper bound
  const currentYear = new Date().getFullYear();

  // Get for timeline states from context 
  const {
    year, setYear, filters, setFilters, filterOpen, setFilterOpen,
  } = useEvents();

  // Get filter sections
  const filterSections = [
    {
      title: "Categories",
      type: "type",
      options: ["Academics", "Personal", "Projects", "Professional"]
    },
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
          onClick={() => setYear(year - 1)}
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
        <div className="px-4 py-1 bg-gray-100 rounded-md font-medium text-gray-800 shadow-sm">
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
        <button
          onClick={() => setYear(y => Math.min(currentYear, year + 1))}
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
          />
        </div>
      </div>
    </div>
  );
}