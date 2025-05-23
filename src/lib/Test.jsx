import { useRef } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export default function DownloadForm() {
  const formRef = useRef();

  const handleDownloadPDF = async () => {
    const element = formRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const width = 210;
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("form.pdf");
  };

  const handleDownloadPNG = async () => {
    const canvas = await html2canvas(formRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = imgData;
    a.download = "form.png";
    a.click();
  };

  const handleDownloadJPG = async () => {
    const canvas = await html2canvas(formRef.current, { scale: 2 });
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
    <div className="p-6">
      <div ref={formRef} className="border p-4 w-[600px] bg-white shadow">
        <h1 className="text-xl font-bold mb-2">Form Title</h1>
        <p>This is the form content that will be downloaded.</p>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-5">
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
