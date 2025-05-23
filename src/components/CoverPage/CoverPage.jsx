import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";

export default function CoverPageGenerator() {
  const [formData, setFormData] = useState({
    title:
      "Exploring BLUE and analysing last 5 years questions of term final examination of simple and multiple regression",
    courseTitle: "Regression Analysis-I",
    section: "A",
    courseCode: "0542 20 stat 2203",
    studentName: "Md. Mottuqe Brid",
    studentId: "STUDENT ID",
    year: "2",
    term: "2",
    teacherName: "Abdur Rahman",
    discipline: "Statistic",
    degree: "Lecturer",
    date: "Mar 06, 2025",
  });

  const coverRef = useRef(null);

  const handleDownload = async () => {
    const node = coverRef.current;
    try {
      const dataUrl = await toPng(node);
      saveAs(dataUrl, "cover-page.png");
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to generate image. See console for more details.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 space-y-6">
      <form className="space-y-4 bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Cover Page Form</h2>
        {Object.entries(formData).map(([key, value]) => (
          <div key={key}>
            <label className="block mb-1 font-medium capitalize">
              {key.replace(/([A-Z])/g, " $1")}:
            </label>
            <input
              type="text"
              name={key}
              value={value}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleDownload}
          className="btn btn-primary w-full mt-4"
        >
          Download Cover Page
        </button>
      </form>

      <div className="overflow-auto">
        <div
          ref={coverRef}
          className="w-[1240px] min-h-[1754px] pt-20 bg-white shadow-lg p-10 text-black mx-auto"
        >
          <h1 class="text-5xl font-bold text-center mb-10 uppercase">
            <span class="text-[#f5821f]">Khulna</span>{" "}
            <span class="text-[#6d8da1]">University</span>
          </h1>
          {/* <h1 className="text-5xl font-bold text-center text-[#4472c4] uppercase mb-10">
            Khulna University
          </h1> */}
          <h1 className="text-5xl font-semibold text-center text-[#4472c4] uppercase mb-10">
            Assignment
          </h1>
          <h2 className="text-3xl text-center text-[#588413] uppercase mb-6">
            ON
          </h2>
          <p className="text-2xl text-center text-[#588413] font-semibold mb-10">
            {formData.title}
          </p>
          <div className="text-lg text-[#4472c4] mb-10 space-y-1">
            <p>Course Title: {formData.courseTitle}</p>
            <p>Section: {formData.section}</p>
            <p>Course Code: {formData.courseCode}</p>
          </div>
          <div className="flex justify-between text-lg bg-[#d9e2f3] p-4 rounded">
            <div>
              <h3 className="font-bold text-xl mb-2">Submitted By</h3>
              <p>Name: {formData.studentName}</p>
              <p>ID: {formData.studentId}</p>
              <p>
                Year: {formData.year}
                <sup>nd</sup> Term: {formData.term}
                <sup>nd</sup>
              </p>
              <p>Khulna University, Khulna</p>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-2">Submitted To</h3>
              <p>{formData.teacherName}</p>
              <p>{formData.degree}</p>
              <p>{formData.discipline} Discipline</p>
              <p>Khulna University, Khulna</p>
            </div>
          </div>
          <div className="text-center mt-10">
            <p className="text-lg">Date of submission:</p>
            <h2 className="text-2xl font-semibold">{formData.date}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
