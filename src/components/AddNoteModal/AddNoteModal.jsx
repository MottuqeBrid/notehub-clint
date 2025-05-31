import { useState } from "react";
import useAuth from "../hooks/useAuth";

export default function AddNoteModal({ onSave, show, onClose }) {
  const { user } = useAuth();
  const [note, setNote] = useState({
    title: "",
    description: "",
    type: "Note",
    tags: [],
    date: new Date().toISOString(),
    todoItems: [],
    dueDate: "",
  });

  const [currentItem, setCurrentItem] = useState("");
  const [currentTags, setCurrentTags] = useState("");

  const handleAddItem = () => {
    if (currentItem.trim()) {
      setNote((prev) => ({
        ...prev,
        todoItems: [
          ...(prev.todoItems || []),
          { text: currentItem.trim(), completed: false },
        ],
      }));
      setCurrentItem("");
    }
  };
  const handleAddTags = () => {
    if (currentTags.trim()) {
      setNote((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTags.trim()],
      }));
      setCurrentTags("");
    }
  };

  const handleSubmit = () => {
    fetch(`${import.meta.env.VITE_API_URL}/todo/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        userId: user._id,
        ...note,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Note data:", data.data);
        onSave(data);
        onClose();
        setNote({
          title: "",
          description: "",
          type: "Note",
          tags: [],
          date: new Date().toISOString(),
          todoItems: [],
          dueDate: "",
        });
      })
      .catch((error) => {
        console.error("Error adding note:", error);
      });
  };

  return (
    <div className={`modal ${show ? "modal-open" : ""}`}>
      <div className="modal-box w-11/12 max-w-2xl">
        <h3 className="font-bold text-lg mb-4">Create New Note</h3>

        <form className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Note Type</span>
            </label>
            <select
              className="select select-bordered w-full"
              value={note.type}
              onChange={(e) => setNote({ ...note, type: e.target.value })}
            >
              <option value="Note">Note</option>
              <option value="Link">Link</option>
              <option value="Todo">Todo</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
            />
          </div>

          {note.type === "Link" && (
            <div className="form-control">
              <label className="label">
                <span className="label-text">URL</span>
              </label>
              <input
                type="url"
                className="input input-bordered w-full"
                value={note.link || ""}
                onChange={(e) => setNote({ ...note, link: e.target.value })}
              />
            </div>
          )}

          {note.type === "Todo" && (
            <div className="form-control">
              <label className="label">
                <span className="label-text">Todo Items</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="input input-bordered flex-1"
                  value={currentItem}
                  onChange={(e) => setCurrentItem(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddItem()}
                />
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleAddItem}
                >
                  Add Item
                </button>
              </div>
              <ul className="mt-2 space-y-1">
                {note.todoItems?.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="text-sm">• {item.text}</span>
                  </li>
                ))}
              </ul>
              {/* Due Date Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-lg">Due Date</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered input-lg"
                  value={note.dueDate || ""}
                  onChange={(e) =>
                    setNote({ ...note, dueDate: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          <div className="form-control">
            <label className="label">
              <span className="label-text">Content</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-32 w-full"
              value={note.description}
              onChange={(e) =>
                setNote({ ...note, description: e.target.value })
              }
            />
          </div>

          {/* tags */}

          <div className="flex gap-2">
            <input
              type="text"
              className="input input-bordered flex-1"
              value={currentTags}
              onChange={(e) => setCurrentTags(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddTags()}
            />
            <button
              type="button"
              className="btn btn-outline"
              onClick={handleAddTags}
            >
              Add Tags
            </button>
          </div>

          <ul className="mt-2 space-y-1">
            {note.tags?.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-sm">• {item}</span>
              </li>
            ))}
          </ul>

          <div className="modal-action">
            <button className="btn" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Create Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
