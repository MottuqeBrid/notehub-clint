// import { format } from "date-fns";
// import { useState } from "react";
// import { MdDeleteForever } from "react-icons/md";
// import Swal from "sweetalert2";

// export default function NoteCard({ note, totalNotes, setTotalNotes }) {
//   const [updateTodoItem, setUpdateTodoItem] = useState(note?.todoItems);

//   const handelUpdate = () => {
//     const updateNote = {
//       ...note,
//       todoItems: updateTodoItem,
//     };
//     // console.log(updateNote);
//     fetch(`${import.meta.env.VITE_API_URL}/todo/update`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",

//       body: JSON.stringify(updateNote),
//     })
//       .then((res) => {
//         if (res.ok) {
//           Swal.fire({
//             title: "Todo Updated successfully",
//             icon: "success",
//             draggable: true,
//           });
//         }
//         setTotalNotes(totalNotes);
//         // setTimeout(() => {
//         //   // navigate(0);
//         // }, 1500);
//         return res.json();
//       })
//       .then((data) => {
//         console.log(data);
//       });
//   };
//   const handleComplete = () => {
//     const updateNote = {
//       ...note,
//       completed: true,
//     };
//     fetch(`${import.meta.env.VITE_API_URL}/todo/update`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//       body: JSON.stringify(updateNote),
//     }).then((res) => {
//       res.json();
//       if (res.ok) {
//         Swal.fire({
//           title: "Your todo is complete",
//           icon: "success",
//           draggable: true,
//         });
//       }
//       const updatedNotes = totalNotes.map((n) => {
//         if (n.id === note.id) {
//           return {
//             ...n,
//             completed: true,
//           };
//         }
//         return n;
//       });
//       setTotalNotes(updatedNotes);
//     });
//   };

//   const handelDelete = (id) => {
//     // console.log(id);

//     const swalWithBootstrapButtons = Swal.mixin({
//       customClass: {
//         confirmButton: "btn btn-success",
//         cancelButton: "btn btn-danger",
//       },
//       buttonsStyling: false,
//     });
//     swalWithBootstrapButtons
//       .fire({
//         title: "Are you sure?",
//         text: "You won't be able to revert this!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Yes, delete it!",
//         cancelButtonText: "No, cancel!",
//         reverseButtons: true,
//       })
//       .then((result) => {
//         if (result.isConfirmed) {
//           fetch(`${import.meta.env.VITE_API_URL}/todo/delete/` + id, {
//             method: "DELETE",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             credentials: "include",
//           }).then((res) => {
//             res.json();
//             if (res.ok) {
//               swalWithBootstrapButtons.fire({
//                 title: "Deleted!",
//                 text: "Todo is deleted successfully.",
//                 icon: "success",
//               });
//               setTotalNotes((prevNotes) =>
//                 prevNotes.filter((note) => note._id !== id)
//               );
//             }
//           });
//         } else if (
//           /* Read more about handling dismissals below */
//           result.dismiss === Swal.DismissReason.cancel
//         ) {
//           swalWithBootstrapButtons.fire({
//             title: "Cancelled",
//             text: "Todo is not delete",
//             icon: "error",
//           });
//         }
//       });
//   };
//   return (
//     <div
//       className={`card  ${
//         note.type === "Link"
//           ? "bg-[#E0E7FF]"
//           : note.type === "Todo"
//           ? "bg-[#DBFCE7]"
//           : note.type === "Note"
//           ? "bg-[#FEF9C2]"
//           : "bg-base-100"
//       } shadow-md hover:shadow-lg transition-shadow `}
//     >
//       <div className="card-body p-4">
//         <div className="flex justify-between items-start">
//           <h2 className="card-title text-lg">{note.title}</h2>
//           <div className=" flex gap-2 items-center">
//             <span className="badge badge-info badge-sm">{note.type}</span>
//             <button
//               onClick={() => handelDelete(note._id)}
//               className="btn btn-outline btn-error"
//             >
//               <MdDeleteForever size={25} />
//             </button>
//           </div>
//         </div>

//         {note.type === "Link" && (
//           <a
//             href={note.link}
//             className="link link-primary text-sm"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             {note.link}
//           </a>
//         )}

//         {note.type === "Todo" && (
//           <ul className="list-disc pl-5 space-y-1">
//             {updateTodoItem.map((item, index) => (
//               <li key={index} className="flex items-center gap-2">
//                 <input
//                   disabled={note.completed}
//                   type="checkbox"
//                   checked={item.completed}
//                   className="checkbox checkbox-xs"
//                   onChange={(e) => {
//                     setUpdateTodoItem((prev) =>
//                       prev.map((todo, idx) =>
//                         idx === index
//                           ? { ...todo, completed: e.target.checked }
//                           : todo
//                       )
//                     );
//                   }}
//                 />
//                 <span>{item.text}</span>
//               </li>
//             ))}
//             {/* <p>Due Date: {note.dueDate}</p> */}
//           </ul>
//         )}

//         <p className="text-sm text-gray-600 mt-2">{note.description}</p>

//         <div className="flex flex-wrap gap-2 mt-3">
//           {note?.tags?.map((tag, i) => (
//             <span
//               key={i}
//               className={`badge badge-sm ${
//                 tag === "health"
//                   ? "badge-error"
//                   : tag === "work"
//                   ? "badge-info"
//                   : "badge-success"
//               }`}
//             >
//               {tag}
//             </span>
//           ))}
//         </div>

