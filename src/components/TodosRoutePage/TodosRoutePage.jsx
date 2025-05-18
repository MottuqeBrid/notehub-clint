import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import NoteCard from "../NoteCard/NoteCard";

export default function TodosRoutePage() {
  const notes = useLoaderData(); // all notes/todos loaded from the server
  const [filteredTodos, setFilteredTodos] = useState([]);

  useEffect(() => {
    const onlyTodos = notes.filter((item) => item.type === "Todo");
    setFilteredTodos(onlyTodos.reverse()); // Latest first
  }, [notes]);

  return (
    <div className="min-h-screen p-6 bg-base-200">
      <h1 className="text-3xl font-bold mb-6">All To-dos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTodos.map((note) => (
          <NoteCard key={note._id} note={note} />
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
