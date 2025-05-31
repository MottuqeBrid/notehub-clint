import { format } from "date-fns";
import { useRef, useState } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";
// import { saveAs } from "file-saver";
import { Link, useLocation } from "react-router";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const CoverPageDownload = () => {
  const location = useLocation();
  const formRef = useRef();
  const btnRef = useRef();
  const { user } = useAuth();
  // eslint-disable-next-line no-unused-vars
  const [formData, setFormData] = useState(location.state);
  // console.log(formData);
  const formattedDate = format(formData.date, "MMM dd, yyyy");

  const handleDownloadPDF = async () => {
    btnRef.current.style.display = "none";
    formRef.current.style.display = "block";
    const element = formRef.current;
    if (!element) {
      console.error("Element not found");
      return;
    }

    const coverData = {
      ...formData,
      user: user?._id || "guest", // Use user ID if available, otherwise use 'guest'
    };

    axios.post(`${import.meta.env.VITE_API_URL}/cover/add`, coverData);

    const scale = 2; // Reduce scale to decrease file size

    const canvas = await html2canvas(element, {
      scale,
      useCORS: true, // For external images
      logging: false,
      backgroundColor: "#FFFFFF",
      removeContainer: true,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.8); // Use JPEG with 80% quality
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [canvas.width * 0.264583, canvas.height * 0.264583], // Convert px to mm
      compress: true,
    });

    pdf.addImage(
      imgData,
      "JPEG",
      0,
      0,
      pdf.internal.pageSize.getWidth(),
      pdf.internal.pageSize.getHeight()
    );
    pdf.save(`${formData.studentId}-cover.pdf`);
    formRef.current.style.display = "none";
    btnRef.current.style.display = "flex";
  };

  return (
    <div>
      <div className="p-4">
        <div ref={formRef} className="w-fit hidden">
          {formData.Category === "1" ? (
            <div className="w-[1240px] min-h-[1754px] pt-20 bg-white shadow-lg text-black mx-auto p-[96px] space-y-20 ">
              <h1 className="text-5xl font-bold text-center my-20 uppercase">
                <span className="text-[#f5821f]">Khulna</span>{" "}
                <span className="text-[#6d8da1]">University</span>
              </h1>
              <div className="flex justify-center my-20">
                <img
                  src="https://i.ibb.co/tyzqDkn/VYA8kwz-BQ1-CV2ptz-Iu96xs-YFA3hxj-T7.png"
                  alt=""
                />
              </div>

              <h1 className="text-5xl font-semibold text-center text-[#4472c4] uppercase my-20">
                {formData.coverType}
              </h1>
              <h2 className="text-3xl text-center text-[#588413] uppercase mb-10">
                ON
              </h2>
              <p className="text-2xl text-center text-[#588413] font-semibold mb-20">
                {formData.title}
              </p>
              <div className="text-lg text-[#4472c4] mb-10 space-y-1">
                <p>Course Title: {formData.courseTitle}</p>
                {formData.section !== "Both" ? (
                  <p>Section: {formData.section}</p>
                ) : null}
                <p>Course Code: {formData.courseCode}</p>
              </div>
              <div className="flex justify-between text-lg bg-[#d9e2f3] p-4 px-10 rounded">
                <div>
                  <h3 className="font-bold text-xl mb-2">Submitted By</h3>
                  <p>Name: {formData.studentName}</p>
                  <p>ID: {formData.studentId}</p>
                  <p>
                    Year: {formData.year}
                    <sup>
                      {formData.year === "1"
                        ? "st"
                        : formData.year === "2"
                        ? "nd"
                        : formData.year === "3"
                        ? "rd"
                        : "th"}
                    </sup>
                    Term: {formData.term}
                    <sup>{formData.term === "1" ? "st" : "nd"}</sup>
                  </p>
                  <p>{formData.studentDiscipline} Discipline,</p>
                  <p>{formData.studentInstitute}</p>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">Submitted To</h3>
                  <p>{formData.teacherName},</p>
                  <p>{formData.degree},</p>
                  <p>{formData.teacherDiscipline} Discipline,</p>
                  <p>{formData.teacherInstitute}</p>
                </div>
              </div>
              <div className="text-center mt-10">
                <p className="text-lg">Date of submission:</p>
                <h2 className="text-2xl font-semibold">{formattedDate}</h2>
              </div>
            </div>
          ) : formData.Category === "2" ? (
            <div className="w-[1240px] h-[1754px] bg-white relative overflow-hidden z-70">
              {/* <!-- Blue Circle --> */}
              <div className="absolute w-[900px] bg-white h-[900px] border-[150px] border-[#4472c4] rounded-full right-[-450px] top-[-350px] z-20"></div>

              {/* <!-- University Header --> */}
              <div className="absolute top-[100px] left-[75px] flex items-center gap-4 z-30">
                <img
                  src="https://i.ibb.co/tyzqDkn/VYA8kwz-BQ1-CV2ptz-Iu96xs-YFA3hxj-T7.png"
                  alt="Logo"
                  className="w-[115px]"
                />
                <h1 className="text-[60px] font-normal uppercase">
                  <span className="text-[#f5821f]">Khulna</span>
                  <span className="text-[#6d8da1]">University</span>
                </h1>
              </div>

              {/* <!-- Main Content Box --> */}
              <div className="absolute top-[15%] left-[7.5%] w-[85%] h-[50%] border-[20px] border-black rounded-[90px] overflow-hidden z-10">
                {/* <!-- White Overlay Circle --> */}
                <div className="absolute w-[750px] h-[750px] bg-white rounded-full right-[-200px] top-[-300px]"></div>

                {/* <!-- Assignment Text --> */}
                <div className="absolute top-[10%] left-[8%] text-[40px] text-[#4472c4] font-semibold uppercase border-2 border-black py-[20px] px-[50px] ">
                  {formData.coverType}
                </div>

                {/* <!-- "ON" Text --> */}
                <div className="absolute top-[25%] left-[18%] text-[50px] text-[#588413] font-medium">
                  ON
                </div>

                <div className="absolute top-[35%] left-[8%] w-[84%] text-[45px] text-[#588413] font-semibold leading-tight">
                  {formData.title}
                </div>

                <div className="absolute top-[70%]  left-[8%] text-[20px] text-[#4472c4] space-y-8">
                  <h1 className=" font-bold">
                    Course Title: {formData.courseTitle}
                  </h1>
                  {formData.section !== "Both" && (
                    <h1 className="font-bold">Section: {formData.section}</h1>
                  )}
                  <h1 className="font-bold">
                    Course Code: {formData.courseCode}
                  </h1>
                </div>
              </div>
              <table className="absolute top-[68%] left-[10%] w-[80%] border-collapse">
                <thead>
                  <tr className="bg-[#4472c4]">
                    <th className="p-[25px_10px] text-[35px] font-bold text-center border-2 border-[#4472c4]">
                      SUBMITTED BY
                    </th>
                    <th className="p-[25px_10px] text-[35px] font-bold text-center border-2 border-[#4472c4]">
                      SUBMITTED TO
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-[20px] text-[30px] font-bold border-2 border-[#4472c4] bg-[#d9e2f3]">
                      NAME: {formData.studentName}
                      <br />
                      ID: {formData.studentId}
                      <br />
                      YEAR: {formData.year}
                      <sup>
                        {formData.year === "1"
                          ? "st"
                          : formData.year === "2"
                          ? "nd"
                          : formData.year === "3"
                          ? "rd"
                          : "th"}
                      </sup>{" "}
                      TERM: {formData.term}
                      <sup>{formData.term === "1" ? "st" : "nd"}</sup>
                      <br />
                      {formData.studentDiscipline} Discipline <br />
                      {formData.studentInstitute}
                    </td>
                    <td className="p-[10px] text-[30px] font-bold border-2 border-[#4472c4] bg-[#d9e2f3]">
                      {formData.teacherName},
                      <br />
                      {formData.degree}, <br />
                      {formData.teacherDiscipline} Discipline
                      <br />
                      {formData.teacherInstitute}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="absolute bottom-[1%] left-1/2 transform -translate-x-1/2 text-center">
                <img
                  src="https://i.ibb.co/d0JWqffG/dataBar.png"
                  alt="Data Bar"
                  className="w-[1000px] mx-auto mb-8"
                />
                <p className="text-[25px] text-black">Date of submission:</p>
                <h2 className="text-[35px] text-black font-semibold">
                  {formattedDate}
                </h2>
              </div>

              <img
                src="https://i.ibb.co/Hfrht4dX/bottom.png"
                alt="Decoration"
                className="absolute bottom-0 left-0 w-[300px] h-[300px]"
              />
            </div>
          ) : null}
        </div>

        <div ref={btnRef} className="mt-4 text-center flex flex-col gap-4">
          <button
            onClick={handleDownloadPDF}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Download Cover as PDF
          </button>
          <Link className="btn btn-active" to="/cover-page">
            Go back to cover page form
          </Link>
          <Link className="btn btn-active" to="/">
            Go back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CoverPageDownload;
