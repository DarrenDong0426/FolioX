// Imports
import React from "react";                                          // Imports React to make React components


/* Defines the Tag component
 *
 * Sets the Tag component with different labels for each project
 * 
 */
export default function Tag({ label, type }){
    const color = type === "type" ?                                                 // Set the background and text color based on type of tag (language or project type)
        "bg-blue-100 text-blue-800" : 
        "bg-green-100 text-green-800";

    return (
        <div className={`${color} rounded-full px-3 py-1 text-sm font-medium`}>
            {/* Div: Content Wrapper over the tag component
            *
            * rounded-full sets the tag to have completely rounded edges
            * px-3 adds horizontal padding 
            * py-1 add vertical padding
            * text-sm set the size of the text to small
            * font-medium set the boldness of the text to medium
            */}     
            { label }
        </div>
        
    )
}