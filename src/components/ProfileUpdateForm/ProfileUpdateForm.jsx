import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useLocation } from "react-router";

export default function ProfileUpdateForm() {
  const [user, setUser] = useState({});
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    location: user.location || "",
    bio: user.bio || "",
    skills: user.skills || "",
    jobTitle: user.job?.title || "",
    company: user.job?.company || "",
    workLocation: user.job?.location?.workLocation || "",
    // Add more fields as needed
  });
  useEffect(() => {
    setUser(location.state || {});
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user/update/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          showConfirmButton: false,
          timer: 1500,
        });
        // onProfileUpdated && onProfileUpdated(); // Callback to refresh data
      } else {
        throw new Error("Update failed!");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed to update",
        text: error.message,
      });
    }
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input input-bordered w-full"
            disabled
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Skills</label>
          <input
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Job Title</label>
          <input
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Company</label>
          <input
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Work Location</label>
          <input
            name="workLocation"
            value={formData.workLocation}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="btn btn-primary w-full mt-4"
        >
          Update Profile
        </motion.button>
      </form>
    </motion.div>
  );
}
