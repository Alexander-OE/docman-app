import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import "./DisplayPdf.css"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

 // Replace with your Cloudinary PDF URL
 const cloudinaryPdfUrl = 'https://res.cloudinary.com/your-cloud-name/image/upload/your-pdf-file.pdf';

function DisplayPdf() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="pdf-container">
      <Document
        file={cloudinaryPdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        className="pdf-document"
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div className="pdf-page-info">
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <button
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber(pageNumber - 1)}
          className="pdf-navigation-button"
        >
          Previous
        </button>
        <button
          disabled={pageNumber >= numPages}
          onClick={() => setPageNumber(pageNumber + 1)}
          className="pdf-navigation-button"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default DisplayPdf;
