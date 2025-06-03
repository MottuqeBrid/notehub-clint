// pages/Dashboard.jsx
import { useEffect, useState } from "react";
import AddNoteModal from "../AddNoteModal/AddNoteModal";
import NotesPage from "../NotesPage/NotesPage";
import StatsCards from "../StatsCards/StatsCards";
import axios from "axios";
// import { useNavigate } from "react-router";
// import useAuth from "../hooks/useAuth";

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

  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  // const { user, loading } = useAuth();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (
  //     !loading &&
  //     user &&
  //     !user?.isBlocked &&
  //     !user?.isVerified &&
  //     user?.userType === "user"
  //   ) {
  //     navigate("/otp");
  //   }
  //   else if(!loading &&
  //     user &&
  //     user?.isBlocked &&
  //     !user?.isVerified &&
  //     user?.userType === "user"){
  //       navigate("/account-blocked");
  //     }
  // }, [user, loading, navigate]);

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

  useEffect(() => {
    if (searchText.trim() === "") {
      setResults(totalNotes);
      return;
    }

    const filtered = totalNotes.filter((item) =>
      (item.title + " " + item.description)
        .toLowerCase()
        .includes(searchText.toLowerCase())
    );

    setResults(filtered.reverse()); // latest first
  }, [searchText, totalNotes]);

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
          {/* search bar */}
          <div className="">
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
          </div>
          <NotesPage
            setTotalNotes={setTotalNotes}
            todos={todos}
            results={results}
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
