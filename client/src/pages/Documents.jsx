// Imports
import { use } from "react"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import getDocuments from "../hooks/getDocuments"

/* *
 * Documents page
 * 
 * Contains the documnts in pdf in the format of a sidebar
 * On selection, the document will be viewable via a pdf on the side
 * Each document also will show the last updated and a description of what the document is
 * 
 */
export default function Documents(){
    const { documents, setCurrDoc, currDoc, error, loading } = getDocuments()   // Get documents data from fetched data
    
    if (loading){                                                           // If loading (no error and fetching data)
        return (
            <div className='min-h-screen flex flex-col bg-gray-50'>
                <Header/>
                <p className='text-center text-gray-600'>
                    {/* p: Paragraph for the text
                    *
                    * text-center puts the element at the center  
                    * text-gray-600 sets the color of the text to gray
                    *  
                    */}
                    LOADING...
                </p>
            </div>
        )
    }

    if (error){                                                            // If error (failed to fetch data)
        return (
            <div className='min-h-screen flex flex-col bg-gray-50'>
                <Header/>
                <p className='text-center text-red-600'>
                {/* p: Paragraph for the text
                *
                * text-center puts the element at the center 
                * text-red-600 sets the color of the text to red
                *  
                */}
                Error: {error.message}
                </p>
            </div>
        )
    }
        
    return (
        <div className='min-h-screen flex flex-col bg-gray-50'>
            {/* Div: Context wrapper for full screen
                *
                * min-h-screen sets the minimimum height to be the entire screen
                * flex sets the children components to be in flex
                * flex-col sets the children components to be in a solumn
                * bg-gray-50 sets the background to be light gray
                *  
                */}
            <Header/>
            <main className='flex-1 overflow-y-auto'>
                {/* Main: Labels the main component of the screen
                  * 
                  * flex-1: Sets the component to be grow
                  * overflow-y-auto: Shows the vertical scrollbar only when it is needed
                  * 
                */}
                <div className="flex flex-[1]">
                    {/* Div: Context Wrapper for the Sidebar
                      * 
                      * flex: Sets the container to be in flex format
                      * flex-[1]: Sets the container to take up 1/4 the size of sibling components
                      * 
                    */}
                    <Sidebar items={documents} currIndex={currDoc} setCurrDoc={setCurrDoc}/>
                </div>
                <div className="flex flex-[4] justify-center">
                    {/* Div: Context Wrapper for the document pdf itself 
                      * 
                      * flex: Sets the container to be in flex format
                      * flex-[4]: Sets the container size to be 4 times the size of other sibling components
                      * justify-center: Allows children components to be in the center along the x axis
                      * 
                      */}
                    <div>
                        
                    </div>
                </div>
             </main>
        </div>
    )
}