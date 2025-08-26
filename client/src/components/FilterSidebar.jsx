import filterIcon from '../assets/images/filter.png';

export default function FilterSidebar( {filters, setFilters, filterOpen, setFilterOpen }) {

    const toggleCategory = (category) => {
    setFilters((prev) => {
      const categories = prev.category.includes(category)
        ? prev.category.filter((c) => c !== category) 
        : [...prev.category, category]; 
      return { ...prev, category: categories };
    });
  };

  return (
    <aside className="w-64">
        <div
        className="relative flex items-center space-x-2"
        ></div>
        <img
          src={filterIcon}
          alt="Filter Icon"
          className="w-6 h-6 cursor-pointer"
          onClick={() => setFilterOpen(!filterOpen)}
          />
      {filterOpen && (
        <div>
        <label>
            <input
            type="checkbox"
            checked={filters.category.includes("Software")}
            onChange={() => toggleCategory("Software")}
            />
            Software
        </label>
        <br />
        <label>
            <input
            type="checkbox"
            checked={filters.category.includes("Hardware")}
            onChange={() => toggleCategory("Hardware")}
            />
            Hardware
        </label>
        </div>
      )}
    </aside>
  );
}
