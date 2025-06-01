import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router";

export default function ProfilePage() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/user/profile`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.user);
          setUser(res.data.user);
        } else {
          console.error("Failed to load user profile");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 rounded-xl shadow-md bg-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Cover Page */}
      {user.coverPage?.length > 0 && (
        <motion.div
          className="relative rounded-lg overflow-hidden h-48 mb-4"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <img
            src={user.coverPage[0]} // Show first cover image
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}

      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        {/* Profile Picture */}
        <motion.div
          className="w-28 h-28 rounded-full overflow-hidden border-4 border-primary shadow-md"
          whileHover={{ scale: 1.1 }}
        >
          <img
            src={user.profilePicture || "/default-avatar.png"}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* User Info */}
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl font-bold capitalize text-primary">
            {user.name}
          </h2>
          <p className="text-gray-600">{user.email}</p>
          {user.phone && (
            <p className="text-gray-500 text-sm">📞 {user.phone}</p>
          )}
          {user.bio && <p className="mt-2 text-gray-700 italic">{user.bio}</p>}
          {user.location && (
            <p className="text-gray-400 text-sm">📍 {user.location}</p>
          )}

          {/* User Type */}
          <span
            className={`inline-block mt-2 px-2 py-1 rounded text-xs font-semibold ${
              user.userType === "admin"
                ? "bg-red-100 text-red-600"
                : user.userType === "moderator"
                ? "bg-purple-100 text-purple-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {user.userType}
          </span>
        </div>
      </div>

      {/* Status Badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        {user.isVerified && (
          <motion.span
            className="badge badge-success"
            whileHover={{ scale: 1.1 }}
          >
            Verified
          </motion.span>
        )}
        {user.isActive && (
          <motion.span className="badge badge-info" whileHover={{ scale: 1.1 }}>
            Active
          </motion.span>
        )}
        {user.isBlocked && (
          <motion.span
            className="badge badge-error"
            whileHover={{ scale: 1.1 }}
          >
            Blocked
          </motion.span>
        )}
        {user.isDeleted && (
          <motion.span
            className="badge badge-warning"
            whileHover={{ scale: 1.1 }}
          >
            Deleted
          </motion.span>
        )}
      </div>

      {/* Social Links */}
      <div className="mt-4 flex flex-wrap gap-3">
        {user.socialLinks?.facebook && (
          <a
            href={user.socialLinks.facebook}
            className="text-blue-600 hover:underline"
            target="_blank"
          >
            Facebook
          </a>
        )}
        {user.socialLinks?.twitter && (
          <a
            href={user.socialLinks.twitter}
            className="text-blue-400 hover:underline"
            target="_blank"
          >
            Twitter
          </a>
        )}
        {user.socialLinks?.instagram && (
          <a
            href={user.socialLinks.instagram}
            className="text-pink-500 hover:underline"
            target="_blank"
          >
            Instagram
          </a>
        )}
        {user.socialLinks?.linkedin && (
          <a
            href={user.socialLinks.linkedin}
            className="text-blue-700 hover:underline"
            target="_blank"
          >
            LinkedIn
          </a>
        )}
        {user.socialLinks?.website && (
          <a
            href={user.socialLinks.website}
            className="text-gray-700 hover:underline"
            target="_blank"
          >
            Website
          </a>
        )}
      </div>

      {/* Education */}
      {user.education && (
        <div className="mt-4 p-3 bg-gray-50 rounded shadow-inner">
          <h3 className="font-semibold text-lg mb-1">Education</h3>
          <p>🎓 School: {user.education.school}</p>
          <p>🏫 College: {user.education.collage}</p>
          <p>🎓 Degree: {user.education.degree}</p>
          <p>🏛️ University: {user.education.university}</p>
          <p>📅 Year: {user.education.year}</p>
        </div>
      )}

      {/* Job Info */}
      {user.job && (
        <div className="mt-4 p-3 bg-gray-50 rounded shadow-inner">
          <h3 className="font-semibold text-lg mb-1">Job</h3>
          <p>🏢 Company: {user.job.company}</p>
          <p>💼 Title: {user.job.title}</p>
          <p>🌍 Work Location: {user.job.location?.workLocation}</p>
          <p>🏠 Address: {user.job.location?.presentAddress}</p>
          <p>🏠 Permanent Address: {user.job.location?.permanentAddress}</p>
          <p>🏙️ City: {user.job.location?.city}</p>
          <p>
            ⏳ Start:{" "}
            {user.job.startDate
              ? new Date(user.job.startDate).toLocaleDateString()
              : "N/A"}
          </p>
          <p>
            ⏳ End:{" "}
            {user.job.endDate
              ? new Date(user.job.endDate).toLocaleDateString()
              : "Present"}
          </p>
        </div>
      )}

      {/* Skills */}
      {user.skills && (
        <div className="mt-4">
          <p className="font-semibold text-gray-700">🛠️ Skills:</p>
          <p className="text-gray-600">{user.skills}</p>
        </div>
      )}

      {/* Student/Employee ID */}
      {user.studentId && (
        <p className="mt-2 text-sm text-gray-500">
          🎓 Student ID: {user.studentId}
        </p>
      )}
      {user.employeeId && (
        <p className="mt-2 text-sm text-gray-500">
          🆔 Employee ID: {user.employeeId}
        </p>
      )}

      {/* Security Questions (Secure Block) */}
      {user.securityQuestions?.length > 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded shadow-inner">
          <h3 className="font-semibold text-red-600 mb-1">
            🔒 Security Questions
          </h3>
          {user.securityQuestions.map((q, i) => (
            <div key={i} className="text-sm text-red-500">
              Q: {q.question} <br />
              A: {q.answer ? "********" : "N/A"}
            </div>
          ))}
        </div>
      )}

      {/* Last Activity */}
      <div className="mt-4 text-xs text-gray-400 space-y-1">
        <p>Last Login: {new Date(user.lastLogin).toLocaleString()}</p>
        <p>
          Password Changed: {new Date(user.lastPasswordChange).toLocaleString()}
        </p>
        <p>Last Logout: {new Date(user.lastLogout).toLocaleString()}</p>
        <p>
          Password Reset: {new Date(user.lastPasswordReset).toLocaleString()}
        </p>
      </div>
      {/* Update Profile Button */}
      <motion.div
        className="mt-6 flex justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          onClick={() => {
            navigate("/update-profile", { state: user });
          }}
          className="px-4 py-2 bg-primary text-white rounded-md shadow hover:bg-primary/80 transition-colors duration-300"
        >
          Update Profile
        </button>
      </motion.div>
    </motion.div>
  );

  //   return (
  //     <motion.div
  //       className="max-w-3xl mx-auto p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800"
  //       initial={{ opacity: 0, y: 20 }}
  //       animate={{ opacity: 1, y: 0 }}
  //       transition={{ duration: 0.5 }}
  //     >
  //       {/* Cover Page */}
  //       {user.coverPage?.length > 0 && (
  //         <motion.div
  //           className="relative rounded-lg overflow-hidden h-48 mb-4"
  //           initial={{ scale: 1.05 }}
  //           animate={{ scale: 1 }}
  //           transition={{ duration: 0.6, ease: "easeInOut" }}
  //         >
  //           <img
  //             src={user.coverPage[0]} // First cover image
  //             alt="Cover"
  //             className="w-full h-full object-cover"
  //           />
  //         </motion.div>
  //       )}

  //       <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
  //         {/* Profile Picture */}
  //         <motion.div
  //           className="w-28 h-28 rounded-full overflow-hidden border-4 border-primary shadow-md"
  //           whileHover={{ scale: 1.1 }}
  //         >
  //           <img
  //             src={user.profilePicture || "/default-avatar.png"}
  //             alt="Profile"
  //             className="w-full h-full object-cover"
  //           />
  //         </motion.div>

  //         {/* User Info */}
  //         <div className="flex-1 text-center sm:text-left">
  //           <h2 className="text-2xl font-bold capitalize text-primary">
  //             {user.name}
  //           </h2>
  //           <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
  //           {user.phone && (
  //             <p className="text-gray-500 text-sm">📞 {user.phone}</p>
  //           )}

  //           {/* User Type */}
  //           <span
  //             className={`inline-block mt-2 px-2 py-1 rounded text-xs font-semibold ${
  //               user.userType === "admin"
  //                 ? "bg-red-100 text-red-600"
  //                 : user.userType === "moderator"
  //                 ? "bg-purple-100 text-purple-600"
  //                 : "bg-green-100 text-green-600"
  //             }`}
  //           >
  //             {user.userType}
  //           </span>
  //         </div>
  //       </div>

  //       {/* Status Badges */}
  //       <div className="flex flex-wrap gap-2 mt-4">
  //         {user.isVerified && (
  //           <motion.span
  //             className="badge badge-success"
  //             whileHover={{ scale: 1.1 }}
  //           >
  //             Verified
  //           </motion.span>
  //         )}
  //         {user.isActive && (
  //           <motion.span className="badge badge-info" whileHover={{ scale: 1.1 }}>
  //             Active
  //           </motion.span>
  //         )}
  //         {user.isBlocked && (
  //           <motion.span
  //             className="badge badge-error"
  //             whileHover={{ scale: 1.1 }}
  //           >
  //             Blocked
  //           </motion.span>
  //         )}
  //         {user.isDeleted && (
  //           <motion.span
  //             className="badge badge-warning"
  //             whileHover={{ scale: 1.1 }}
  //           >
  //             Deleted
  //           </motion.span>
  //         )}
  //       </div>

  //       {/* Last Login & Activity */}
  //       <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 space-y-1">
  //         <p>Last Login: {new Date(user.lastLogin).toLocaleString()}</p>
  //         <p>
  //           Password Changed: {new Date(user.lastPasswordChange).toLocaleString()}
  //         </p>
  //         <p>Last Logout: {new Date(user.lastLogout).toLocaleString()}</p>
  //         <p>
  //           Last Password Reset:{" "}
  //           {new Date(user.lastPasswordReset).toLocaleString()}
  //         </p>
  //       </div>

  //       {/* Todo Count */}
  //       <div className="mt-4">
  //         <motion.div
  //           className="p-2 bg-blue-100 rounded text-blue-700 inline-block"
  //           initial={{ scale: 0 }}
  //           animate={{ scale: 1 }}
  //           transition={{ delay: 0.2 }}
  //         >
  //           Total Notes: {user.todo?.length || 0}
  //         </motion.div>
  //       </div>
  //     </motion.div>
  //   );
}
