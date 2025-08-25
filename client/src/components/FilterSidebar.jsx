// import { useFilters } from "./FilterContext";

// export default function FilterSidebar() {
//   const { filters, setFilters } = useFilters();

//   const toggleCategory = (cat) => {
//     setFilters((prev) => ({
//       ...prev,
//       category: prev.category.includes(cat)
//         ? prev.category.filter((c) => c !== cat)
//         : [...prev.category, cat],
//     }));
//   };

//   return (
//     <aside className="w-64 bg-gray-100 p-4">
//       <h2 className="font-bold">Filter</h2>
//       <label>
//         <input
//           type="checkbox"
//           checked={filters.category.includes("Software")}
//           onChange={() => toggleCategory("Software")}
//         />
//         Software
//       </label>
//       <br />
//       <label>
//         <input
//           type="checkbox"
//           checked={filters.category.includes("Hardware")}
//           onChange={() => toggleCategory("Hardware")}
//         />
//         Hardware
//       </label>
//     </aside>
//   );
// }
