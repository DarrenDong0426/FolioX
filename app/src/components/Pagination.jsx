// Imports
import React from "react";                                          // Imports React to make React components
import { useTheme } from "../hooks/themeContext.jsx";               // Import theme context

/* Defines the Pagination Component 
 * 
 * Takes in currentPage, setCurrentPage Function, and totalPage 
 * Sets the currentPage 
 * Modifies the list of pages on change with setCurrentPage function
 * Set the end of the page list as total Page
 * Page lists contains 9 values max
 * 
*/
export default function Pagination({ currentPage, setCurrentPage, totalPage }) {
    const { isWarmthMode } = useTheme();                            // Get theme mode for button theming
    const pages = []                                                // Stores list of pages

    if (totalPage <= 9){                                            // For less than 9 pages, show all pages
        for (let i = 1; i <= totalPage; i++) {
            pages.push(i);
        }
    }
    else{                                                           // For more than 9 pages
        if (currentPage <= 4){                                      // If currentPage is less than 4, show all pages from 1 to 7 (4 + 3) and ..., totalPage after
            for (let i = 1; i <= 7; i++) {
                pages.push(i);
            }
            pages.push("...")       
            pages.push(totalPage)
        }
        else if (currentPage >= totalPage - 3){                     // If currentPage is more than totalPage - 3, show 1, ... and all pages from totalPage - 6 to totalPage
            pages.push(1)
            pages.push("...")
            for (let i = totalPage - 6; i <= totalPage; i++) {
                pages.push(i);
            }
        }
        else{                                                       // Else show 1, ..., currentPage - 2 to currentPage + 2, ..., totalPage
            pages.push(1)
            pages.push("...")
            for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                pages.push(i);
            }
            pages.push("...")
            pages.push(totalPage)
        }
    }

    return (
        <div className="flex justify-center mt-4">
            {/* Div: Context wrapper over entire pagination list
              * 
              * flex sets the children elements in flexbox format
              * justify-center sets children element to be center along the flex direction (horizontal here)
              * mt-4 adds top margin
            */}
            <button 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              className={`
                p-3 text-sm font-bold rounded transition 
                ${isWarmthMode 
                  ? "hover:bg-[#E94E41]/10 text-[#E94E41]"
                  : "hover:bg-cyan-700/30 text-cyan-200"
                }
              `}
              aria-label="Previous page"
            >
                {"←"}
            </button>
            {/* Button: Previous page button
              * 
              * setCurrentPage to be the previous page or 1 via max function
              * p-3 sets padding in all direction
              * text-sm sets the size of the arrow icon to small
              * font-bold for a bold effect
              * hover:rounded-full rounds the corner of the element on hover
              * color and bg adapts to theme
            */}
            {pages.map((page, idx) =>
              page === "..." ? (
                <span key={idx} className={`px-3 text-gray-400 select-none`}>...</span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`
                    p-3 text-sm rounded transition
                    ${currentPage === page
                      ? isWarmthMode
                        ? "bg-[#E94E41] text-white font-bold shadow"
                        : "bg-cyan-500 text-white font-bold shadow"
                      : isWarmthMode
                        ? "text-[#39536B] hover:bg-[#ffe2ed]/80"
                        : "text-cyan-200 hover:bg-cyan-900/40"
                    }
                  `}
                  aria-current={currentPage === page ? "page" : undefined}
                >
                  {page}
                </button>
              )
            )}
            <button 
              onClick={() => setCurrentPage(Math.min(totalPage, currentPage + 1))}
              className={`
                p-3 text-sm font-bold rounded transition
                ${isWarmthMode 
                  ? "hover:bg-[#E94E41]/10 text-[#E94E41]"
                  : "hover:bg-cyan-700/30 text-cyan-200"
                }
              `}
              aria-label="Next page"
            >
                {"→"}
            </button>
        </div>
    )
}