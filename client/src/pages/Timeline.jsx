// Imports
import Header from "../components/Header"

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
    </div>
    )
}