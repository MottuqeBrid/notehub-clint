import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import NoteCard from "../NoteCard/NoteCard";

export default function NotesRoutePage() {
  const notes = useLoaderData();
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    const onlyNotes = notes.filter((item) => item.type === "Note");
    setFilteredNotes(onlyNotes.reverse()); // Latest first
  }, [notes]);

  return (
    <div className="min-h-screen p-6 bg-base-200">
      <h1 className="text-3xl font-bold mb-6">All Notes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.map((note) => (
          <NoteCard key={note._id} note={note} />
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
