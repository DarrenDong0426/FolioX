import React, { useState } from "react";
import { useTheme } from "../hooks/themeContext";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/**
 * BlockEditor
 *
 * Props:
 *   blocks    — current array of block objects
 *   onChange  — fn(newBlocks: array) to update parent state
 *
 * Manages: add, edit, drag-to-reorder, delete blocks.
 */
export default function BlockEditor({ blocks, onChange }) {
  const { isWarmthMode } = useTheme();

  // ---- DnD setup ----
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = blocks.findIndex((_, i) => `block-${i}` === active.id);
    const newIndex = blocks.findIndex((_, i) => `block-${i}` === over.id);
    onChange(arrayMove(blocks, oldIndex, newIndex));
  };

  // ---- Block manipulation helpers ----

  const updateBlock = (index, newBlock) => {
    const updated = [...blocks];
    updated[index] = newBlock;
    onChange(updated);
  };

  const removeBlock = (index) => {
    if (!window.confirm("Delete this block?")) return;
    onChange(blocks.filter((_, i) => i !== index));
  };

  const addBlock = (type) => {
    const newBlock = createBlankBlock(type);
    onChange([...blocks, newBlock]);
  };

  // ---- Theme styles ----

  const blockCardClass = isWarmthMode
    ? "bg-white border-pink-200"
    : "bg-[#0a0e27]/60 border-cyan-700";

  const inputClass = `w-full border rounded-lg px-3 py-2 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 ${
    isWarmthMode
      ? "border-gray-300 focus:ring-purple-400"
      : "border-cyan-700 focus:ring-cyan-400"
  }`;

  const addButtonClass = isWarmthMode
    ? "bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white hover:opacity-90"
    : "bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90";

  const iconButtonClass = `text-xs px-2 py-1 rounded ${
    isWarmthMode
      ? "text-gray-600 hover:bg-pink-100"
      : "text-cyan-300 hover:bg-cyan-900/40"
  }`;

  // ---- Render each block's edit form based on type ----

  const renderBlockEditor = (block, index) => {
    switch (block.type) {
      case "heading":
        return (
          <div className="space-y-2">
            <div className="grid grid-cols-[auto_1fr] gap-2">
              <select
                value={block.level || 2}
                onChange={(e) =>
                  updateBlock(index, {
                    ...block,
                    level: parseInt(e.target.value, 10),
                  })
                }
                className={`${inputClass} w-24`}
              >
                <option value={1}>H1</option>
                <option value={2}>H2</option>
                <option value={3}>H3</option>
                <option value={4}>H4</option>
              </select>
              <input
                type="text"
                value={block.text || ""}
                onChange={(e) =>
                  updateBlock(index, { ...block, text: e.target.value })
                }
                placeholder="Heading text..."
                className={inputClass}
              />
            </div>
          </div>
        );

      case "paragraph":
        return (
          <div className="space-y-1">
            <textarea
              rows={4}
              value={block.text || ""}
              onChange={(e) =>
                updateBlock(index, { ...block, text: e.target.value })
              }
              placeholder="Paragraph text — markdown supported (**bold**, *italic*, - bullets, [links](url))"
              className={inputClass}
            />
            <p className="text-xs opacity-60">
              Supports markdown: <strong>**bold**</strong>, <em>*italic*</em>,
              lists with - or 1., links with [text](url)
            </p>
          </div>
        );

      case "image":
        return (
          <ImageBlockEditor
            block={block}
            onUpdate={(b) => updateBlock(index, b)}
            inputClass={inputClass}
          />
        );

      case "video": {
        const convertYouTubeUrl = (url) => {
          if (!url) return url;
          const match = url.match(
            /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/,
          );
          if (match) {
            return `https://www.youtube.com/embed/${match[1]}`;
          }
          return url;
        };

        return (
          <div className="space-y-2">
            <input
              type="text"
              value={block.url || ""}
              onChange={(e) => {
                const converted = convertYouTubeUrl(e.target.value);
                updateBlock(index, { ...block, url: converted });
              }}
              placeholder="Paste any YouTube URL"
              className={inputClass}
            />
            {block.url && (
              <p className="text-xs opacity-60 break-all">Using: {block.url}</p>
            )}
          </div>
        );
      }

      case "code":
        return (
          <div className="space-y-2">
            <input
              type="text"
              value={block.language || ""}
              onChange={(e) =>
                updateBlock(index, { ...block, language: e.target.value })
              }
              placeholder="Language (e.g. python, javascript, c++)"
              className={`${inputClass} w-48`}
            />
            <textarea
              rows={6}
              value={block.code || ""}
              onChange={(e) =>
                updateBlock(index, { ...block, code: e.target.value })
              }
              placeholder="// Code here..."
              className={`${inputClass} font-mono text-sm`}
              spellCheck={false}
            />
          </div>
        );

      case "demo":
        return (
          <div className="space-y-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1 opacity-70">
                HTML
              </label>
              <textarea
                rows={4}
                value={block.html || ""}
                onChange={(e) =>
                  updateBlock(index, { ...block, html: e.target.value })
                }
                placeholder='<div id="root"></div>'
                className={`${inputClass} font-mono text-sm`}
                spellCheck={false}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1 opacity-70">
                CSS
              </label>
              <textarea
                rows={4}
                value={block.css || ""}
                onChange={(e) =>
                  updateBlock(index, { ...block, css: e.target.value })
                }
                placeholder="body { margin: 0; }"
                className={`${inputClass} font-mono text-sm`}
                spellCheck={false}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1 opacity-70">
                JavaScript
              </label>
              <textarea
                rows={8}
                value={block.js || ""}
                onChange={(e) =>
                  updateBlock(index, { ...block, js: e.target.value })
                }
                placeholder="// Animation, canvas, anything..."
                className={`${inputClass} font-mono text-sm`}
                spellCheck={false}
              />
            </div>
          </div>
        );

      case "pdf":
        return (
          <PdfBlockEditor
            block={block}
            onUpdate={(b) => updateBlock(index, b)}
            inputClass={inputClass}
          />
        );
      default:
        return (
          <p className="text-sm opacity-60 italic">
            Unknown block type: {block.type}
          </p>
        );
    }
  };

  return (
    <div className="space-y-3">
      {blocks.length === 0 && (
        <p
          className={`text-sm opacity-60 italic ${
            isWarmthMode ? "text-gray-600" : "text-cyan-200"
          }`}
        >
          No content blocks yet. Click a button below to start.
        </p>
      )}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={blocks.map((_, i) => `block-${i}`)}
          strategy={verticalListSortingStrategy}
        >
          {blocks.map((block, idx) => (
            <SortableBlock key={`block-${idx}`} id={`block-${idx}`}>
              <div className={`p-3 rounded-lg border ${blockCardClass}`}>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-xs uppercase font-bold tracking-wider ${
                      isWarmthMode ? "text-pink-600" : "text-cyan-400"
                    }`}
                  >
                    {block.type}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeBlock(idx)}
                    className={`${iconButtonClass} text-red-500 hover:bg-red-100`}
                    aria-label="Delete block"
                  >
                    ✕
                  </button>
                </div>

                {renderBlockEditor(block, idx)}
              </div>
            </SortableBlock>
          ))}
        </SortableContext>
      </DndContext>

      {/* Add block controls */}
      <div className="flex flex-wrap gap-2 pt-2">
        <button
          type="button"
          onClick={() => addBlock("heading")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium ${addButtonClass}`}
        >
          + Heading
        </button>
        <button
          type="button"
          onClick={() => addBlock("paragraph")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium ${addButtonClass}`}
        >
          + Paragraph
        </button>
        <button
          type="button"
          onClick={() => addBlock("image")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium ${addButtonClass}`}
        >
          + Image
        </button>
        <button
          type="button"
          onClick={() => addBlock("video")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium ${addButtonClass}`}
        >
          + Video
        </button>
        <button
          type="button"
          onClick={() => addBlock("code")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium ${addButtonClass}`}
        >
          + Code
        </button>
        <button
          type="button"
          onClick={() => addBlock("demo")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium ${addButtonClass}`}
        >
          + Demo
        </button>
        <button
          type="button"
          onClick={() => addBlock("pdf")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium ${addButtonClass}`}
        >
          + PDF
        </button>
      </div>
    </div>
  );
}

// ---- Sortable wrapper ----

function SortableBlock({ id, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : "auto",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div className="flex gap-2 items-start">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="mt-3 cursor-grab active:cursor-grabbing px-2 py-1 rounded hover:bg-black/10 text-sm opacity-50 hover:opacity-100 select-none"
          aria-label="Drag to reorder"
          title="Drag to reorder"
        >
          ⋮⋮
        </button>
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
}

// ---- Image block sub-editor ----

function ImageBlockEditor({ block, onUpdate, inputClass }) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/content/upload-image", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Upload failed");
      }
      const { url } = await res.json();
      onUpdate({ ...block, url });
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-2">
      {block.url && (
        <img
          src={block.url}
          alt={block.caption || "Block image"}
          className="max-h-48 rounded border"
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
        className={inputClass}
      />
      {uploading && <p className="text-xs opacity-70">Uploading...</p>}
      {uploadError && <p className="text-red-500 text-xs">{uploadError}</p>}
      <input
        type="text"
        value={block.caption || ""}
        onChange={(e) => onUpdate({ ...block, caption: e.target.value })}
        placeholder="Caption (optional)"
        className={inputClass}
      />
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider mb-1 opacity-70">
          Size
        </label>
        <select
          value={block.size || "full"}
          onChange={(e) => onUpdate({ ...block, size: e.target.value })}
          className={inputClass}
        >
          <option value="small">Small (300px)</option>
          <option value="medium">Medium (500px)</option>
          <option value="large">Large (700px)</option>
          <option value="full">Full width</option>
        </select>
      </div>
    </div>
  );
}

