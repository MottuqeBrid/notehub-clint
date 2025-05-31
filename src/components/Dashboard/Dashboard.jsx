// pages/Dashboard.jsx
import { useEffect, useState } from "react";
import AddNoteModal from "../AddNoteModal/AddNoteModal";
import NotesPage from "../NotesPage/NotesPage";
import StatsCards from "../StatsCards/StatsCards";
import axios from "axios";

export default function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [totalNotes, setTotalNotes] = useState([]);
  const [todos, setTodos] = useState(
    totalNotes?.filter((todo) => todo.type === "Todo")
  );
  const [links, setLinks] = useState(
    totalNotes?.filter((todo) => todo.type === "Link")
  );
  const [note, setNote] = useState(
    totalNotes?.filter((todo) => todo.type === "Note")
  );
  console.log(totalNotes);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/todo/all`, {
        withCredentials: true,
      })
      .then((res) => {
        setTotalNotes(res.data || []);
      });
  }, []);

  useEffect(() => {
    setTodos(totalNotes?.filter((todo) => todo.type === "Todo"));
    setLinks(totalNotes?.filter((todo) => todo.type === "Link"));
    setNote(totalNotes?.filter((todo) => todo.type === "Note"));
  }, [totalNotes]);

  const onSave = (newNote) => {
    setTotalNotes((prevNotes) => [newNote, ...prevNotes]);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="">
        {/* Main Content */}
        <div className="drawer-content p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">My Dashboard</h1>
          </div>

          {/* Stats Cards */}
          <StatsCards
            totalNotes={totalNotes}
            todos={todos}
            links={links}
            note={note}
          />
          <NotesPage
            setTotalNotes={setTotalNotes}
            todos={todos}
            links={links}
            note={note}
            totalNotes={totalNotes}
          />

          {/* Add Note Modal */}
          <AddNoteModal
            show={showModal}
            onClose={() => setShowModal(false)}
            onSave={onSave}
          />
        </div>
      </div>
    </div>
  );
}
