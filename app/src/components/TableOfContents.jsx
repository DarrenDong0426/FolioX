import React from "react";
import { useTheme } from "../hooks/themeContext";

/**
 * Strip common inline markdown for display in the TOC.
 * The full markdown is still rendered in the heading itself.
 */
function stripMarkdown(text) {
  if (!text) return "";
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1") // **bold**
    .replace(/\*(.*?)\*/g, "$1") // *italic*
    .replace(/__(.*?)__/g, "$1") // __bold__
    .replace(/_(.*?)_/g, "$1") // _italic_
    .replace(/\[(.*?)\]\(.*?\)/g, "$1") // [link](url)
    .replace(/`(.*?)`/g, "$1") // `code`
    .trim();
}

/**
 * Slugify text into a stable URL fragment.
 * Strips markdown first so "How **minimax** works" and "How minimax works" produce the same slug.
 */
export function slugifyHeading(text) {
  return stripMarkdown(text)
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");
}

/**
 * TableOfContents
 *
 * Props:
 *   blocks — the same content_blocks array passed to BlockRenderer
 */
export default function TableOfContents({ blocks }) {
  const { isWarmthMode } = useTheme();

  const headings = (blocks || []).filter((b) => b.type === "heading" && b.text);

  if (headings.length === 0) return null;

  const indentMap = {
    1: "pl-0",
    2: "pl-0",
    3: "pl-4",
    4: "pl-8",
    5: "pl-10",
    6: "pl-12",
  };
  const sizeMap = {
    1: "text-sm font-bold",
    2: "text-sm font-semibold",
    3: "text-sm",
    4: "text-xs",
    5: "text-xs",
    6: "text-xs",
  };

  return (
    <nav
      className={`
        w-full rounded-xl border-2 p-4 mb-6
        ${
          isWarmthMode
            ? "bg-[#FFF8F3]/90 border-[#E94E41]"
            : "bg-[#151C26]/90 border-cyan-700"
        }
      `}
      aria-label="Table of contents"
    >
      <p
        className={`text-xs uppercase tracking-widest font-bold mb-3 ${
          isWarmthMode ? "text-[#E94E41]" : "text-cyan-400"
        }`}
      >
        Contents
      </p>
      <ol className="space-y-1.5">
        {headings.map((block, idx) => {
          const slug = slugifyHeading(block.text);
          const displayText = stripMarkdown(block.text);
          const level = block.level || 2;

          return (
            <li key={idx} className={indentMap[level] || "pl-0"}>
              <a
                href={`#${slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(slug);
                  if (target) {
                    target.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                    // Update URL hash without triggering a jump
                    history.replaceState(null, "", `#${slug}`);
                  }
                }}
                className={`
                  ${sizeMap[level] || "text-sm"}
                  transition-colors duration-150 hover:underline underline-offset-2
                  ${
                    isWarmthMode
                      ? "text-[#264653] hover:text-[#E94E41]"
                      : "text-cyan-200 hover:text-cyan-400"
                  }
                `}
              >
                {displayText}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
