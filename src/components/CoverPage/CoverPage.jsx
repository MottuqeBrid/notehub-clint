import { useRef, useState } from "react";
import Cover1 from "../CoverGroup/Cover1";
import CoverPageForm from "../CoverPageForm.jsx/CoverPageForm ";
import Cover2 from "./../CoverGroup/Cover2";
import { useNavigate } from "react-router";

export default function CoverPageGenerator() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title:
      "Exploring BLUE and analysing last 5 years questions of term final examination of simple and multiple regression",
    courseTitle: "Regression Analysis-I",
    section: "Both",
    courseCode: "0542 20 stat 2203",
    studentName: "Md. Mottuqe Brid",
    studentId: "232026",
    year: "2",
    term: "2",
    teacherName: "Abdur Rahman",
    studentDiscipline: "Statistics",
    teacherDiscipline: "Statistics",
    degree: "Lecturer",
    date: "2025-05-08",
    studentInstitute: "Khulna University, Khulna",
    teacherInstitute: "Khulna University, Khulna",
    coverType: "Assignment",
    Category: "1",
  });

  const coverRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Form submitted:", formData);
    navigate("/cover-page-generator", { state: formData });
  };

  return (
    <div className="p-4 space-y-6">
      <CoverPageForm
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
      />

      <div className="overflow-auto">
        {formData.Category === "1" && (
          <Cover1 coverRef={coverRef} formData={formData} />
        )}
        {formData.Category === "2" && (
          <Cover2 coverRef={coverRef} formData={formData} />
        )}
      </div>
    </div>
  );
}
