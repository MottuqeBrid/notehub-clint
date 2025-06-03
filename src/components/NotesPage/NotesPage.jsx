// pages/NotesPage.jsx
import { useState } from "react";
import NoteCard from "../NoteCard/NoteCard";
import AddNoteModal from "../AddNoteModal/AddNoteModal";
import { Link } from "react-router";

export default function NotesPage({
  todos,
  links,
  note,
  totalNotes,
  setTotalNotes,
  results,
}) {
  // console.log(totalNotes);
  const [notes, setNotes] = useState(totalNotes);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-6">
      <div className="flex flex-col gap-3 sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Notes</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add New Note
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        {["all", "Note", "Link", "Todo"].map((category) => (
          <button
            key={category}
            className={`btn ${
              selectedCategory === category ? "btn-active" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category === "Todo" ? "Tasks" : category}
          </button>
        ))}
        <Link className="btn" to="/cover-page">
          Cover Page
        </Link>
      </div>

      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {totalNotes.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No notes found.
          </div>
        )}
        {selectedCategory === "all" &&
          results
            .slice(0, 12)
            .map((note, i) => (
              <NoteCard
                key={i}
                note={note}
                totalNotes={totalNotes}
                setTotalNotes={setTotalNotes}
              />
            ))}
        {selectedCategory === "Note" &&
          note
            .slice(0, 12)
            .map((note, i) => (
              <NoteCard
                key={i}
                note={note}
                totalNotes={totalNotes}
                setTotalNotes={setTotalNotes}
              />
            ))}
        {selectedCategory === "Link" &&
          links
            .slice(0, 12)
            .map((note, i) => (
              <NoteCard
                key={i}
                note={note}
                totalNotes={totalNotes}
                setTotalNotes={setTotalNotes}
              />
            ))}
        {selectedCategory === "Todo" &&
          todos
            .slice(0, 12)
            .map((note, i) => (
              <NoteCard
                key={i}
                note={note}
                totalNotes={totalNotes}
                setTotalNotes={setTotalNotes}
              />
            ))}
      </div>

      <div className="flex w-full justify-center mt-8">
        {totalNotes && (
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
