// Imports
import Header from "../components/Header"
import { EventProvider } from "../hooks/eventsContext"
import Events from "../sections/Timeline/Events"

/* *
 * Documents page
 * 
 * Contains the documnts in pdf in the format of a sidebar
 * On selection, the document will be viewable via a pdf on the side
 * Each document also will show the last updated and a description of what the document is
 * 
 */
export default function Timeline(){
    return (
     <div className='min-h-screen flex flex-col bg-gray-50'>
          {/* Div: Content Wrapper over the entire home page
            *
            * min-h-screen sets the minimum height of the element to be 100% of the viewpoint height (the entire browser window screen)
            * flex sets the children to be in a flexbox format
            * flex-col sets the flex direction to be columns so children are placed vertically
            * bg-gray-50 sets the background of the project page to gray
            *  
          */}
          <Header/>
          <main className='flex-1 overflow-y-auto px-4 py-8'>
            {/* Main: Content Wrapper over all sections. Main is used to identify the "main" part of this page
              *
              * flex-1 fills in the flex direction (column here)
              * overflow-y-auto shows scrollbar if children overflow. Otherwise, no scrollbar
              * px-4 sets the horizontal padding 
              * py-8 sets the vertical padding 
              *  
              */}
            <h1 className='text-4xl font-bold mb-8 text-center'>Timeline</h1>
            {/* h1: Overall project heading of the page
              *
              * text-4xl sets the text size of the heading to extra large 4x
              * font-bold sets the text emphasis to bold
              * mb-8 adds a margin to the bottom of the component
              * text-center puts the text in the center of the flex direction (horizontal here)
              *  
              */}
              
            <EventProvider>
              {/* Wrap the ProjectsList component with ProjectListProvider to provide context */}
              <Events/>
            </EventProvider>
          </main>
    </div>
    )
}