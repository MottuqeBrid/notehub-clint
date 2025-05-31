import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import NoteCard from "./NoteCard";

export default function SearchPage() {
  const allItems = useLoaderData(); // should include Notes, Links, and Todos
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (searchText.trim() === "") {
      setResults(allItems);
      return;
    }

    const filtered = allItems.filter((item) =>
      (item.title + " " + item.description)
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );

    setResults(filtered.reverse()); // latest first
  }, [searchText, allItems]);

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <h1 className="text-3xl font-bold mb-4">Search Notes, Links & Todos</h1>

      <input
        type="text"
        placeholder="Search by title or description..."
        className="input input-bordered w-full mb-6"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      {searchText.trim() !== "" && (
        <p className="mb-4 text-sm text-gray-500">
          {results.length} result{results.length !== 1 ? "s" : ""} found
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {results.map((item) => (
          <NoteCard key={item._id} note={item} />
        ))}

        {searchText && results.length === 0 && (
          <div className="col-span-full text-center text-gray-400">
            No results found.
          </div>
        )}
      </div>
    </div>
  );
}
