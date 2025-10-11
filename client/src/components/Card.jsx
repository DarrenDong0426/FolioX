export default function Card({ title, desc, tags = "", date, images = [] }) {

  const imgSources = images.length > 4
    ? [...images].sort(() => 0.5 - Math.random()).slice(0, 4)
    : images;

  function truncateText(text, maxLength = 100) {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trimEnd() + "…";
  }

  function colorCodeFunc(type, isWarmthMode = true) {
    switch (type.toLowerCase()) {
      case "academics": return { bg: isWarmthMode ? "#FFE6CC" : "#0f1120", text: isWarmthMode ? "#3B185F" : "#0ff" };
      case "professional": return { bg: isWarmthMode ? "#CCF9F0" : "#10141c", text: isWarmthMode ? "#166534" : "#0f0" };
      case "personal": return { bg: isWarmthMode ? "#FFE0EB" : "#1a0d1f", text: isWarmthMode ? "#BE185D" : "#f0f" };
      case "projects": return { bg: isWarmthMode ? "#FFF9CC" : "#1c1a10", text: isWarmthMode ? "#78350F" : "#ff0" };
      case "research": return { bg: isWarmthMode ? "#EAE8FF" : "#100f1e", text: isWarmthMode ? "#6B21A8" : "#a0f" };
      default: return { bg: isWarmthMode ? "#F3F4F6" : "#101010", text: isWarmthMode ? "#1F2937" : "#fff" };
    }
  }

  const isWarmthMode = true; // replace with context if needed
  const color = colorCodeFunc(tags, isWarmthMode);

  return (
    <div className={`min-w-[220px] max-w-xs border shadow-2xl rounded-2xl px-5 py-4 z-30`} style={{ backgroundColor: color.bg, color: color.text }}>
      <div className="font-bold mb-1 text-lg leading-tight tracking-tight">
        {title}
      </div>

      {date && (
        <div className="text-xs rounded px-2 py-0.5 inline-block mb-2 shadow-sm font-mono" style={{ backgroundColor: isWarmthMode ? "#FEF3C7" : "#111827", color: isWarmthMode ? "#78350F" : "#0ff" }}>
          {typeof date === "string" ? date : date.toLocaleDateString()}
        </div>
      )}

      <div className={`mb-2 leading-relaxed text-xs`} style={{ color: isWarmthMode ? "#1F2937" : "#fff" }}>
        {truncateText(desc)}
      </div>

      {tags && (
        <div className="flex flex-wrap gap-2 mb-2 mt-1">
          <span className="font-semibold px-2 py-0.5 rounded-full text-xs shadow-sm" style={{ backgroundColor: isWarmthMode ? "#FFD699" : "#111827", color: isWarmthMode ? "#78350F" : "#0ff" }}>
            #{tags}
          </span>
        </div>
      )}

      {imgSources.length > 0 && (
        <div className={`grid gap-2 mt-3 ${imgSources.length > 1 ? 'grid-cols-2' : ''}`}>
          {imgSources.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`event-img-${i}`}
              className="w-16 h-16 object-cover rounded-lg border shadow-sm hover:scale-105 hover:z-10 transition"
            />
          ))}
        </div>
      )}
    </div>
  );
}
