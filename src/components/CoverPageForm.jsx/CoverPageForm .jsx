/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

const CoverPageForm = ({ setFormData, formData, handleSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="bg-white rounded-xl shadow-2xl overflow-hidden"
        >
          <div className="bg-indigo-600 py-4 px-6">
            <h1 className="text-2xl font-bold text-white text-center">
              Cover Page Form
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-medium">Title:</span>
              </label>
              <textarea
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="textarea textarea-bordered h-24 text-lg w-full"
                placeholder="Enter assignment title"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Course Info */}
              <div className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Course Title:
                    </span>
                  </label>
                  <input
                    type="text"
                    name="courseTitle"
                    value={formData.courseTitle}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Section:</span>
                  </label>
                  <select
                    value={formData.section}
                    onChange={handleChange}
                    name="section"
                    className="input input-bordered w-full"
                  >
                    <option value="Both">Both</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Course Code:</span>
                  </label>
                  <input
                    type="text"
                    name="courseCode"
                    value={formData.courseCode}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              {/* Student Info */}
              <div className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Student Name:
                    </span>
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Student ID:</span>
                  </label>
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Student Discipline:
                    </span>
                  </label>
                  <input
                    type="text"
                    name="studentDiscipline"
                    value={formData.studentDiscipline}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Year:</span>
                    </label>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    >
                      <option value="1">1st</option>
                      <option value="2">2nd</option>
                      <option value="3">3rd</option>
                      <option value="4">4th</option>
                    </select>
                    <input type="text" name="year" />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Term:</span>
                    </label>
                    <select
                      name="term"
                      value={formData.term}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                    >
                      <option value="1">1st</option>
                      <option value="2">2nd</option>
                    </select>
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Student Institute:
                    </span>
                  </label>
                  <input
                    type="text"
                    name="studentInstitute"
                    value={formData.studentInstitute}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
            </div>

            {/* Teacher Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Teacher Name:</span>
                </label>
                <input
                  type="text"
                  name="teacherName"
                  value={formData.teacherName}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Teacher Discipline:
                  </span>
                </label>
                <input
                  type="text"
                  name="teacherDiscipline"
                  value={formData.teacherDiscipline}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              {/* <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Teacher Degree:</span>
                </label>
                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div> */}

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Teacher Degree:</span>
                </label>
                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Teacher Institute:
                  </span>
                </label>
                <input
                  type="text"
                  name="teacherInstitute"
                  value={formData.teacherInstitute}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Date Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Date:</span>
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Cover Type:</span>
              </label>
              <select
                name="coverType"
                value={formData.coverType}
                onChange={handleChange}
                className="select select-neutral w-full"
              >
                <option value="Assignment">Assignment</option>
                <option value="Lab Report">Lab Report</option>
                {/* <option value="Research">Research</option> */}
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Category:</span>
              </label>
              <select
                name="Category"
                value={formData.Category}
                onChange={handleChange}
                className="select select-neutral w-full"
              >
                <option value="1">Category 1</option>
                <option value="2">Category 2</option>
                {/* <option value="3">Category 3</option> */}
              </select>
            </div>
            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn btn-primary w-full mt-8 py-3 text-lg"
            >
              Download Cover Page
            </motion.button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CoverPageForm;
