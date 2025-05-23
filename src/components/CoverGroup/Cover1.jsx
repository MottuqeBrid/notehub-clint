import { format } from "date-fns";
const Cover1 = ({ formData, coverRef }) => {
  const formattedDate = format(formData.date, "MMM dd, yyyy");
  return (
    <div
      ref={coverRef}
      className="w-[1240px] min-h-[1754px] pt-20 bg-white shadow-lg text-black mx-auto p-[96px] space-y-20 "
    >
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
  );
};

export default Cover1;
