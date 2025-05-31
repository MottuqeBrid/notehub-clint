import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const AccountBlocked = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      {/* Warning Icon */}
      <motion.div
        className="bg-red-100 rounded-full p-6 mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <svg
          className="w-12 h-12 text-red-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01M4.93 4.93a10 10 0 0114.14 0m0 14.14a10 10 0 01-14.14 0m14.14 0L4.93 4.93"
          />
        </svg>
      </motion.div>

      {/* Title */}
      <motion.h1
        className="text-3xl font-bold text-gray-800 mb-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Your Account is Blocked
      </motion.h1>

      {/* Message */}
      <motion.p
        className="text-gray-600 text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        We have temporarily blocked your account due to suspicious activities.
        Please contact our support team for further assistance.
      </motion.p>

      {/* Contact Support Button */}
      <motion.a
        href="/contact-support" // Change this to your support/contact page
        className="mt-8 px-6 py-3 bg-red-500 text-white rounded-full shadow hover:shadow-lg transition duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Contact Support
      </motion.a>
    </div>
  );
};

export default AccountBlocked;
