import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useEvents } from "../../hooks/eventsContext";
import Controls from "./Controls";
import Card from "../../components/Card";
import { useTheme } from "../../hooks/themeContext";
import { Link } from "react-router-dom";

// Pull every image URL out of an event's content_blocks. Both standalone
// image blocks and gallery blocks contribute.
function collectImageUrls(blocks) {
  if (!Array.isArray(blocks)) return [];
  const urls = [];
  for (const b of blocks) {
    if (b.type === "image" && b.url) urls.push(b.url);
    else if (b.type === "gallery" && Array.isArray(b.images)) {
      for (const img of b.images) if (img.url) urls.push(img.url);
    }
  }
  return urls;
}

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false,
  );

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);

  return isMobile;
}

// Format a "YYYY-MM" or "YYYY-MM-DD" date string into "MMM YY".
function formatShortMonth(date) {
  return date.toLocaleString("en-US", { month: "short", year: "2-digit" });
}

export default function Events() {
  const { events, loading, error, year } = useEvents();
  const { isWarmthMode } = useTheme();
  const isMobile = useIsMobile();

  const jan = new Date(year, 0, 1).getTime();
  const dec = new Date(year, 11, 31).getTime();

  const timeToPercent = (time) => ((time - jan) / (dec - jan)) * 100;

  const monthLabels = Array.from(
    { length: 12 },
    (_, i) => new Date(year, i, 1),
  ).filter((_, i) => (isMobile ? i % 3 === 0 : true));

  const formatDate = (date) => {
    return date.toLocaleString("en-US", { month: "short", year: "numeric" });
  };

  function colorCodeFunc(type) {
    switch (type.toLowerCase()) {
      case "professional":
        return {
          bg: isWarmthMode ? "#E6F9F0" : "#0b1e13",
          text: isWarmthMode ? "#16A34A" : "#0f0",
          bar: isWarmthMode ? "#16A34A" : "#0f0",
        };
      case "personal":
        return {
          bg: isWarmthMode ? "#E8F0FF" : "#0a1a2f",
          text: isWarmthMode ? "#1F51FF" : "#04D9FF",
          bar: isWarmthMode ? "#1F51FF" : "#04D9FF",
        };
      case "projects":
        return {
          bg: isWarmthMode ? "#FFFBE6" : "#332600",
          text: isWarmthMode ? "#D97706" : "#FF5F1F",
          bar: isWarmthMode ? "#D97706" : "#FF5F1F",
        };
      case "research":
        return {
          bg: isWarmthMode ? "#F3E8FF" : "#1a0f2e",
          text: isWarmthMode ? "#7C3AED" : "#a0f",
          bar: isWarmthMode ? "#7C3AED" : "#a0f",
        };
      default:
        return {
          bg: isWarmthMode ? "#F3F4F6" : "#121212",
          text: isWarmthMode ? "#1F2937" : "#fff",
          bar: isWarmthMode ? "#9CA3AF" : "#fff",
        };
    }
  }

  // Desktop uses hover. Mobile uses a click-triggered modal.
  const [hoveredEventId, setHoveredEventId] = useState(null);
  const [modalEvent, setModalEvent] = useState(null);

  // Lock body scroll while modal is open
  useEffect(() => {
    if (modalEvent) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalEvent]);

  // Close modal on Escape
  useEffect(() => {
    if (!modalEvent) return;
    const handler = (e) => {
      if (e.key === "Escape") setModalEvent(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [modalEvent]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div
          className={`w-12 h-12 rounded-full border-4 border-t-transparent animate-spin
          ${isWarmthMode ? "border-[#E94E41]" : "border-cyan-400"}
        `}
        />
        <p
          className={`font-mono tracking-widest uppercase text-sm
          ${isWarmthMode ? "text-[#8B2D2D]" : "text-cyan-200"}
        `}
        >
          Loading...
        </p>
      </div>
    );
  if (error)
    return <p className="text-center text-red-600">Error: {error.message}</p>;

  const titleColClass = "w-24 sm:w-40 flex-shrink-0";

  return (
    <div className="flex flex-col flex-1 min-h-0 py-2">
      <Controls />
      <div
        className={`flex border-t-4 border-b-4 rounded-t-lg shadow-sm mb-4 transition-colors duration-300 ${
          isWarmthMode ? "border-[#E94E41]" : "border-cyan-500"
        }`}
      >
        <div
          className={`${titleColClass} flex items-center justify-center text-xs sm:text-sm font-semibold ${isWarmthMode ? "text-[#8B2D2D]" : "text-cyan-400"}`}
        >
          Events
        </div>
        <div className="flex-1 relative h-12">
          {monthLabels.map((month, idx) => {
            const percent = timeToPercent(month.getTime());

            const monthColor = isWarmthMode
              ? { bg: "#F3E8FF", text: "#6B21A8", bar: "#7C3AED" }
              : { bg: "#23273c", text: "#0ff", bar: "#0ff" };

            return (
              <div
                key={idx}
                className="absolute flex flex-col items-center text-xs"
                style={{
                  left: `${percent}%`,
                  transform: idx === 0 ? "none" : "translateX(-50%)",
                }}
              >
                <div
                  className={`h-6 w-px border-2 transition-colors duration-300 ${
                    isWarmthMode ? "border-[#E94E41]" : "border-cyan-500"
                  }`}
                ></div>

                <span
                  className="mt-1 px-1.5 sm:px-2 py-0.5 rounded-full font-medium shadow-sm text-[10px] sm:text-xs whitespace-nowrap"
                  style={{
                    backgroundColor: monthColor.bg,
                    color: monthColor.text,
                  }}
                >
                  {month.toLocaleString("default", { month: "short" })}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {events.map((event, idx) => {
        const [y, m, d] = event.start.split("-").map(Number);
        const eventStart = new Date(y, m - 1);

        const [y2, m2, d2] = (event.end || event.start).split("-").map(Number);
        const eventEnd = new Date(y2, m2 - 1);

        const janOfYear = new Date(year, 0, 1).getTime();
        const decOfYear = new Date(year, 11, 31).getTime();

        const clippedStart = Math.max(eventStart.getTime(), janOfYear);
        const clippedEnd = Math.min(eventEnd.getTime(), decOfYear);

        const startPercent = timeToPercent(clippedStart);
        const endPercent = timeToPercent(clippedEnd);

        const widthPercent = endPercent - startPercent || 2;

        const color = colorCodeFunc(event.tags);

        return (
          <EventRow
            key={event.id || idx}
            event={event}
            eventStart={eventStart}
            eventEnd={eventEnd}
            startPercent={startPercent}
            endPercent={endPercent}
            widthPercent={widthPercent}
            color={color}
            isWarmthMode={isWarmthMode}
            isMobile={isMobile}
            titleColClass={titleColClass}
            formatDate={formatDate}
            hoveredEventId={hoveredEventId}
            setHoveredEventId={setHoveredEventId}
            openModal={setModalEvent}
          />
        );
      })}

      {/* Mobile modal — portal-rendered over the viewport */}
      {modalEvent &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center p-4"
            style={{ zIndex: 9999 }}
            onClick={() => setModalEvent(null)}
          >
            <div
              className="relative max-w-sm w-full max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setModalEvent(null)}
                className="absolute top-2 right-2 bg-white text-gray-700 rounded-full w-8 h-8 flex items-center justify-center text-lg shadow-lg hover:bg-gray-100"
                style={{ zIndex: 10000 }}
                aria-label="Close"
              >
                ✕
              </button>
              <Card
                title={modalEvent.title}
                desc={modalEvent.desc}
                tags={modalEvent.tags}
                date={modalEvent.start}
                images={collectImageUrls(modalEvent.content_blocks)}
              />
              <div className="mt-3 flex justify-center">
                <Link
                  to={
                    modalEvent.project_id
                      ? `/Projects/${modalEvent.project_id}`
                      : `/Events/${modalEvent.id}`
                  }
                  className={`
                    inline-block px-4 py-2 rounded-lg font-semibold shadow
                    ${
                      isWarmthMode
                        ? "bg-[#E94E41] text-white hover:opacity-90"
                        : "bg-cyan-500 text-white hover:opacity-90"
                    }
                  `}
                  onClick={() => setModalEvent(null)}
                >
                  View Details →
                </Link>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

/**
 * A single event row on the timeline.
 * Desktop: hover shows a positioned card above/below the row.
 * Mobile: tap opens a full modal via the parent's openModal callback.
 */
function EventRow({
  event,
  eventStart,
  eventEnd,
  startPercent,
  endPercent,
  widthPercent,
  color,
  isWarmthMode,
  isMobile,
  titleColClass,
  formatDate,
  hoveredEventId,
  setHoveredEventId,
  openModal,
}) {
  const rowRef = useRef(null);
  const [cardBelow, setCardBelow] = useState(false);

  const isHovered = hoveredEventId === event.id;

  useEffect(() => {
    if (!isHovered || !rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    const CARD_HEIGHT_ESTIMATE = 260;
    setCardBelow(rect.top < CARD_HEIGHT_ESTIMATE);
  }, [isHovered]);

  const startShort = formatShortMonth(eventStart);
  const endShort = formatShortMonth(eventEnd);
  const dateLabel =
    startShort === endShort ? startShort : `${startShort} – ${endShort}`;

  // On mobile, tapping the row anywhere (title button OR bar) opens the modal.
  const handleMobileClick = (e) => {
    if (isMobile) {
      e.preventDefault();
      openModal(event);
    }
  };

  // Bars in the right half of the timeline show their date label to the left
  // of the bar so it doesn't run off-screen.
  const labelOnLeft = startPercent > 50;

  return (
    <div
      ref={rowRef}
      className={`flex items-center transition-colors duration-300 rounded-2xl p-2 sm:p-3 mb-3 border shadow-md
    ${isWarmthMode ? "bg-white/20 border-[#e2eafc]" : "bg-[#1b2433]/30 border-cyan-700/50"}
    ${isMobile ? "cursor-pointer" : ""}
  `}
      onMouseEnter={() => !isMobile && setHoveredEventId(event.id)}
      onMouseLeave={() => !isMobile && setHoveredEventId(null)}
      onClick={handleMobileClick}
    >
      <Link
        to={
          event.project_id
            ? `/Projects/${event.project_id}`
            : `/Events/${event.id}`
        }
        onClick={handleMobileClick}
        className={`${titleColClass} text-center text-[11px] leading-tight sm:text-sm font-semibold rounded transition-all duration-300 hover:opacity-80`}
        style={{
          backgroundColor: color.bg,
          color: color.text,
          border: `2px solid ${isWarmthMode ? "#E94E41" : "#0ff"}`,
          padding: "0.4rem 0.3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "2.5rem",
          wordBreak: "break-word",
          overflowWrap: "anywhere",
        }}
      >
        <span className="block w-full">{event.title}</span>
      </Link>

      <div className="flex-1 relative h-8 ml-2 rounded min-w-0">
        <div
          className="absolute h-6 rounded shadow"
          style={{
            left: `${startPercent}%`,
            width: `${widthPercent}%`,
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: color.bar,
          }}
        />

        {/* Full date range next to bar on tablet+ (desktop) */}
        <div
          className="absolute h-full items-center text-xs font-medium hidden sm:flex"
          style={{
            left: `${endPercent - startPercent === 0 ? startPercent + 2 : endPercent}%`,
            transform: "translateX(4px)",
            color: isWarmthMode ? "#4B5563" : "#0ff",
          }}
        >
          {formatDate(eventStart)} - {formatDate(eventEnd)}
        </div>

        {/* Mobile date label — flips to the left if the bar is in the right half of the timeline */}
        {isMobile &&
          (labelOnLeft ? (
            <div
              className="absolute h-full flex items-center text-[10px] font-medium whitespace-nowrap"
              style={{
                right: `${100 - startPercent}%`,
                transform: "translateX(-4px)",
                color: isWarmthMode ? "#4B5563" : "#0ff",
                top: 0,
              }}
            >
              {dateLabel}
            </div>
          ) : (
            <div
              className="absolute h-full flex items-center text-[10px] font-medium whitespace-nowrap"
              style={{
                left: `${endPercent}%`,
                transform: "translateX(4px)",
                color: isWarmthMode ? "#4B5563" : "#0ff",
                top: 0,
              }}
            >
              {dateLabel}
            </div>
          ))}

        {/* Desktop hovercard only */}
        {!isMobile && isHovered && (
          <div
            className={`absolute z-50 ${cardBelow ? "top-full mt-2" : "bottom-full mb-2"}`}
            style={{ left: `${startPercent}%` }}
          >
            <Card
              title={event.title}
              desc={event.desc}
              tags={event.tags}
              date={event.start}
              images={collectImageUrls(event.content_blocks)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
