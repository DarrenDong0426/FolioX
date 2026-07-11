// Imports
import { useState, useEffect } from "react";
import Dropdown from "../../components/Dropdown";
import Filter from "../../components/Filter";
import SearchBar from "../../components/SearchBar";
import { useProjects } from "../../hooks/projectListContext";
import { useTheme } from "../../hooks/themeContext.jsx";
import { useTagColor } from "../../components/TagColor.jsx";

export default function Controls() {
  const {
    query,
    setQuery,
    setCurrentPage,
    options,
    dropDown,
    setDropDown,
    isOpen,
    setIsOpen,
    filters,
    setFilters,
    filterOpen,
    setFilterOpen,
  } = useProjects();

  const { isWarmthMode } = useTheme();

  // Track unique tags across all projects for the filter dropdown
  const [allTags, setAllTags] = useState({ types: [], languages: [] });

  useEffect(() => {
    fetch("/api/projects?page=1&query=&dropDown=Most%20Recent&filters=")
      .then((res) => res.json())
      .then((data) => {
        const typeSet = new Set();
        const langSet = new Set();
        (data.projects || []).forEach((p) => {
          (p.type || []).forEach((t) => typeSet.add(t));
          (p.language || []).forEach((l) => langSet.add(l));
        });
        setAllTags({
          types: Array.from(typeSet).sort(),
          languages: Array.from(langSet).sort(),
        });
      })
      .catch((err) => console.error("Failed to load filter tags:", err));
  }, []);

  const colorCodeFunc = useTagColor();

  const filterSections = [
    {
      title: "Project Category",
      options: allTags.types.map((t) => ({ label: t, type: "type" })),
    },
    {
      title: "Languages",
      options: allTags.languages.map((l) => ({ label: l, type: "language" })),
    },
  ];

  return (
    <div
      className={`
      w-full max-w-4xl mx-auto mb-3 px-3 py-2 sm:px-4
      rounded-xl shadow border transition-colors duration-500
      ${
        isWarmthMode
          ? "bg-[#FFF8F3]/60 border-[#E94E41]"
          : "bg-[#101727]/90 border-cyan-700"
      }
    `}
    >
      {/* Stack vertically on mobile, horizontal on tablet+ */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
        <div className="flex-1 min-w-0">
          <SearchBar
            query={query}
            setQuery={setQuery}
            setCurrentPage={setCurrentPage}
          />
        </div>

        {/* Dropdown + Filter share a row on mobile so they're side-by-side */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <Dropdown
            options={options}
            dropDown={dropDown}
            setDropDown={setDropDown}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />

          <Filter
            filters={filters}
            setFilters={setFilters}
            filterOpen={filterOpen}
            setFilterOpen={setFilterOpen}
            filterSections={filterSections}
            setCurrentPage={setCurrentPage}
            colorCode={colorCodeFunc}
          />
        </div>
      </div>
    </div>
  );
}
