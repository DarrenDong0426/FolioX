import React from 'react';
import { useTheme } from '../hooks/themeContext';

/**
 * Renders an array of content blocks.
 *
 * Block format:
 *   { type: 'heading', text: '...', level: 2 }
 *   { type: 'paragraph', text: '...' }
 *
 * Used by both:
 *   - Public detail pages (Projects/:id, Events/:id)
 *   - Admin preview mode
 */
export default function BlockRenderer({ blocks }) {
  const { isWarmthMode } = useTheme();

  if (!blocks || blocks.length === 0) {
    return (
      <p className={`text-center italic opacity-60 py-8 ${
        isWarmthMode ? 'text-gray-600' : 'text-cyan-200'
      }`}>
        No content yet.
      </p>
    );
  }

  const textColor = isWarmthMode ? 'text-gray-800' : 'text-cyan-100';
  const headingColor = isWarmthMode ? 'text-[#8B2D2D]' : 'text-cyan-300';

  return (
    <div className="prose max-w-none space-y-4">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'heading': {
            const level = block.level || 2;
            const Tag = `h${Math.min(Math.max(level, 1), 6)}`;
            const sizeClass = {
              1: 'text-4xl',
              2: 'text-3xl',
              3: 'text-2xl',
              4: 'text-xl',
              5: 'text-lg',
              6: 'text-base',
            }[level] || 'text-2xl';
            return (
              <Tag
                key={idx}
                className={`${sizeClass} font-bold mt-6 mb-2 ${headingColor}`}
              >
                {block.text}
              </Tag>
            );
          }

          case 'paragraph':
            return (
              <p key={idx} className={`leading-relaxed ${textColor}`}>
                {block.text}
              </p>
            );
          case 'image': {
              const sizeMap = {
                small: 'max-w-xs',     // ~300px
                medium: 'max-w-md',    // ~500px
                large: 'max-w-2xl',    // ~700px
                full: 'w-full',
              };
              const sizeClass = sizeMap[block.size] || 'w-full';
              return (
                <figure key={idx} className="my-4 flex flex-col items-center">
                  <img
                    src={block.url}
                    alt={block.caption || ''}
                    className={`${sizeClass} rounded-lg shadow`}
                  />
                  {block.caption && (
                    <figcaption className={`text-sm mt-2 text-center italic opacity-70 ${textColor}`}>
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              );
            }
          case 'video':
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

          case 'code':
            return (
              <div key={idx} className="my-4">
                {block.language && (
                  <div className={`text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-t ${
                    isWarmthMode ? 'bg-pink-100 text-pink-700' : 'bg-cyan-900/40 text-cyan-300'
                  }`}>
                    {block.language}
                  </div>
                )}
                <pre className={`p-4 overflow-x-auto text-sm font-mono ${
                  block.language ? 'rounded-b' : 'rounded'
                } ${
                  isWarmthMode ? 'bg-gray-100 text-gray-800' : 'bg-[#0a0e27] text-cyan-100'
                }`}>
                  <code>{block.code}</code>
                </pre>
              </div>
            );

          case 'demo':
            return <DemoBlock key={idx} block={block} />;

          default:
            // Unknown block type — render nothing (or a debug warning in dev)
            console.warn(`Unknown block type: ${block.type}`);
            return null;
        }
      })}
    </div>
  );
}

function DemoBlock({ block }) {
  const { isWarmthMode } = useTheme();

  // Compose the full HTML document the iframe will run
  const srcDoc = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  body { margin: 0; padding: 1rem; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
  ${block.css || ''}
</style>
</head>
<body>
  ${block.html || ''}
  <script>
    try {
      ${block.js || ''}
    } catch (err) {
      document.body.innerHTML = '<pre style="color: red; padding: 1rem;">' + err.toString() + '</pre>';
    }
  </script>
</body>
</html>
  `.trim();

  return (
    <div className={`my-4 rounded-lg overflow-hidden border-2 ${
      isWarmthMode ? 'border-pink-300' : 'border-cyan-700'
    }`}>
      <div className={`text-xs px-3 py-1 font-mono uppercase tracking-wider ${
        isWarmthMode ? 'bg-pink-100 text-pink-700' : 'bg-cyan-900/40 text-cyan-300'
      }`}>
        Interactive demo
      </div>
      <iframe
        srcDoc={srcDoc}
        sandbox="allow-scripts"
        className="w-full"
        style={{ minHeight: '400px', border: 'none', background: 'white' }}
        title="Interactive demo"
      />
    </div>
  );
}