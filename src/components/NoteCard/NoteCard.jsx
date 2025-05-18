import { format } from "date-fns";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function NoteCard({ note }) {
  const [updateTodoItem, setUpdateTodoItem] = useState(note?.todoItems);

  const navigate = useNavigate();

  const handelUpdate = () => {
    const updateNote = {
      ...note,
      todoItems: updateTodoItem,
    };
    fetch("http://localhost:3000/todo/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateNote),
    }).then((res) => {
      res.json();
      if (res.ok) {
        Swal.fire({
          title: "Todo Updated successfully",
          icon: "success",
          draggable: true,
        });
      }
      setTimeout(() => {
        navigate(0);
      }, 1500);
    });
  };
  const handleComplete = () => {
    const updateNote = {
      ...note,
      completed: true,
    };
    fetch("http://localhost:3000/todo/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateNote),
    }).then((res) => {
      res.json();
      if (res.ok) {
        Swal.fire({
          title: "Your todo is complete",
          icon: "success",
          draggable: true,
        });
      }
      setTimeout(() => {
        navigate(0);
      }, 1500);
    });
  };

  const handelDelete = (id) => {
    // console.log(id);

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch("http://localhost:3000/todo/delete/" + id, {
            method: "DELETE",
          }).then((res) => {
            res.json();
            if (res.ok) {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Todo is deleted successfully.",
                icon: "success",
              });
              setTimeout(() => {
                navigate(0);
              }, 1500);
            }
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Todo is not delete",
            icon: "error",
          });
        }
      });
  };
  return (
    <div
      className={`card  ${
        note.type === "Link"
          ? "bg-[#E0E7FF]"
          : note.type === "Todo"
          ? "bg-[#DBFCE7]"
          : note.type === "Note"
          ? "bg-[#FEF9C2]"
          : "bg-base-100"
      } shadow-md hover:shadow-lg transition-shadow `}
    >
      <div className="card-body p-4">
        <div className="flex justify-between items-start">
          <h2 className="card-title text-lg">{note.title}</h2>
          <div className=" flex gap-2 items-center">
            <span className="badge badge-info badge-sm">{note.type}</span>
            <button
              onClick={() => handelDelete(note._id)}
              className="btn btn-outline btn-error"
            >
              <MdDeleteForever size={25} />
            </button>
          </div>
        </div>

        {note.type === "Link" && (
          <a
            href={note.link}
            className="link link-primary text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            {note.link}
          </a>
        )}

        {note.type === "Todo" && (
          <ul className="list-disc pl-5 space-y-1">
            {updateTodoItem.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <input
                  disabled={note.completed}
                  type="checkbox"
                  checked={item.completed}
                  className="checkbox checkbox-xs"
                  onChange={(e) => {
                    setUpdateTodoItem((prev) =>
                      prev.map((todo, idx) =>
                        idx === index
                          ? { ...todo, completed: e.target.checked }
                          : todo
                      )
                    );
                  }}
                />
                <span>{item.text}</span>
              </li>
            ))}
            {/* <p>Due Date: {note.dueDate}</p> */}
          </ul>
        )}

        <p className="text-sm text-gray-600 mt-2">{note.description}</p>

        <div className="flex flex-wrap gap-2 mt-3">
          {note?.tags?.map((tag, i) => (
            <span
              key={i}
              className={`badge badge-sm ${
                tag === "health"
                  ? "badge-error"
                  : tag === "work"
                  ? "badge-info"
                  : "badge-success"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between">
          <div className="mt-3 text-xs text-gray-500">
            {note.dueDate &&
              format(new Date(note.dueDate), "'Due Date:' MMM d, yyyy")}
          </div>
          {note.type === "Todo" && (
            <div className="flex gap-4">
              {!note.completed && (
                <button
                  onClick={() => handelUpdate()}
                  className="btn btn-outline btn-primary"
                >
                  Update
                </button>
              )}
              <button
                onClick={handleComplete}
                disabled={note.completed}
                className="btn btn-outline btn-primary"
              >
                Complete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
