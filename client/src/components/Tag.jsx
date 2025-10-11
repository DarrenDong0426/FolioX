// Imports
import React from "react";
import { useTheme } from "../hooks/themeContext.jsx"; // Import Theme context (adjust the path if needed)

/* Defines the Tag component
 *
 * Sets the Tag component with different labels for each project
 * 
 */
export default function Tag({ label, type, colorCodeFunc }) {
    const { isWarmthMode } = useTheme(); 

    let bgColor, textColor, borderColor;
    if (type === "type") {
      bgColor = isWarmthMode ? "bg-blue-100" : "bg-cyan-900";
      textColor = isWarmthMode ? "text-blue-800" : "text-cyan-100";
      borderColor = isWarmthMode ? "border-blue-300" : "border-cyan-700";
    } else if (type === "language") {
      bgColor = isWarmthMode ? "bg-green-100" : "bg-green-900";
      textColor = isWarmthMode ? "text-green-800" : "text-green-100";
      borderColor = isWarmthMode ? "border-green-300" : "border-green-700";
    } else {
      bgColor = isWarmthMode ? "bg-gray-100" : "bg-gray-800";
      textColor = isWarmthMode ? "text-gray-800" : "text-gray-100";
      borderColor = isWarmthMode ? "border-gray-300" : "border-gray-700";
    }

    return (
        <div
          className={`
            ${bgColor} ${textColor} ${borderColor}
            rounded-full border px-3 py-1 text-sm font-medium transition-colors duration-200
          `}
        >
            {/* Div: Content Wrapper over the tag component
            *
            * rounded-full sets the tag to have completely rounded edges
            * px-3 adds horizontal padding 
            * py-1 add vertical padding
            * text-sm set the size of the text to small
            * font-medium set the boldness of the text to medium
            * border adds clarity (and theme contrast)
            * transition for theme change smoothness
            */}     
            { label }
        </div>
    );
}