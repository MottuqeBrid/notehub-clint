import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import NoteCard from "../NoteCard/NoteCard";
import ScrollToTop from "../../lib/ScrollToTop";

const FILTERS = ["All", "Note", "Link", "Todo"];

export default function ShowAllNotesPage() {
  const allItems = useLoaderData(); // expected to load all items
  const [filteredItems, setFilteredItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredItems(allItems.slice());
    } else {
      setFilteredItems(allItems.filter((item) => item.type === activeFilter));
    }
  }, [allItems, activeFilter]);

  return (
    <div className="min-h-screen p-6 bg-base-200">
      <ScrollToTop />
      <h1 className="text-3xl font-bold mb-6">Browse Your Items</h1>

      <div className="flex flex-col gap-3 sm:flex-row items-start sm:justify-between">
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
              {filter === "Todo" ? "Tasks" : filter}
            </button>
          ))}
        </div>
        <div className="flex justify-end mb-6">
          <Link
            to="/search"
            className="btn btn-primary"
            onClick={() => setActiveFilter("All")}
          >
            Search All
          </Link>
        </div>
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
