import { useTheme } from "../hooks/themeContext";

export function useTagColor() {
  const { isWarmthMode } = useTheme();

  return (type, label) => {
    const t = type?.toLowerCase();
    const l = label?.toLowerCase();

    if (t === "type") {
      switch (l) {
        case "ai/ml":    return { bg: isWarmthMode ? "#E0F7FA" : "#1c2a2f", text: isWarmthMode ? "#006064" : "#0ff" };
        case "hardware": return { bg: isWarmthMode ? "#FEF3C7" : "#3b2f1c", text: isWarmthMode ? "#78350F" : "#ff0" };
        case "software": return { bg: isWarmthMode ? "#E0F2FE" : "#2c2d3f", text: isWarmthMode ? "#0369a1" : "#0ff" };
      }
    }

    if (t === "language") {
      switch (l) {
        case "c":
        case "c++":      return { bg: isWarmthMode ? "#E0F2FE" : "#2c2d3f", text: isWarmthMode ? "#0369a1" : "#0ff" };
        case "java":     return { bg: isWarmthMode ? "#FEF3C7" : "#3b2f1c", text: isWarmthMode ? "#78350F" : "#ff0" };
        case "python":   return { bg: isWarmthMode ? "#E0F2F1" : "#1f2a2f", text: isWarmthMode ? "#065f46" : "#0f0" };
        case "javascript": return { bg: isWarmthMode ? "#FEF9C3" : "#3b351f", text: isWarmthMode ? "#78350F" : "#ff0" };
        case "html":     return { bg: isWarmthMode ? "#FFE6E6" : "#3a1f1f", text: isWarmthMode ? "#b91c1c" : "#f0f" };
        case "css":      return { bg: isWarmthMode ? "#DBEAFE" : "#1e2c3b", text: isWarmthMode ? "#1e40af" : "#0ff" };
        case "dart":     return { bg: isWarmthMode ? "#E0F7FA" : "#1c2a2f", text: isWarmthMode ? "#006064" : "#0ff" };
        case "shell":    return { bg: isWarmthMode ? "#F3F4F6" : "#2a2a2a", text: isWarmthMode ? "#374151" : "#fff" };
      }
    }

    // Deterministic fallback: same tag → same color across the site
    if (label) {
      let hash = 0;
      for (let i = 0; i < label.length; i++) {
        hash = label.charCodeAt(i) + ((hash << 5) - hash);
      }
      const hue = Math.abs(hash) % 360;
      return isWarmthMode
        ? { bg: `hsl(${hue}, 70%, 92%)`, text: `hsl(${hue}, 70%, 30%)` }
        : { bg: `hsl(${hue}, 50%, 15%)`, text: `hsl(${hue}, 80%, 70%)` };
    }

    return { bg: isWarmthMode ? "#F3F4F6" : "#2a2a2a", text: isWarmthMode ? "#1F2937" : "#fff" };
  };
}