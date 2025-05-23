import { useRef } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import DemoCover from "../DemoCover";

export default function DownloadForm() {
  const formRef = useRef();
  const btnRef = useRef();
  // formRef.current.style.display = "none";

  const handleDownloadPDF = async () => {
    btnRef.current.style.display = "none";
    formRef.current.style.display = "block";
    const element = formRef.current;
    if (!element) {
      console.error("Element not found");
      return;
    }
    const scale = 0.8; // Reduce scale to decrease file size

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
    pdf.save("assignment-cover.pdf");
    formRef.current.style.display = "none";
    btnRef.current.style.display = "grid";
  };

  const handleDownloadPNG = async () => {
    const canvas = await html2canvas(formRef.current, {
      scale: 2,
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = imgData;
    a.download = "form.png";
    a.click();
  };

  const handleDownloadJPG = async () => {
    const canvas = await html2canvas(formRef.current, {
      scale: 2,
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/jpeg", 1.0);
    const a = document.createElement("a");
    a.href = imgData;
    a.download = "form.jpg";
    a.click();
  };

  const handleDownloadWord = async () => {
    const doc = new Document({
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun("This is a Word version of the form."),
                new TextRun("\nExample line 2."),
              ],
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, "form.docx");
  };

  const handleDownloadText = () => {
    const content = `Example text content from the form.`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "form.txt");
  };

  const handleDownloadHTML = () => {
    const html = formRef.current.outerHTML;
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    saveAs(blob, "form.html");
  };

  return (
    <div className="p-6 w-full">
      {/* <div className="border p-4 w-full bg-white shadow overflow-autwo"> */}
      <div className="w-full h-full ">
        {/* <DemoCover /> */}
        {/* </div> */}
        <div>
          
        </div>
      </div>

      <div ref={btnRef} className="mt-6 grid grid-cols-3 gap-5">
        <button className="btn" onClick={handleDownloadPDF}>
          Download PDF
        </button>
        <button className="btn" onClick={handleDownloadPNG}>
          Download PNG
        </button>
        <button className="btn" onClick={handleDownloadJPG}>
          Download JPG
        </button>
        <button className="btn" onClick={handleDownloadWord}>
          Download Word
        </button>
        <button className="btn" onClick={handleDownloadText}>
          Download Text
        </button>
        <button className="btn" onClick={handleDownloadHTML}>
          Download HTML
        </button>
      </div>
    </div>
  );
}
