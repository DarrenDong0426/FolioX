/* Defines the Dropdown Component 
 *
 * Options param sets array of options that a user can choose from
 * dropDown param is the current value of the dropDown menu
 * setDropDown param is a function to modify the dropDown param
 * isOpen param is a flag to indicate if a dropdown menu is open
 * setIsOpen param is a function to modify the isOpen param
 *  
*/
export default function Dropdown({ options, dropDown, setDropDown, isOpen, setIsOpen }) {
  return (
    <div
      className="relative flex items-center space-x-2"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
        {/* Div: Context wrapper over the entire dropdown component
          *   
          * relative allows children components to be position relative to this component
          * onMouseEnter lets the dropdown menu open up on hover via setIsOpen
          * onMouseLeave lets the dropdown menu close up when not hover via setIsOpen 
          * 
        */}
      <label className="font-medium">Sort By:</label>
      {/* Label: Indicate dropdown is for sort by 
        * 
        * font-medium sets the emphasis of the text 
        * 
      */}
      <div className="relative w-40"> 
        {/* Div: Context Wrapper over the DropDown itself
          * 
          * relative allows children component to be position relative to this component
          * w-40 hardcodes the width of the dropdown box 
          * 
        */}
        <button
          className="w-full px-4 py-2 bg-white border rounded shadow hover:bg-gray-100 text-left"
        >
          {dropDown}
        </button>
         {/* Button: Button of the current dropdown option
          * 
          * w-full allows the component to take up all of the parent component's width
          * px-4 adds horizontal padding
          * py-2 adds vertical padding
          * bg-white sets the background to white
          * border gives the dropdown box a border
          * rounded removes the corner of the box to be round
          * shadow gives the box a shadow on the bottom
          * hover:bg-gray-100 sets the background color to a bit gray on hover
          * text-left sets the text to start on the left size of the container
          * 
        */}
        {/* DropDown other options if isOpen */}
        {isOpen && (
          <div
            className="absolute w-full bg-white border border-gray-200 rounded shadow-lg z-10 flex flex-col"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {/* Div: Context Wrapper over all other options when dropdown menu opens
              * 
              * absolute sets the children component relative to the nearest relative parent component. It defaults to topleft of parent component which is the bottom in HTML stacking
              * w-full allows the component to take up all of its parent's width
              * bg-white adds a white background to the component
              * border gives a border to the component
              * border-gray-200 sets the color of the border to be gray
              * rounded removes the corner of the box to be round
              * shadow gives the box a large shadow on the bottom
              * z-10 sets the z-index to 10 so that it would overlap on top of other components
              * flex sets the formatting to be in a flexbox
              * flex-col sets the flexbox to grow vertically 
              * role helps screen readers read the component
              * aria-orientation indicates vertical placement for screen readers
              * aria-labelledby is a id for the aria component
              * 
            */}
            {/* Options filters out the current dropbox and create a button for the remaining options via map()  */}
            {options
              .filter(option => option !== dropDown)
              .map(option => (
                <button
                  key={option}
                  className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  onClick={() => setDropDown(option)}
                >
                {/* Button: Other dropdown options 
                  * 
                  * w-full allows the button to take up its parents width in its entirety
                  * px-4 adds horizontal padding 
                  * py-2 adds vertical padding
                  * text-left sets the text to start on the left
                  * hover:bg-gray-100 sets the background color to gray on hover  
                  * 
                */}
                  {option}
                </button>
                
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
