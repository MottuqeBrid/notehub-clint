// pages/NotesPage.jsx
import { useState } from "react";
import NoteCard from "../NoteCard/NoteCard";
import AddNoteModal from "../AddNoteModal/AddNoteModal";
import { Link } from "react-router";

export default function NotesPage({ totalNotes, setTotalNotes }) {
  // console.log(totalNotes);
  const [notes, setNotes] = useState(totalNotes);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showModal, setShowModal] = useState(false);

  const filteredNotes = notes
    .filter((note) =>
      selectedCategory === "all" ? true : note.type === selectedCategory
    )
    .slice(0, 12);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Notes</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add New Note
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        {["all", "Note", "Link", "Todo"].map((category) => (
          <button
            key={category}
            className={`btn ${
              selectedCategory === category ? "btn-active" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.map((note, i) => (
          <NoteCard
            totalNotes={totalNotes}
            setTotalNotes={setTotalNotes}
            key={i}
            note={note}
          />
        ))}
      </div>

      <div className="flex w-full justify-center mt-8">
        {notes.length > 12 && (
          <Link to="/all-notes" className="btn btn-soft btn-info">
            Show All
          </Link>
        )}
      </div>

      <AddNoteModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={(newNote) => setNotes([...notes, newNote])}
      />
    </div>
  );
}
