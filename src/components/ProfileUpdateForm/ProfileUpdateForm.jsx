import { useState, useEffect } from "react";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const ProfileUpdateForm = () => {
  const [user, setUser] = useState(null);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/profile`,
          { withCredentials: true }
        );
        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const newFormData = {
      ...user,
      name: data.name,
      phone: data.phone,
      bio: {
        ...user?.bio,
        about: data.about,
        birthday: data.birthday,
        gender: data.gender,
        hobbies: data.hobbies,
        languages: data.languages,
        interests: data.interests,
        photo: {
          ...user?.bio?.photo,
        },
      },
      location: {
        ...user?.location,
        presentAddress: data.presentAddress,
        permanentAddress: data.permanentAddress,
        city: data.city,
        state: data.state,
        country: data.country,
        zipCode: data.zipCode,
      },
      job: {
        ...user?.job,
        company: data.company,
        title: data.jobTitle,
        startDate: data.startDate,
        location: {
          workLocation: data.workLocation,
        },
      },
      education: {
        ...user?.education,
        degree: data.degree,
        school: data.school,
        university: {
          name: data.universityName,
        },
      },
      socialLinks: {
        ...user?.socialLinks,
        facebook: data.facebook,
        instagram: data.instagram,
        twitter: data.twitter,
        linkedin: data.linkedin,
        website: data.website,
      },
    };

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/user/update-profile`,
        newFormData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.success) {
        Navigate("/profile");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Something went wrong. Try again.");
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <motion.div
        className="max-w-2xl mx-auto bg-white shadow-xl rounded-lg p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-semibold mb-4">Update Your Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Basic */}
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              defaultValue={user.name || ""}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              defaultValue={user.phone || ""}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-gray-700 font-medium">About</label>
            <textarea
              name="about"
              defaultValue={user.bio?.about || ""}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Birthday</label>
            <input
              type="date"
              name="birthday"
              defaultValue={
                user.bio?.birthday
                  ? new Date(user.bio.birthday).toISOString().split("T")[0]
                  : ""
              }
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Gender</label>
            <select
              name="gender"
              className="w-full border rounded px-3 py-2 mt-1"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Hobbies</label>
            <input
              type="text"
              name="hobbies"
              defaultValue={user.bio?.hobbies || ""}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Languages</label>
            <input
              type="text"
              name="languages"
              defaultValue={user.bio?.languages || ""}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Interests</label>
            <input
              type="text"
              name="interests"
              defaultValue={user.bio?.interests || ""}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-medium">
              Present Address
            </label>
            <input
              type="text"
              name="presentAddress"
              defaultValue={user.location?.presentAddress || ""}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Permanent Address
            </label>
            <input
              type="text"
              name="permanentAddress"
              defaultValue={user.location?.permanentAddress || ""}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">City</label>
            <input
              type="text"
              name="city"
              defaultValue={user.location?.city || ""}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">State</label>
            <input
              type="text"
              name="state"
              defaultValue={user.location?.state || ""}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Country</label>
            <input
              type="text"
              name="country"
              defaultValue={user.location?.country || ""}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Zip Code</label>
            <input
              type="text"
              name="zipCode"
              defaultValue={user.location?.zipCode || ""}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          {/* Job */}
          <div>
            <label className="block text-gray-700 font-medium">Job Title</label>
            <input
              type="text"
              name="jobTitle"
              defaultValue={user.job?.title || ""}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Company</label>
            <input
              type="text"
              name="company"
              defaultValue={user.job?.company || ""}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              defaultValue={
                user.job?.startDate
                  ? new Date(user.job.startDate).toISOString().split("T")[0]
                  : ""
              }
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              Work Location
            </label>
            <input
              type="text"
              name="workLocation"
              defaultValue={user.job?.location?.workLocation || ""}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          {/* Education */}
          <div>
            <label className="block text-gray-700 font-medium">Degree</label>
            <input
              type="text"
              name="degree"
              defaultValue={user.education?.degree || ""}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">School</label>
            <input
              type="text"
              name="school"
              defaultValue={user.education?.school || ""}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">
              University
            </label>
            <input
              type="text"
              name="universityName"
              defaultValue={user.education?.university?.name || ""}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          {/* Social Links */}
          <div>
            <label className="block text-gray-700 font-medium">Facebook</label>
            <input
              type="text"
              name="facebook"
              defaultValue={user.socialLinks?.facebook || ""}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Instagram</label>
            <input
              type="text"
              name="instagram"
              defaultValue={user.socialLinks?.instagram || ""}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Twitter</label>
            <input
              type="text"
              name="twitter"
              defaultValue={user.socialLinks?.twitter || ""}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">LinkedIn</label>
            <input
              type="text"
              name="linkedin"
              defaultValue={user.socialLinks?.linkedin || ""}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Website</label>
            <input
              type="text"
              name="website"
              defaultValue={user.socialLinks?.website || ""}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          {/* Submit */}
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition duration-300"
            >
              Save Changes
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ProfileUpdateForm;
