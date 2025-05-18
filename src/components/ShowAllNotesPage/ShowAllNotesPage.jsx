import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import NoteCard from "../NoteCard/NoteCard";
import ScrollToTop from "../../lib/ScrollToTop";

const FILTERS = ["All", "Note", "Link", "Todo"];

export default function ShowAllNotesPage() {
  const allItems = useLoaderData(); // expected to load all items
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    applyFilter(activeFilter);
  }, [allItems, activeFilter]);

  const applyFilter = (filter) => {
    if (filter === "All") {
      setFilteredItems(allItems.slice());
    } else {
      setFilteredItems(allItems.filter((item) => item.type === filter));
    }
  };

  return (
    <div className="min-h-screen p-6 bg-base-200">
      <ScrollToTop />
      <h1 className="text-3xl font-bold mb-6">Browse Your Items</h1>

      {/* Filter Menu */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            className={`btn btn-sm ${
              activeFilter === filter ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Display Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <NoteCard key={item._id} note={item} />
        ))}

        {filteredItems.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No{" "}
            {activeFilter !== "All"
              ? activeFilter.toLowerCase() + "s"
              : "items"}{" "}
            found.
          </div>
        )}
      </div>
    </div>
  );
}
