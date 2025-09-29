// Imports
import React from "react";                                          // Imports React to make React components


/* Defines the Tag component
 *
 * Sets the Tag component with different labels for each project
 * 
 */
export default function Tag({ label, type, colorCodeFunc }) {
    const color = colorCodeFunc(type);  // Get the color code based on the type using the passed colorCodeFunc

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