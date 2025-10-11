// Imports
import PDFViewer from "../components/PDFViewer"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import getDocuments from "../hooks/getDocuments"
import { useTheme } from "../hooks/themeContext.jsx"      // Import useTheme for theme support

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
    const { isWarmthMode } = useTheme();                                        // Get current theme
    
    const hasDocuments = Array.isArray(documents) && documents.length > 0      // Check if documents exist
    const validDoc = hasDocuments && currDoc >= 0 && currDoc < documents.length// Check if currDoc is a valid index

    // Classes for color theming, theme-aware
    const bgClass = isWarmthMode
        ? "bg-[#fff7f7]"
        : "bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,rgba(32,46,65,0.96)_48%,rgba(16,28,44,0.93)_75%,rgba(9,16,29,0.97)_90%,#101727_100%)]";
    const headingClass = isWarmthMode
        ? "text-[#E94E41]"
        : "text-cyan-300";
    const subTextClass = isWarmthMode
        ? "text-[#a96871]"
        : "text-cyan-400";
    const descTextClass = isWarmthMode
        ? "text-[#6b3030]"
        : "text-cyan-100";
    const errorTextClass = isWarmthMode
        ? "text-red-600"
        : "text-[#F38BA3]";
    const loadingTextClass = isWarmthMode 
        ? "text-gray-600"
        : "text-cyan-200";

    if (loading){ // If loading (no error and fetching data)
        return (
            <div className={`min-h-screen flex flex-col ${bgClass}`}>
                <Header/>
                <p className={`text-center ${loadingTextClass}`}>
                    {/* p: Paragraph for the text
                    *
                    * text-center puts the element at the center  
                    * text-gray-600/text-cyan-200 sets the color of the text based on theme
                    *  
                    */}
                    LOADING...
                </p>
            </div>
        )
    }

    if (error){ // If error (failed to fetch data)
        return (
            <div className={`min-h-screen flex flex-col ${bgClass}`}>
                <Header/>
                <p className={`text-center ${errorTextClass}`}>
                {/* p: Paragraph for the text
                *
                * text-center puts the element at the center 
                * text-red-600/text-[#F38BA3] sets the color of the text to red/pink for light/dark
                *  
                */}
                Error: {error.message}
                </p>
            </div>
        )
    }
        
    return (
        <div className={`min-h-screen flex flex-col ${bgClass}`}>
            {/* Div: Context wrapper for full screen
                *
                * min-h-screen sets the minimimum height to be the entire screen
                * flex sets the children components to be in flex
                * flex-col sets the children components to be in a solumn
                * bg-... sets the background to be theme-aware
                *  
            */}
            <Header/>
            <main className='flex flex-1 overflow-y-auto flex-row ' >
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
                    {validDoc ? (
                        <>
                            <h1 className={`p-4 text-3xl font-bold text-center w-full font-mono tracking-tight uppercase ${headingClass}`}>
                                {/* h1: Context Wrapper for document title 
                                  *
                                  * font-mono gives a cool, modern/tech style
                                  * tracking-tight for compact spacing
                                  * uppercase for accent
                                  * text-center centers the text
                                  * w-full fills the parent
                                  * color adapts to theme
                                */}
                                {documents[currDoc].title}
                            </h1>
                            <p className={`text-center w-full ${subTextClass}`}>
                                {/* p: Paragraph for last updated information
                                  *
                                  * text-center puts the element at the center
                                  * w-full uses the entire width of the container
                                  * text color adapts to theme
                                */}
                                Last Updated: {documents[currDoc].month_year}
                            </p>
                            <p className={`p-4 ${descTextClass}`}>
                                {/* p: Paragraph for document description
                                  *
                                  * p-4 adds a padding of 4 * 0.25rem = 1rem in all directions
                                  * text color adapts to theme
                                */}
                                {documents[currDoc].desc}
                            </p>
                            <PDFViewer fileUrl={documents[currDoc].file_path}/>
                        </>
                    ) : (
                        <div className="w-full p-12 flex flex-col items-center justify-center">
                            {/* Div: Shown if there are no documents available */}
                            <p className={`text-center ${subTextClass}`}>No documents found.</p>
                        </div>
                    )}
                </div>
             </main>
        </div>
    )
}