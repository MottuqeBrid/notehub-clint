import { useEffect, useState } from "react";
import NoteCard from "../NoteCard/NoteCard";

export default function LinksRoutePage() {
  const [filteredLinks, setFilteredLinks] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/todo/all`)
      .then((res) => res.json())
      .then((data) => {
        setFilteredLinks(data.filter((note) => note.type === "Link"));
      });
  }, []);

  return (
    <div className="min-h-screen p-6 bg-base-200">
      <h1 className="text-3xl font-bold mb-6">All Links</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLinks.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            totalNotes={filteredLinks}
            setTotalNotes={setFilteredLinks}
          />
        ))}

        {filteredLinks.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No links found.
          </div>
        )}
      </div>
    </div>
  );
}
