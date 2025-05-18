// pages/Dashboard.jsx
import { useEffect, useState } from "react";
import AddNoteModal from "../AddNoteModal/AddNoteModal";
import { Link, useLoaderData } from "react-router";
import NotesPage from "../NotesPage/NotesPage";

export default function Dashboard() {
  const initialTodo = useLoaderData();

  const [showModal, setShowModal] = useState(false);
  const [totalNotes, setTotalNotes] = useState(initialTodo);
  const [todos, setTodos] = useState(
    totalNotes.filter((todo) => todo.type === "Todo")
  );
  const [links, setLinks] = useState(
    totalNotes.filter((todo) => todo.type === "Link")
  );
  const [note, setNote] = useState(
    totalNotes.filter((todo) => todo.type === "Note")
  );

  useEffect(() => {
    setTodos(totalNotes.filter((todo) => todo.type === "Todo"));
    setLinks(totalNotes.filter((todo) => todo.type === "Link"));
    setNote(totalNotes.filter((todo) => todo.type === "Note"));
  }, [totalNotes, showModal]);

  return (
    <div className="min-h-screen bg-base-200">
      <div className="">
        {/* Main Content */}
        <div className="drawer-content p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">My Dashboard</h1>
            {/* Add Note Button */}
            {/* <button
              className="btn btn-primary mb-4"
              onClick={() => setShowModal(true)}
            >
              Add New Note
            </button> */}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h2 className="card-title">Total Notes</h2>
                <p className="text-3xl">{totalNotes.length}</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h2 className="card-title">To-dos</h2>
                <p className="text-3xl">{todos.length}</p>
                <div className="text-sm">
                  {todos.filter((todo) => todo.completed === true).length}{" "}
                  completed
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h2 className="card-title">Links</h2>
                <p className="text-3xl">{links.length}</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow">
              <div className="card-body">
                <h2 className="card-title">Notes</h2>
                <p className="text-3xl">{note.length}</p>
              </div>
            </div>
          </div>

          <NotesPage setTotalNotes={setTotalNotes} totalNotes={totalNotes} />

          {/* Add Note Modal */}
          <AddNoteModal
            // setTotalNotes={setTotalNotes}
            show={showModal}
            // totalNotes={totalNotes}
            // setShowModal={setShowModal}
            onClose={() => setShowModal(false)}
            onSave={(newNote) => {
              setTotalNotes([...totalNotes, { ...newNote }]);
              setShowModal(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}
