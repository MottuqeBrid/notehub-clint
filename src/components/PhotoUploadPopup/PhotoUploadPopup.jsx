import axios from "axios";
import { useState } from "react";

export default function PhotoUploadPopup({ setUser, user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState({ profilePicture: "", coverPhoto: "" });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFile((prev) => ({ ...prev, [name]: files[0] }));
  };

  const uploadImage = async (singleFile) => {
    const apiKey = "e886cf72a11f7bf0816042684c2160d0";
    const singleFormData = new FormData();
    singleFormData.append("image", singleFile);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?expiration=600&key=${apiKey}`,
      {
        method: "POST",
        body: singleFormData,
      }
    );

    const result = await response.json();
    if (result.success) {
      return result.data.url;
    } else {
      console.error(result);
      throw new Error("Upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file.profilePicture && !file.coverPhoto) {
      alert("Please select at least one file!");
      return;
    }

    try {
      // Prepare the object to hold the URLs
      const uploadedPhotoUrls = {
        profilePicture: user.bio?.photo?.profilePicture || "",
        coverPhoto: user.bio?.photo?.coverPhoto || "",
      };

      // Upload profile picture if selected
      if (file.profilePicture) {
        const profileUrl = await uploadImage(file.profilePicture);
        uploadedPhotoUrls.profilePicture = profileUrl;
      }

      // Upload cover photo if selected
      if (file.coverPhoto) {
        const coverUrl = await uploadImage(file.coverPhoto);
        uploadedPhotoUrls.coverPhoto = coverUrl;
      }

      // Send both updated URLs to the backend in a single request
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/user/update-profile`,
        {
          bio: {
            photo: uploadedPhotoUrls,
          },
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        // Update the user state with the new photo URLs
        setUser({
          ...user,
          bio: {
            ...user.bio,
            photo: uploadedPhotoUrls,
          },
        });

        alert("Photos updated successfully!");
        setIsOpen(false); // close the popup
      } else {
        alert("Failed to update photos.");
      }
    } catch (error) {
      console.error(error);
      alert("Upload failed!");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded shadow"
        onClick={() => setIsOpen(true)}
      >
        Update Photo
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-80 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => setIsOpen(false)}
            >
              ✖️
            </button>
            <h2 className="text-lg font-bold mb-4">Update Photos</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label htmlFor="profilePicture" className="font-semibold">
                Profile Picture
              </label>
              <input
                name="profilePicture"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="border p-2 rounded"
              />
              <label htmlFor="coverPhoto" className="font-semibold">
                Cover Photo
              </label>
              <input
                name="coverPhoto"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="border p-2 rounded"
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded shadow"
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
