import { Link } from "react-router";

export default function NoteCard({ note }) {
  return (
    <div className="card bg-base-100 shadow-md border">
      <div className="card-body">
        <div className="flex justify-between items-center">
          <h2 className="card-title">{note.title}</h2>
          <span className="badge badge-outline text-xs">{note.type}</span>
        </div>

        {note.description && (
          <p className="text-sm text-gray-600">{note.description}</p>
        )}

        {/* Optional: Link Preview */}
        {note.type === "Link" && note.link && (
          <a
            href={note.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline text-sm"
          >
            Visit Link
          </a>
        )}

        {/* Optional: Todo Checklist Preview */}
        {note.type === "Todo" && note.TodoItems?.length > 0 && (
          <ul className="list-disc list-inside text-sm mt-2 space-y-1">
            {note.TodoItems.slice(0, 3).map((item, idx) => (
              <li key={idx} className={item.completed ? "line-through" : ""}>
                {item.text}
              </li>
            ))}
            {note.TodoItems.length > 3 && (
              <li className="text-gray-400">+ more...</li>
            )}
          </ul>
        )}

        <div className="text-xs text-gray-400 mt-2">
          {new Date(note.createdAt).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
