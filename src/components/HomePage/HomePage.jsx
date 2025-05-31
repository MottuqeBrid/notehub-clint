import { motion as Motion } from "framer-motion";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";

const HomePage = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      {/* Animated Heading */}
      <Motion.h1
        className="text-5xl font-bold text-gray-800 mb-6 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to <span className="text-blue-500">NoteHub</span>
      </Motion.h1>

      {/* Subheading */}
      <Motion.p
        className="text-lg text-gray-600 text-center max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        The simplest way to capture, organize, and manage your notes with ease.
        Start your journey towards better productivity today.
      </Motion.p>

      {/* Call to Action */}
      <Link to={`${user ? "/dashboard" : "/login"}`}>
        <Motion.button
          className="mt-10 px-8 py-3 bg-blue-500 text-white rounded-full shadow hover:shadow-lg transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </Motion.button>
      </Link>

      {/* Decorative Image */}
      <Motion.img
        src="https://images.unsplash.com/photo-1488998427799-e3362cec87c3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Notes"
        className="mt-12 rounded-lg shadow-lg w-[400px] h-[300px] object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1 }}
      />
    </div>
  );
};

export default HomePage;