function PdfBlockEditor({ block, onUpdate, inputClass }) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setUploadError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/content/upload-pdf", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Upload failed");
      }
      const { url } = await res.json();
      onUpdate({ ...block, url });
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-2">
      {block.url && (
        <p className="text-xs opacity-70 break-all">Current: {block.url}</p>
      )}
      <input
        type="file"
        accept="application/pdf"
        onChange={handleUpload}
        disabled={uploading}
        className={inputClass}
      />
      {uploading && <p className="text-xs opacity-70">Uploading...</p>}
      {uploadError && <p className="text-red-500 text-xs">{uploadError}</p>}
      <input
        type="text"
        value={block.caption || ""}
        onChange={(e) => onUpdate({ ...block, caption: e.target.value })}
        placeholder="Caption (optional)"
        className={inputClass}
      />
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider mb-1 opacity-70">
          Height (px)
        </label>
        <input
          type="number"
          value={block.height || 600}
          onChange={(e) =>
            onUpdate({ ...block, height: parseInt(e.target.value, 10) || 600 })
          }
          className={inputClass}
        />
      </div>
    </div>
  );
}

// ---- Helpers ----

function createBlankBlock(type) {
  switch (type) {
    case "heading":
      return { type: "heading", text: "", level: 2 };
    case "paragraph":
      return { type: "paragraph", text: "" };
    case "image":
      return { type: "image", url: "", caption: "", size: "full" };
    case "video":
      return { type: "video", url: "" };
    case "code":
      return { type: "code", language: "javascript", code: "" };
    case "demo":
      return { type: "demo", html: "", css: "", js: "" };
    case "pdf":
      return { type: "pdf", url: "", caption: "", height: 600 };
    default:
      return { type };
  }
}
