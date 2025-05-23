import { Link } from "react-router";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center text-center p-6">
      <div className="max-w-2xl">
        <h1 className="text-5xl font-bold mb-6">Welcome to NoteHub</h1>
        <p className="text-lg text-gray-600 mb-8">
          Manage your notes, links, and todos in one simple and elegant app.
        </p>

        <div className="flex justify-center gap-4">
          <Link to="/dashboard" className="btn btn-primary">
            Go to Dashboard
          </Link>
          <Link to="/search" className="btn btn-outline">
            Search Notes
          </Link>
        </div>
      </div>
    </div>
  );
}