//         <div className="flex justify-between">
//           <div className="mt-3 text-xs text-gray-500">
//             {note.dueDate &&
//               format(new Date(note.dueDate), "'Due Date:' MMM d, yyyy")}
//           </div>
//           {note.type === "Todo" && (
//             <div className="flex gap-4">
//               {!note.completed && (
//                 <button
//                   onClick={() => handelUpdate()}
//                   className="btn btn-outline btn-primary"
//                 >
//                   Update
//                 </button>
//               )}
//               <button
//                 onClick={handleComplete}
//                 disabled={note.completed}
//                 className="btn btn-outline btn-primary"
//               >
//                 Complete
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { format } from "date-fns";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

export default function NoteCard({ note, totalNotes, setTotalNotes }) {
  const [updateTodoItem, setUpdateTodoItem] = useState(note?.todoItems);

  const handelUpdate = () => {
    const updateNote = {
      ...note,
      todoItems: updateTodoItem,
    };

    fetch(`${import.meta.env.VITE_API_URL}/todo/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(updateNote),
    })
      .then((res) => {
        if (res.ok) {
          Swal.fire({
            title: "Todo Updated successfully",
            icon: "success",
            draggable: true,
          });
        }
        setTotalNotes(totalNotes);
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  const handleComplete = () => {
    const updateNote = { ...note, completed: true };
    fetch(`${import.meta.env.VITE_API_URL}/todo/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
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
      const updatedNotes = totalNotes.map((n) =>
        n.id === note.id ? { ...n, completed: true } : n
      );
      setTotalNotes(updatedNotes);
    });
  };

  const handelDelete = (id) => {
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
          fetch(`${import.meta.env.VITE_API_URL}/todo/delete/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }).then((res) => {
            res.json();
            if (res.ok) {
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Todo is deleted successfully.",
                icon: "success",
              });
              setTotalNotes((prevNotes) =>
                prevNotes.filter((note) => note._id !== id)
              );
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Todo is not deleted",
            icon: "error",
          });
        }
      });
  };

  return (
    <div
      className={`card w-full max-w-full ${
        note.type === "Link"
          ? "bg-[#E0E7FF]"
          : note.type === "Todo"
          ? "bg-[#DBFCE7]"
          : note.type === "Note"
          ? "bg-[#FEF9C2]"
          : "bg-base-100"
      } shadow-md hover:shadow-lg transition-shadow rounded-xl overflow-hidden`}
    >
      <div className="card-body p-4 flex flex-col gap-3">
        {/* <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
          <h2 className="card-title text-base sm:text-lg break-words">
            {note.title}
          </h2>
          <div className="flex gap-2 items-center">
            <span className="badge badge-info badge-sm capitalize">
              {note.type}
            </span>
            <button
              onClick={() => handelDelete(note._id)}
              className="btn btn-xs btn-outline btn-error"
            >
              <MdDeleteForever size={18} />
            </button>
          </div>
        </div> */}
        <div className="flex justify-between items-center gap-2 flex-wrap">
          <h2 className="card-title text-base sm:text-lg flex-1 break-words">
            {note.title}
          </h2>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="badge badge-info badge-sm capitalize">
              {note.type === "Todo" ? "Task" : note.type}
            </span>
            <button
              onClick={() => handelDelete(note._id)}
              className="btn btn-xs btn-outline btn-error"
            >
              <MdDeleteForever size={18} />
            </button>
          </div>
        </div>

        {note.type === "Link" && (
          <a
            href={note.link}
            className="link link-primary text-sm truncate"
            target="_blank"
            rel="noopener noreferrer"
          >
            {note.link}
          </a>
        )}

        {note.type === "Todo" && (
          <ul className="list-disc pl-4 space-y-1">
            {updateTodoItem.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <input
                  disabled={note.completed}
                  type="checkbox"
                  checked={item.completed}
                  className="checkbox checkbox-xs"
                  onChange={(e) =>
                    setUpdateTodoItem((prev) =>
                      prev.map((todo, idx) =>
                        idx === index
                          ? { ...todo, completed: e.target.checked }
                          : todo
                      )
                    )
                  }
                />
                <span className="text-sm break-words">{item.text}</span>
              </li>
            ))}
          </ul>
        )}

        {note.description && (
          <p className="text-sm text-gray-600 break-words">
            {note.description}
          </p>
        )}

        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {note.tags.map((tag, i) => (
              <span
                key={i}
                className={`badge badge-xs capitalize ${
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
        )}

        <div className="flex flex-col sm:flex-row justify-between items-center mt-2 gap-2 text-xs text-gray-500">
          {note.dueDate && (
            <span>{format(new Date(note.dueDate), "'Due:' MMM d, yyyy")}</span>
          )}
          {note.type === "Todo" && (
            <div className="flex gap-2 mt-1 sm:mt-0">
              {!note.completed && (
                <button
                  onClick={handelUpdate}
                  className="btn btn-xs btn-outline btn-primary"
                >
                  Update
                </button>
              )}
              <button
                onClick={handleComplete}
                disabled={note.completed}
                className="btn btn-xs btn-outline btn-primary"
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
