import React from "react";
import { useTheme } from "../hooks/themeContext.jsx";

/* Defines the Tag component
 *
 * Sets the Tag component with different labels for each project
 */
export default function Tag({ label, type, colorCodeFunc }) {
  const { isWarmthMode } = useTheme();

  // Use both type and label to determine colors
  const colors = colorCodeFunc(type, label, isWarmthMode);

  return (
    <div
      className={`
        rounded-full border px-3 py-1 text-sm font-medium shadow-sm transition-colors duration-200
      `}
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        borderColor: colors.border || (isWarmthMode ? "#ccc" : "#333"),
        borderWidth: "1px",
      }}
    >
      {label}
    </div>
  );
}
