// Imports
import PDFViewer from "../components/PDFViewer"
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
            <main className='flex flex-1 overflow-y-auto flex-row'>
                {/* Main: Labels the main component of the screen
                  *  
                  * flex: Sets the container in flex format
                  * flex-row: Sets the children of the container to be in row
                  * flex-1: Sets the component to be grow
                  * overflow-y-auto: Shows the vertical scrollbar only when it is needed
                  * 
                */}
                <div className="flex-[1]">
                    {/* Div: Context Wrapper for the Sidebar
                      * 
                      * flex-[1]: Sets the container to take up 1/5 the size of sibling components
                      * 
                    */}
                    <Sidebar items={documents} currIndex={currDoc} setCurrDoc={setCurrDoc}/>
                </div>
                <div className="flex flex-[4] items-start flex-col">
                    {/* Div: Context Wrapper for the document pdf itself 
                      * 
                      * flex: Sets the container to be in flex format
                      * flex-[4]: Sets the container size to be 4/5 of the size of the parent 
                      * items-start: Sets children components to start from the top
                      * flex-col: Sets the children components to be in a column
                      * 
                      */}
                    <h1 className="p-4 text-2xl font-bold text-center w-full">
                        {/* Div: Context Wrapper for the document pdf itself 
                          * 
                          * p-4 adds a padding of 4 * 0.25rem = 1rem in all directions
                          * text-2xl sets the text to be large x2
                          * font-bold sets the text to be bolded
                          * text-center sets the text to be in the center of the container
                          * w-full uses the entire width of the container
                          * 
                        */}
                        {documents[currDoc].title}
                    </h1>
                    <p className="p-4">
                        {documents[currDoc].desc}
                    </p>
                    <PDFViewer fileUrl={documents[currDoc].file_path}/>
                </div>
             </main>
        </div>
    )
}