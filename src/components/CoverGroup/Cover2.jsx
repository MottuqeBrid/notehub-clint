import { format } from "date-fns";
const Cover2 = ({ formData, coverRef }) => {
  const formattedDate = format(formData.date, "MMM dd, yyyy");
  return (
    <div
      ref={coverRef}
      className="w-[1240px] h-[1754px] bg-white relative overflow-hidden z-70"
    >
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
        <div className="absolute top-[10%] left-[8%] text-[40px] text-[#4472c4] font-semibold uppercase border-2 border-black py-[20px] px-[50px]">
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
          <h1 className=" font-bold">Course Title: {formData.courseTitle}</h1>
          {formData.section !== "Both" && (
            <h1 className="font-bold">Section: {formData.section}</h1>
          )}
          <h1 className="font-bold">Course Code: {formData.courseCode}</h1>
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
  );
};

export default Cover2;
