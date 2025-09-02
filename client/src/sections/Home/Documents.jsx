// Imports 
import wordCloud from "../../assets/images/project_word_cloud.png";     // Imports wordCloud image from path ../assets/images/project_word_cloud.png
import documents from "../../assets/images/documents.png";              // Imports documents image from path ../assets/images/documents.png
import { Link } from "react-router-dom";

/* Defines the Documents section in Home page
 *
 * Outlines what the Documents page is and a link to page with documents
 * 
 */
export default function Projects(){
    return(
        <>
            {/* A React fragment that wrap multiple elements. */}
            <div className="flex max-w-5xl w-full gap-10 flex-[1]">
                <img 
                    src={documents}
                    alt="Project Word Cloud"
                    className="flex-shrink-0"/>
            </div>
            <div className="flex flex-col justify-center flex-[2]">
                <h1 className='text-4xl font-bold mb-4 text-center'>View Documents</h1>

                <p className="mb-4">
                     <p className="mb-4">
                    This section serves as a centralized hub where you can access and review important documents that may be relevant to academic, professional, or personal purposes. The collection includes multiple versions of resumes tailored for different roles and industries, academic records or supporting materials, and any other key documents that may be useful for reference.
                    </p>
                    <p className="mb-4">
                    On the left-hand sidebar, you will find a neatly organized list of available documents, each labeled with a clear, descriptive title so you can easily identify the file you need. Selecting a document from the sidebar will open an interactive PDF viewer on the right-hand side of the screen, allowing you to read through the document without leaving the page.
                    </p>
                    <p className="mb-4">
                    For your convenience, every document can also be downloaded directly. This ensures that you can keep a copy for offline use, submit it as part of an application, or store it in your personal files. Whether you are reviewing resumes for specific job opportunities, referencing academic materials, or accessing other professional documents, this section is designed to make the process streamlined and efficient.
                    </p>
                     <div className="text-right">
                        <Link 
                        to="/Documents" 
                        className="font-bold text-blue-600 hover:text-red-600"
                        >
                        View Documents
                        </Link>
                    </div>
                </p>
            </div>
        </>
    )
}