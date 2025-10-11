import documents from "../../assets/images/documents.png";              // Imports documents image from path ../assets/images/documents.png
import { Link } from "react-router-dom";
import { useTheme } from '../../hooks/themeContext.jsx'; // Adjust path as necessary

/* Defines the Documents section in Home page
 *
 * Outlines what the Documents page is and a link to page with documents
 * 
 */
export default function Documents(){
    const { isWarmthMode } = useTheme(); // Get theme from context

    return(
        <>
            <div className={`
                min-h-screen w-screen flex items-center justify-center px-4 py-6
                transition-colors duration-500
                ${isWarmthMode
                  ? "bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,rgba(255,226,237,0.8)_60%,rgba(247,243,234,1)_100%)]"
                  : "bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,rgba(17,26,34,0.8)_60%,rgba(18,32,47,1)_100%)]"
                }
            `}>
              <div className={`
                flex flex-col md:flex-row max-w-5xl w-full gap-10 rounded-3xl shadow-xl border-2 p-6 my-6 z-10
                ${isWarmthMode
                  ? "bg-[#FFF8F3]/90 border-[#E94E41]"
                  : "bg-[#151C26]/90 border-cyan-700"
                }
              `}>
                <div className="flex w-full md:w-auto flex-[1] items-center justify-center">
                    <img 
                        src={documents}
                        alt="Documents Illustration"
                        className={`
                          max-w-xs sm:max-w-sm md:max-w-md
                          rounded-xl shadow-lg ring-2
                          ${isWarmthMode ? "ring-[#e2eafc]" : "ring-cyan-900"}
                          bg-white/70
                        `}
                    />
                </div>
                <div className="flex flex-col justify-center flex-[2]">
                    <h1 className={`
                      text-3xl lg:text-4xl font-bold mb-4 text-center tracking-wide
                      ${isWarmthMode ? "text-[#E94E41]" : "text-cyan-400"}
                    `}>
                      View Documents
                    </h1>
                    <p className={`
                        mb-4
                        ${isWarmthMode ? "text-[#264653]" : "text-gray-200"}
                    `}>
                      This section serves as a centralized hub where you can access and review important documents that may be relevant to academic, professional, or personal purposes. The collection includes multiple versions of resumes tailored for different roles and industries, academic records or supporting materials, and any other key documents that may be useful for reference.
                    </p>
                    <p className={`
                        mb-4
                        ${isWarmthMode ? "text-[#39536B]" : "text-gray-400"}
                    `}>
                        On the left-hand sidebar, you will find a neatly organized list of available documents, each labeled with a clear, descriptive title so you can easily identify the file you need. Selecting a document from the sidebar will open an interactive PDF viewer on the right-hand side of the screen, allowing you to read through the document without leaving the page.
                    </p>
                    <p className={`
                        mb-4
                        ${isWarmthMode ? "text-[#39536B]" : "text-gray-400"}
                    `}>
                        For your convenience, every document can also be downloaded directly. This ensures that you can keep a copy for offline use, submit it as part of an application, or store it in your personal files. Whether you are reviewing resumes for specific job opportunities, referencing academic materials, or accessing other professional documents, this section is designed to make the process streamlined and efficient.
                    </p>
                    <div className="text-right">
                        <Link 
                          to="/Documents"
                          className={`
                            font-bold underline underline-offset-2 transition-colors duration-200
                            ${isWarmthMode 
                                ? "text-blue-600 hover:text-[#E94E41]"
                                : "text-cyan-300 hover:text-cyan-100"}
                          `}
                        >
                          View Documents
                        </Link>
                    </div>
                </div>
              </div>
            </div>
        </>
    )
}