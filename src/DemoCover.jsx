import React from "react";

const DemoCover = () => {
  return (
    <div>
      <div className="w-[2480px] h-[3508px] bg-white relative overflow-hidden z-70">
        {/* <!-- Blue Circle --> */}
        <div className="absolute w-[1800px] bg-white h-[1800px] border-[300px] border-[#4472c4] rounded-full right-[-900px] top-[-700px] z-20"></div>

        {/* <!-- University Header --> */}
        <div className="absolute top-[150px] left-[150px] flex items-center gap-4 z-30">
          <img src="logo.png" alt="Logo" className="w-[230px]" />
          <h1 className="text-[120px] font-normal uppercase">
            <span className="text-[#f5821f]">Khulna</span>
            <span className="text-[#6d8da1]">University</span>
          </h1>
        </div>

        {/* <!-- Main Content Box --> */}
        <div className="absolute top-[15%] left-[7.5%] w-[85%] h-[50%] border-[40px] border-black rounded-[180px] overflow-hidden z-10">
          {/* <!-- White Overlay Circle --> */}
          <div className="absolute w-[1500px] h-[1500px] bg-white rounded-full right-[-400px] top-[-600px]"></div>

          {/* <!-- Assignment Text --> */}
          <div className="absolute top-[10%] left-[8%] text-[80px] text-[#4472c4] font-semibold uppercase border-2 border-black py-[40px] px-[100px]">
            ASSIGNMENT
          </div>

          {/* <!-- "ON" Text --> */}
          <div className="absolute top-[25%] left-[18%] text-[100px] text-[#588413] font-medium">
            ON
          </div>

          <div className="absolute top-[35%] left-[8%] w-[84%] text-[90px] text-[#588413] font-semibold leading-tight">
            Exploring BLUE and analysing last 5 years questions of term final
            examination of simple and multiple regression
          </div>

          <div className="absolute top-[70%] left-[8%] text-[40px] text-[#4472c4] space-y-8">
            <h1 className="font-light">Course Title: Regression Analysis-I</h1>
            <h1>Section: A</h1>
            <h1 className="font-light">Course Code: 0542 20 stat 2203</h1>
          </div>
        </div>
        <table className="absolute top-[68%] left-[10%] w-[80%] border-collapse">
          <thead>
            <tr className="bg-[#4472c4]">
              <th className="p-[50px_20px] text-[70px] font-bold text-center border-2 border-[#4472c4]">
                SUBMITTED BY
              </th>
              <th className="p-[50px_20px] text-[70px] font-bold text-center border-2 border-[#4472c4]">
                SUBMITTED TO
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-[40px] text-[60px] font-bold border-2 border-[#4472c4] bg-[#d9e2f3]">
                NAME: Md. Mottuqe Brid
                <br />
                ID: STUDENT ID
                <br />
                YEAR: 2<sup>nd</sup> TERM: 2<sup>nd</sup>
                <br />
                Khulna University, Khulna
              </td>
              <td className="p-[40px] text-[60px] font-bold border-2 border-[#4472c4] bg-[#d9e2f3]">
                Abdur Rahman,
                <br />
                Lecturer, <br />
                Statistics Discipline
                <br />
                Khulna University, Khulna
              </td>
            </tr>
          </tbody>
        </table>

        <div className="absolute bottom-[1%] left-1/2 transform -translate-x-1/2 text-center">
          <img
            src="./dataBar.png"
            alt="Data Bar"
            className="w-[1000px] mx-auto mb-8"
          />
          <p className="text-[50px] text-black">Date of submission:</p>
          <h2 className="text-[70px] text-black font-semibold">Mar 06, 2025</h2>
        </div>

        <img
          src="./bottom.png"
          alt="Decoration"
          className="absolute bottom-0 left-0 w-[600px] h-[600px]"
        />
      </div>
    </div>
  );
};

export default DemoCover;

// import React from "react";

// const DemoCover = () => {
//   return (
//     <div>
//       <div className="w-[794px] h-[1123px] bg-white relative overflow-hidden z-70">
//         {/* Blue Circle */}
//         <div className="absolute w-[600px] bg-white h-[600px] border-[100px] border-[#4472c4] rounded-full right-[-300px] top-[-250px] z-20"></div>

//         {/* University Header */}
//         <div className="absolute top-[50px] left-[50px] flex items-center gap-4 z-30">
//           <img src="logo.png" alt="Logo" className="w-[80px]" />
//           <h1 className="text-[34px] font-normal uppercase">
//             <span className="text-[#f5821f]">Khulna</span>
//             <span className="text-[#6d8da1]">University</span>
//           </h1>
//         </div>

//         {/* Main Content Box */}
//         <div className="absolute top-[15%] left-[5%] w-[90%] h-[50%] border-[10px] border-black rounded-[50px] overflow-hidden z-10">
//           {/* White Overlay Circle */}
//           <div className="absolute w-[500px] h-[500px] bg-white rounded-full right-[-150px] top-[-200px]"></div>

//           {/* Assignment Text */}
//           <div className="absolute top-[10%] left-[8%] text-[24px] text-[#4472c4] font-semibold uppercase border border-black py-[15px] px-[30px]">
//             ASSIGNMENT
//           </div>

//           {/* "ON" Text */}
//           <div className="absolute top-[25%] left-[18%] text-[28px] text-[#588413] font-medium">
//             ON
//           </div>

//           <div className="absolute top-[35%] left-[8%] w-[84%] text-[22px] text-[#588413] font-semibold leading-tight">
//             Exploring BLUE and analysing last 5 years questions of term final
//             examination of simple and multiple regression
//           </div>

//           <div className="absolute top-[70%] left-[8%] text-[14px] text-[#4472c4] space-y-4">
//             <h1 className="font-light">Course Title: Regression Analysis-I</h1>
//             <h1>Section: A</h1>
//             <h1 className="font-light">Course Code: 0542 20 stat 2203</h1>
//           </div>
//         </div>

//         <table className="absolute top-[68%] left-[10%] w-[80%] border-collapse">
//           <thead>
//             <tr className="bg-[#4472c4]">
//               <th className="p-[15px_10px] text-[20px] font-bold text-center border border-[#4472c4]">
//                 SUBMITTED BY
//               </th>
//               <th className="p-[15px_10px] text-[20px] font-bold text-center border border-[#4472c4]">
//                 SUBMITTED TO
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="p-[10px] text-[16px] font-bold border border-[#4472c4] bg-[#d9e2f3]">
//                 NAME: Md. Mottuqe Brid
//                 <br />
//                 ID: STUDENT ID
//                 <br />
//                 YEAR: 2<sup>nd</sup> TERM: 2<sup>nd</sup>
//                 <br />
//                 Khulna University, Khulna
//               </td>
//               <td className="p-[10px] text-[16px] font-bold border border-[#4472c4] bg-[#d9e2f3]">
//                 Abdur Rahman,
//                 <br />
//                 Lecturer, <br />
//                 Statistics Discipline
//                 <br />
//                 Khulna University, Khulna
//               </td>
//             </tr>
//           </tbody>
//         </table>

//         <div className="absolute bottom-[2%] left-1/2 transform -translate-x-1/2 text-center">
//           <img
//             src="./dataBar.png"
//             alt="Data Bar"
//             className="w-[300px] mx-auto mb-4"
//           />
//           <p className="text-[14px] text-black">Date of submission:</p>
//           <h2 className="text-[18px] text-black font-semibold">Mar 06, 2025</h2>
//         </div>

//         <img
//           src="./bottom.png"
//           alt="Decoration"
//           className="absolute bottom-0 left-0 w-[200px] h-[200px]"
//         />
//       </div>
//     </div>
//   );
// };

// export default DemoCover;
