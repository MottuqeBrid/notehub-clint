import { useEffect, useState } from "react";
import NoteCard from "../NoteCard/NoteCard";

export default function TodosRoutePage() {
  const [filteredTodos, setFilteredTodos] = useState([]);

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
        setFilteredTodos(data.filter((note) => note.type === "Todo"));
      });
  }, []);

  return (
    <div className="min-h-screen p-6 bg-base-200">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">All To-dos</h1>
        <h1 className="text-3xl font-bold mb-6">
          Total Todo: {filteredTodos.length}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTodos.map((note) => (
          <NoteCard
            key={note._id}
            note={note}
            totalNotes={filteredTodos}
            setTotalNotes={setFilteredTodos}
          />
        ))}

        {filteredTodos.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No to-dos found.
          </div>
        )}
      </div>
    </div>
  );
}
