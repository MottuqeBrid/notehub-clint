import React from "react";

const StatsCards = ({ totalNotes, todos, links, note }) => {
  return (
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
            {todos.filter((todo) => todo.completed === true).length} completed
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
  );
};

export default StatsCards;
