// Imports
import React from "react";                                                          // Import React to make react components

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
    const pages = []                                                                // Stores list of pages

    if (totalPage <= 9){                                                            // For less than 9 pages, show all page from 1 to currentPage
        for (let i = 1; i <= totalPage; i++) {
            pages.push(i);
        }
    }
    else{                                                                           // For more than 9 pages
        if (currentPage <= 4){                                                      // If currentPage is less than 4, show all pages from 1 to 7 (4 + 3) and ..., totalPage after
            for (let i = 1; i <= 7; i++) {
                pages.push(i);
            }
            pages.push("...")       
            pages.push(totalPage)
        }
        else if (currentPage >= totalPage - 3){                                     // If currentPage is more than totalPage - 3, show 1, ... and all pages from totalPage - 6 (currentPage  - 3) to totalPage
            pages.push(1)
            pages.push("...")
            for (let i = totalPage - 6; i <= totalPage; i++) {
                pages.push(i);
            }
        }
        else{                                                                       // Else show 1, ..., currentPage - 2 to currentPage + 2, ..., totalPage
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
        <div className="flex justify-center">
            {/* Div: Context wrapper over entire pagination list
              * 
              * flex sets the children elements in flexbox format
              * justify-center sets children element to be center along the flex direction (horizontal here
              * )
            */}
            <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} className="p-3 text-sm hover:rounded-full hover:bg-gray-300">
                {"←"}
            </button>
            {/* Button: Previous page button
              * 
              * setCurrentPage to be the previous page or 1 via max function
              * p-3 sets padding in all direction
              * text-sm sets the size of the arrow icon to small
              * hover:rounded-full rounds the corner of the element on hover
              * hover:bg-gray-300 sets the background of the element to be darker on hover
              * )
            */}
            {pages.map(page => (currentPage == page ? 
                <button onClick={() => setCurrentPage(page)} className="p-3 font-bold text-sm hover:rounded-full hover:bg-gray-300">
                {/* Button: currentPage page button
                  * 
                  * setCurrentPage to be the page onclick (no effect)
                  * p-3 sets padding in all direction
                  * font-bold sets the page number to be bolded
                  * text-sm sets the size of the text to small
                  * hover:rounded-full rounds the corner of the element on hover
                  * hover:bg-gray-300 sets the background of the element to be darker on hover
                  * 
                */}
                    {page}
                </button> : page == "..." ? 
                <p>...</p>:
                <button onClick={() => setCurrentPage(page)} className="p-3 text-sm hover:rounded-full hover:bg-gray-300">
                {/* Button: other page button
                  * 
                  * setCurrentPage to be the page onclick 
                  * p-3 sets padding in all direction
                  * text-sm sets the size of the text to small
                  * hover:rounded-full rounds the corner of the element on hover
                  * hover:bg-gray-300 sets the background of the element to be darker on hover
                  * 
                */}   
                    {page}
                </button>
            ))}
            <button onClick={() => setCurrentPage(Math.min(totalPage, currentPage + 1))} className="p-3 font-bold text-sm hover:rounded-full hover:bg-gray-300">
            {/* Button: Next page button
              * 
              * setCurrentPage to be the next page or totalPage via min function
              * p-3 sets padding in all direction
              * text-sm sets the size of the arrow icon to small
              * hover:rounded-full rounds the corner of the element on hover
              * hover:bg-gray-300 sets the background of the element to be darker on hover
              * )
            */}
                {"→"}
            </button>
        </div>
    )
}