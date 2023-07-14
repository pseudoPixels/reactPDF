import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import samplePDF from "./test2.pdf";
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

  function goToPage(page) {
    if (page >= 1 && page <= numPages) {
      setPageNumber(page);
    }
  }

  return (
    <>
      <div className="pdf-viewer">
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
        <input
          type="number"
          min={1}
          max={numPages}
          value={pageNumber}
          onChange={(e) => goToPage(parseInt(e.target.value))}
        />
      </div>
    </>
  );
}

export default App;
