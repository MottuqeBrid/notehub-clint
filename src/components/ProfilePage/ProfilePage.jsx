import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router";
import PhotoUploadPopup from "../PhotoUploadPopup/PhotoUploadPopup";

export default function ProfilePage() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  console.log(user);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/user/profile`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          setUser(res.data.user);
        } else {
          console.error("Failed to load user profile");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 rounded-xl shadow-md bg-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Cover Photo */}
      {user.bio?.photo?.coverPhoto && (
        <div className="relative rounded-lg overflow-hidden h-48 mb-4">
          <img
            src={user.bio.photo.coverPhoto}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        {/* Profile Picture */}
        <div className="">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-primary shadow-md">
            <img
              src={user.bio?.photo?.profilePicture || "/default-avatar.png"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <PhotoUploadPopup setUser={setUser} user={user} />
        </div>

        {/* User Info */}
        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-2xl font-bold capitalize text-primary">
            {user.name}
          </h2>
          <p className="text-gray-600">{user.email}</p>
          {user.phone && <p className="text-gray-500">📞 {user.phone}</p>}

          {/* Bio Info */}
          {user.bio && (
            <div className="mt-2 text-sm text-gray-700 space-y-1">
              {user.bio.about && <p>📝 About: {user.bio.about}</p>}
              {user.bio.birthday && <p>🎂 Birthday: {user.bio.birthday}</p>}
              {user.bio.address && <p>🏠 Address: {user.bio.address}</p>}
              {user.bio.country && <p>🌍 Country: {user.bio.country}</p>}
              {user.bio.gender && <p>🚻 Gender: {user.bio.gender}</p>}
              {user.bio.hobbies && <p>🎯 Hobbies: {user.bio.hobbies}</p>}
              {user.bio.languages && <p>🗣️ Languages: {user.bio.languages}</p>}
              {user.bio.interests && <p>⭐ Interests: {user.bio.interests}</p>}
              {user?.todo && <p>📝 Your Todo Items: {user?.todo?.length}</p>}
              {user?.coverPage && (
                <p>📔 You create cover page: {user?.coverPage?.length}</p>
              )}
              {user.bio.achievements && (
                <p>🏆 Achievements: {user.bio.achievements}</p>
              )}
            </div>
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
          <span className="badge badge-success">Verified</span>
        )}
        {user.isActive && <span className="badge badge-info">Active</span>}
        {user.isBlocked && <span className="badge badge-error">Blocked</span>}
        {user.isDeleted && <span className="badge badge-warning">Deleted</span>}
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
        <div className="mt-4 p-3 bg-gray-50 rounded shadow-inner space-y-1">
          <h3 className="font-semibold text-lg mb-1">Education</h3>
          {user.education.school && <p>🎓 School: {user.education.school}</p>}
          {user.education.college?.name && (
            <p>🏫 College: {user.education.college.name}</p>
          )}
          {user.education.degree && <p>🎓 Degree: {user.education.degree}</p>}
          {user.education.university?.name && (
            <p>🏛️ University: {user.education.university.name}</p>
          )}
          {user.education.university?.department && (
            <p>🧑‍🏫 Department: {user.education.university.department}</p>
          )}
          {user.education.university?.year && (
            <p>📅 Year: {user.education.university.year}</p>
          )}
        </div>
      )}

      {/* Job */}
      {user.job && (
        <div className="mt-4 p-3 bg-gray-50 rounded shadow-inner space-y-1">
          <h3 className="font-semibold text-lg mb-1">Job</h3>
          {user.job.company && <p>🏢 Company: {user.job.company}</p>}
          {user.job.title && <p>💼 Title: {user.job.title}</p>}
          {user.job.location?.workLocation && (
            <p>🌍 Work Location: {user.job.location.workLocation}</p>
          )}
          {user.job.location?.presentAddress && (
            <p>🏠 Present Address: {user.job.location.presentAddress}</p>
          )}
          {user.job.location?.city && <p>🏙️ City: {user.job.location.city}</p>}
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

      {/* Security Questions */}
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

      {/* Activity Info */}
      <div className="mt-4 text-xs text-gray-400 space-y-1">
        {user.lastLogin && (
          <p>Last Login: {new Date(user.lastLogin).toLocaleString()}</p>
        )}
        {user.lastPasswordChange && (
          <p>
            Password Changed:{" "}
            {new Date(user.lastPasswordChange).toLocaleString()}
          </p>
        )}
        {user.lastLogout && (
          <p>Last Logout: {new Date(user.lastLogout).toLocaleString()}</p>
        )}
        {user.lastPasswordReset && (
          <p>
            Password Reset: {new Date(user.lastPasswordReset).toLocaleString()}
          </p>
        )}
      </div>

      {/* Update Profile Button */}
      <motion.div
        className="mt-6 flex justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          onClick={() => navigate("/update-profile", { state: user })}
          className="px-4 py-2 bg-primary text-white rounded-md shadow hover:bg-primary/80 transition-colors duration-300"
        >
          Update Profile
        </button>
      </motion.div>
    </motion.div>
  );
}
