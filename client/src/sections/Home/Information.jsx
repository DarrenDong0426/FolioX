// Imports
import { Link } from "react-router-dom";


/** Defines the Information section of the home page
 * 
 * Briefly explain the FaQ and Changelog section as well as a navigation section
 * Includes a contact message with that can be anonymous in name and email. 
 * Email should be provided if reply is wanted. 
 * Mesasge must not be blank 
 * 
 */
export default function Information() {
  return (
    <div className="max-w-6xl w-full mx-auto flex flex-col items-center gap-16 px-4 py-10">
      <h1 className="text-5xl font-extrabold text-center text-gray-800">Resources</h1>

      <div className="flex flex-col lg:flex-row w-full gap-16 items-stretch">
        {/* Div Context wrapper for the entire resource content
          *  
          * flex: Set the format to flexbox
          * flex-col: Sets children coomponents to be in a column
          * lg:flex-row: Sets children component to flex row if the screen is big enough
          * w-full: Takes up the full width of the container
          * gap-16: Adds a gap 
          * items-stretch: Ensures each children stretches to take up the whole space in the cross-axis
          * 
          */}
        <div className="flex flex-col flex-1 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg shadow-md flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">FAQs</h2>
              <p className="text-gray-700 mb-4">
                The FAQ (Frequently Asked Questions) page answers common questions visitors may have about this website and its content.
              </p>
            </div>
            <div className="text-right mt-auto">
              <Link 
                to="/FaQs" 
                className="font-semibold text-blue-600 hover:text-red-600"
              >
                View FAQs
              </Link>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-md flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Changelog</h2>
              <p className="text-gray-700 mb-4">
                The Changelog lists significant changes to the website after deployment, including new features, bug fixes, or news updates.
              </p>
            </div>
            <div className="text-right mt-auto">
              <Link 
                to="/Changelog" 
                className="font-semibold text-blue-600 hover:text-red-600 transition-colors"
              >
                View Changelog
              </Link>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <div className="bg-white p-6 rounded-lg shadow-lg flex-1 flex flex-col">
            <h2 className="text-3xl font-bold mb-4 text-center">Contact Me</h2>
            <p className="text-gray-700 text-sm mb-6">
              You can send a message anonymously by leaving the Name and Email fields empty.  
              Provide your email only if you expect a response.  
              <span className="text-red-500 font-semibold"> WIP:</span> This form is still a work in progress.
            </p>

            <form action="/submit" method="POST" className="space-y-6 flex-1 flex flex-col justify-between">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <label htmlFor="name" className="md:w-28 font-semibold text-gray-700">
                  Name: <span className="text-gray-500 text-sm">(optional)</span>
                </label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Your name"
                />
                {/* Div context wrapper for the Name input
                  * 
                  * flex-1: The container can grow to fill in space
                  * border: Gives a border
                  * border-gray-300: Sets the border color
                  * rounded: Sets the corner of the container to round
                  * px-3: Adds a padding in the x-axis
                  * py-2: Adds a padding in the y-axis
                  * focus:outline-none: Removes the default border set by the browser
                  * focus:ring-2: On focus, adds a glowing ring of size 2 to the input
                  * focus:ring-blue-400: On focus, sets the ring color
                  * 
                  */}
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <label htmlFor="email" className="md:w-28 font-semibold text-gray-700">
                  Email: <span className="text-gray-500 text-sm">(optional)</span>
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Your email"
                />
              </div>

              <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 flex-1">
                <label htmlFor="message" className="md:w-28 font-semibold text-gray-700 mt-2 md:mt-0">
                  Message: <span className="text-red-500">*</span>
                </label>
                <div className="flex-1 flex flex-col">
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    required
                    placeholder="Type your message here..."
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  ></textarea>
                  <p className="text-sm text-gray-500 mt-1">This field is required.</p>
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end">
                <button 
                  type="submit" 
                  className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}