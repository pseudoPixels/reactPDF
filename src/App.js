import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import samplePDF from "./test3.pdf";
import "./App.css";
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

function App() {
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  });

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [thumbnailPages, setThumbnailPages] = useState([]);

  useEffect(() => {
    if (numPages) {
      const startPage = Math.max(1, pageNumber - 5);
      const endPage = Math.min(numPages, pageNumber + 5);
      const pages = [];
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      setThumbnailPages(pages);
    }
  }, [pageNumber, numPages]);

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

  function handleThumbnailClick(page) {
    setPageNumber(page);
  }

  return (
    <>
      <div className="pdf-viewer">
        <div className="thumbnails">
          {thumbnailPages.map((page) => (
            <div
              key={`thumbnail-${page}`}
              className={`thumbnail ${page === pageNumber ? "active" : ""}`}
              onClick={() => handleThumbnailClick(page)}
            >
              <Document file={samplePDF}>
                <Page
                  key={`thumbnail-page-${page}`}
                  pageNumber={page}
                  width={80}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </Document>
            </div>
          ))}
        </div>
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
