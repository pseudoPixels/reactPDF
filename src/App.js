import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import samplePDF from "./test.pdf";
import "./App.css";

function App() {
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  });

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function handleThumbnailClick(page) {
    setPageNumber(page);
  }

  function renderThumbnails() {
    const thumbnails = [];
    for (let i = 1; i <= numPages; i++) {
      thumbnails.push(
        <div
          key={`thumbnail-${i}`}
          className={`thumbnail ${i === pageNumber ? "active" : ""}`}
          onClick={() => handleThumbnailClick(i)}
        >
          <Document file={samplePDF}>
            <Page
              key={`thumbnail-page-${i}`}
              pageNumber={i}
              width={80}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>
      );
    }
    return thumbnails;
  }

  return (
    <>
      <div className="pdf-viewer">
        <div className="thumbnails">{renderThumbnails()}</div>
        <div className="document">
          <Document file={samplePDF} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} width={800} />
          </Document>
        </div>
      </div>
      <div>
        <p>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        <button type="button" disabled={pageNumber <= 1} onClick={() => changePage(-1)}>
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={() => changePage(1)}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default App;
