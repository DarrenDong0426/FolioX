import React, { useState } from 'react';
import { useTheme } from '../../../hooks/themeContext';

export default function TagSelector({ label, presets, selected, onChange, required = false, onDeletePreset }) {
  const { isWarmthMode } = useTheme();
  const [customInput, setCustomInput] = useState('');
  const [addingCustom, setAddingCustom] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const addTag = (tag) => {
    const clean = tag.trim();
    if (!clean || selected.includes(clean)) return;
    onChange([...selected, clean]);
  };

  const removeTag = (tag) => {
    onChange(selected.filter(t => t !== tag));
  };

  const handleAddCustom = () => {
    if (customInput.trim()) {
      addTag(customInput);
      setCustomInput('');
      setAddingCustom(false);
    }
  };

  const handleDeletePreset = (tag) => {
    const confirmation = window.prompt(
      `⚠️ DESTRUCTIVE ACTION\n\n` +
      `This will permanently delete "${tag}" from EVERY project that uses it. ` +
      `This cannot be undone.\n\n` +
      `Type "${tag}" exactly to confirm:`
    );

    if (confirmation === null) return;

    if (confirmation !== tag) {
      alert(`Confirmation didn't match "${tag}". Tag was not deleted.`);
      return;
    }

    onDeletePreset?.(tag);
  };

  const availablePresets = presets.filter(p => !selected.includes(p));

  const pillClass = isWarmthMode
    ? 'bg-pink-100 text-pink-800 border-pink-300'
    : 'bg-cyan-900/40 text-cyan-200 border-cyan-700';

  const removeButtonClass = isWarmthMode
    ? 'hover:text-red-600'
    : 'hover:text-red-400';

  const inputClass = `border rounded-lg px-3 py-2 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 ${
    isWarmthMode
      ? 'border-gray-300 focus:ring-purple-400'
      : 'border-cyan-700 focus:ring-cyan-400'
  }`;

  const dropdownItemClass = isWarmthMode
    ? 'hover:bg-pink-50 text-gray-700'
    : 'hover:bg-cyan-900/40 text-cyan-200';

  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selected.map(tag => (
            <span
              key={tag}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${pillClass}`}
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className={`text-base leading-none ${removeButtonClass}`}
                aria-label={`Remove ${tag} from this project`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <div className="flex-1 relative">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className={`${inputClass} w-full text-left flex justify-between items-center`}
          >
            <span className="text-gray-500">
              {availablePresets.length === 0 ? 'All presets selected' : `Select a ${label.toLowerCase().slice(0, -1)}...`}
            </span>
            <span className="text-xs opacity-60">▾</span>
          </button>

          {showDropdown && availablePresets.length > 0 && (
            <div className={`absolute z-10 mt-1 w-full max-h-60 overflow-y-auto rounded-lg shadow-lg border ${
              isWarmthMode ? 'bg-white border-gray-300' : 'bg-[#0a0e27] border-cyan-700'
            }`}>
              {availablePresets.map(preset => (
                <div
                  key={preset}
                  className={`flex justify-between items-center px-3 py-2 cursor-pointer ${dropdownItemClass}`}
                  onClick={() => {
                    addTag(preset);
                    setShowDropdown(false);
                  }}
                >
                  <span>{preset}</span>
                  {onDeletePreset && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePreset(preset);
                      }}
                      className="text-xs text-red-500 hover:text-red-700 ml-2"
                      aria-label={`Delete ${preset} from all projects`}
                      title="Delete from all projects forever"
                    >
                      🗑
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setAddingCustom(!addingCustom)}
          className={`px-3 py-2 rounded-lg text-sm font-medium ${
            isWarmthMode
              ? 'bg-pink-100 text-pink-600 hover:bg-pink-200'
              : 'bg-cyan-900/40 text-cyan-300 hover:bg-cyan-900/60'
          }`}
        >
          {addingCustom ? 'Cancel' : '+ Custom'}
        </button>
      </div>

      {addingCustom && (
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddCustom();
              }
            }}
            placeholder="Type a new tag..."
            autoFocus
            className={`${inputClass} flex-1`}
          />
          <button
            type="button"
            onClick={handleAddCustom}
            disabled={!customInput.trim()}
            className={`px-4 py-2 rounded-lg text-sm font-medium text-white disabled:opacity-50 ${
              isWarmthMode
                ? 'bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400'
                : 'bg-gradient-to-r from-cyan-500 to-blue-500'
            }`}
          >
            Add
          </button>
        </div>
      )}

      {required && (
        <input
          type="text"
          value={selected.join(',')}
          required
          tabIndex={-1}
          aria-hidden="true"
          className="sr-only"
          onChange={() => {}}
        />
      )}
    </div>
  );
}