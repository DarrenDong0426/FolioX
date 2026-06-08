import React from "react";
import { useTheme } from "../hooks/themeContext";
import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";
import { slugifyHeading } from "./TableOfContents";

/**
 * Renders an array of content blocks.
 *
 * Used by both:
 *   - Public detail pages (Projects/:id, Events/:id)
 *   - Admin preview mode
 */
export default function BlockRenderer({ blocks }) {
  const { isWarmthMode } = useTheme();

  if (!blocks || blocks.length === 0) {
    return (
      <p
        className={`text-center italic opacity-60 py-8 ${
          isWarmthMode ? "text-gray-600" : "text-cyan-200"
        }`}
      >
        No content yet.
      </p>
    );
  }

  const textColor = isWarmthMode ? "text-gray-800" : "text-cyan-100";

  return (
    <div className="prose max-w-none space-y-4">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "heading": {
            const level = block.level || 2;
            const sizeClass =
              {
                1: "text-4xl md:text-5xl font-bold",
                2: "text-3xl md:text-4xl font-bold",
                3: "text-2xl md:text-3xl font-bold",
                4: "text-xl md:text-2xl font-bold",
              }[level] || "text-2xl font-bold";

            const slug = slugifyHeading(block.text || "");

            return (
              <div
                key={idx}
                id={slug}
                className={`mt-6 mb-3 scroll-mt-24 ${sizeClass} ${textColor}`}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkBreaks]}
                  components={{
                    p: ({ node, ...props }) => {
                      const HeadingTag = `h${level}`;
                      return <HeadingTag {...props} />;
                    },
                    a: ({ node, ...props }) => (
                      <a
                        className="underline hover:opacity-80"
                        target="_blank"
                        rel="noopener noreferrer"
                        {...props}
                      />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong className="font-extrabold" {...props} />
                    ),
                    em: ({ node, ...props }) => (
                      <em className="italic" {...props} />
                    ),
                    code: ({ node, ...props }) => (
                      <code
                        className="bg-black/10 px-1.5 py-0.5 rounded text-[0.85em] font-mono"
                        {...props}
                      />
                    ),
                  }}
                >
                  {block.text}
                </ReactMarkdown>
              </div>
            );
          }

          case "paragraph":
            return (
              <div key={idx} className={`my-3 markdown-body ${textColor}`}>
                <ReactMarkdown
                  remarkPlugins={[remarkBreaks]}
                  components={{
                    p: ({ node, ...props }) => (
                      <p className="mb-3" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul
                        className="list-disc list-inside ml-4 mb-3 space-y-1"
                        {...props}
                      />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol
                        className="list-decimal list-inside ml-4 mb-3 space-y-1"
                        {...props}
                      />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="ml-2" {...props} />
                    ),
                    a: ({ node, ...props }) => (
                      <a
                        className="underline hover:opacity-80"
                        target="_blank"
                        rel="noopener noreferrer"
                        {...props}
                      />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong className="font-bold" {...props} />
                    ),
                    em: ({ node, ...props }) => (
                      <em className="italic" {...props} />
                    ),
                    code: ({ node, ...props }) => (
                      <code
                        className="bg-black/10 px-1 py-0.5 rounded text-sm font-mono"
                        {...props}
                      />
                    ),
                  }}
                >
                  {block.text}
                </ReactMarkdown>
              </div>
            );

          case "image": {
            const sizeMap = {
              small: "max-w-xs",
              medium: "max-w-md",
              large: "max-w-2xl",
              full: "w-full",
            };
            const sizeClass = sizeMap[block.size] || "w-full";
            return (
              <figure key={idx} className="my-4 flex flex-col items-center">
                <img
                  src={block.url}
                  alt={block.caption || ""}
                  className={`${sizeClass} rounded-lg shadow`}
                />
                {block.caption && (
                  <figcaption
                    className={`text-sm mt-2 text-center italic opacity-70 ${textColor}`}
                  >
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          }

          case "video":
            return (
              <div key={idx} className="my-4 aspect-video">
                <iframe
                  src={block.url}
                  title={`Video ${idx}`}
                  className="w-full h-full rounded-lg shadow"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            );

          case "code":
            return (
              <div key={idx} className="my-4">
                {block.language && (
                  <div
                    className={`text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-t ${
                      isWarmthMode
                        ? "bg-pink-100 text-pink-700"
                        : "bg-cyan-900/40 text-cyan-300"
                    }`}
                  >
                    {block.language}
                  </div>
                )}
                <pre
                  className={`p-4 overflow-x-auto text-sm font-mono ${
                    block.language ? "rounded-b" : "rounded"
                  } ${
                    isWarmthMode
                      ? "bg-gray-100 text-gray-800"
                      : "bg-[#0a0e27] text-cyan-100"
                  }`}
                >
                  <code>{block.code}</code>
                </pre>
              </div>
            );

          case "demo":
            return <DemoBlock key={idx} block={block} />;

          case "pdf":
            return (
              <figure key={idx} className="my-4">
                <iframe
                  src={block.url}
                  title={block.caption || `PDF ${idx}`}
                  className="w-full rounded-lg shadow border border-gray-300"
                  style={{ height: `${block.height || 600}px` }}
                />
                <div className="text-center mt-2 text-sm opacity-70">
                  <a
                    href={block.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Open PDF in new tab
                  </a>
                  {block.caption && (
                    <span className={`italic ${textColor} block mt-1`}>
                      {block.caption}
                    </span>
                  )}
                </div>
              </figure>
            );
          default:
            console.warn(`Unknown block type: ${block.type}`);
            return null;
        }
      })}
    </div>
  );
}

function DemoBlock({ block }) {
  const { isWarmthMode } = useTheme();

  const srcDoc = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { margin: 0; padding: 1rem; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
  ${block.css || ""}
</style>
</head>
<body>
  ${block.html || ""}
  <script>
    try {
      ${block.js || ""}
    } catch (err) {
      document.body.innerHTML = '<pre style="color: red; padding: 1rem;">' + err.toString() + '</pre>';
    }
  </script>
</body>
</html>
  `.trim();

  return (
    <div
      className={`my-4 rounded-lg overflow-hidden border-2 ${
        isWarmthMode ? "border-pink-300" : "border-cyan-700"
      }`}
    >
      <div
        className={`text-xs px-3 py-1 font-mono uppercase tracking-wider ${
          isWarmthMode
            ? "bg-pink-100 text-pink-700"
            : "bg-cyan-900/40 text-cyan-300"
        }`}
      >
        Interactive demo
      </div>
      <iframe
        srcDoc={srcDoc}
        sandbox="allow-scripts"
        className="w-full"
        style={{ minHeight: "400px", border: "none", background: "white" }}
        title="Interactive demo"
      />
    </div>
  );
}
