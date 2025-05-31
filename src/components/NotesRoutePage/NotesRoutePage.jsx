import { useEffect, useState } from "react";
import NoteCard from "../NoteCard/NoteCard";

export default function NotesRoutePage() {
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/todo/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies in the request
    })
      .then((res) => res.json())
      .then((data) => {
        setFilteredNotes(data.filter((note) => note.type === "Note"));
      });
  }, []);

  return (
    <div className="min-h-screen p-6 bg-base-200">
      <h1 className="text-3xl font-bold mb-6">All Notes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            totalNotes={filteredNotes}
            setTotalNotes={setFilteredNotes}
          />
        ))}

        {filteredNotes.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No notes found.
          </div>
        )}
      </div>
    </div>
  );
}
